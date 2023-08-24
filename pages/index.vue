<script setup>
definePageMeta({
  middleware: ["can-be-turned-off"],
});

import { VDataTable } from "vuetify/labs/VDataTable";

const { data } = await useFetch("/api/songs");

const tableHeaders = [
  { title: "Title", key: "title" },
  { title: "Artist", key: "artist" },
  { title: "Categories", key: "genres", sortable: false },
];

const search = ref("");
const expanded = ref([]);

const expandRow = (item, event) => {
  if (expanded.value.includes(event.item.key)) {
    expanded.value = [];
  } else {
    expanded.value = [event.item.key];
  }
};
</script>

<template>
  <div>
    <v-container>
      <v-row justify="center" class="text-center">
        <h1>Sign up to sing a song with The Fever!</h1>
      </v-row>
      <v-row justify="center" class="text-center">
        <h2>Tap your song to get started</h2>
      </v-row>
      <v-row>
        <v-data-table
          @click:row="expandRow"
          v-model:expanded="expanded"
          :headers="tableHeaders"
          :items="data"
          :search="search"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </template>
          <template v-slot:item.genres="{ item }">
            <v-chip v-for="genre in item.columns.genres">
              {{ genre }}
            </v-chip>
          </template>
          <template v-slot:expanded-row="{ columns, item }">
            <tr>
              <td :colspan="columns.length">
                <v-container class="my-5">
                  <v-row class="align-center text-center" justify="center">
                    Sign up to sing {{ item.raw.title }} -
                    {{ item.raw.artist }}?
                  </v-row>
                  <v-row class="align-center mt-5" justify="center">
                    <v-btn color="blue" :to="`/signup/${item.raw.id}`">
                      Confirm
                    </v-btn>
                  </v-row>
                </v-container>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-row>
    </v-container>
  </div>
</template>
