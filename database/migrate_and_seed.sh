#!/bin/bash

# Define the directories
migration_dir="/home/database/migrations"
seeding_dir="/home/database/seeding"

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
