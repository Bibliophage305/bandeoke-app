<script setup>
definePageMeta({
  middleware: ["can-be-turned-off"],
});

import { VDataTable } from "vuetify/labs/VDataTable";

const { data } = await useFetch("/api/songs");

const tableHeaders = [
  { title: "Title", key: "title" },
  { title: "Artist", key: "artist" },
  { title: "Categories", key: "categories", sortable: false },
];

const search = ref("");
const expanded = ref([]);
const categoryFilters = ref([]);
const categoryFilterOptions = [
  ...new Set(data.value.map((song) => song.categories).flat(1)),
].sort();

const expandRow = (item, event) => {
  if (expanded.value.includes(event.item.key)) {
    expanded.value = [];
  } else {
    expanded.value = [event.item.key];
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <h1>Sign up to sing a song with The Fever!</h1>
    </v-row>
    <v-row justify="center" class="text-center pb-3">
      <h2>Tap your song to get started</h2>
    </v-row>
    <v-row>
      <v-data-table
        @click:row="expandRow"
        v-model:expanded="expanded"
        :headers="tableHeaders"
        :items="
          data.filter((song) =>
            categoryFilters.every((filter) => song.categories.includes(filter))
          )
        "
        :search="search"
      >
        <template v-slot:top>
          <v-row>
            <v-col cols="12" lg="6">
              <v-text-field
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-select
                chips
                closable-chips
                clearable
                multiple
                label="Category Filters"
                :items="categoryFilterOptions"
                v-model="categoryFilters"
              />
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.categories="{ item }">
          <v-chip
            v-for="category in item.columns.categories"
            @click="
              categoryFilters.indexOf(category) === -1 &&
                categoryFilters.push(category)
            "
          >
            {{ category }}
          </v-chip>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <v-container class="my-5">
                <v-row class="align-center text-center" justify="center">
                  Sign up to sing {{ item.raw.title }} - {{ item.raw.artist }}?
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
</template>
