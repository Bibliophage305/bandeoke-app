#!/bin/bash

# npx nuxi-docker postgres /home/database/migrate_and_seed.sh

# Move to directory of the script
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

# Define the directories
migration_dir="migrations"
seeding_dir="seeding"


# Function to execute SQL files
execute_sql_files() {
    local dir="$1"
    for file in "$dir"/*.sql; do
        if [ -f "$file" ]; then
            echo "Executing: $file"
            PGPASSWORD=postgres psql -h postgres -U postgres -d postgres -f "$file"
            echo "Done executing: $file"
        fi
    done
}

# Execute migration files
execute_sql_files "$migration_dir"

# Execute seeding files
execute_sql_files "$seeding_dir"
