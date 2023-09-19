<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "admin",
});

const { data: signupOpen, refresh: refreshSignupOpen } = await useFetch(
  "/api/signup/isopen"
);

const { data: categories } = await useFetch("/api/songs/categories");

const { data: hiddenCategories, refresh: refreshHiddenCategories } =
  await useFetch("/api/admin/hiddencategories");

const { data: songs } = await useFetch("/api/songs/all");

const { data: hiddenSongs, refresh: refreshHiddenSongs } = await useFetch(
  "/api/admin/hiddensongs"
);

const filterSongs = (itemTitle, queryText, item) => {
  const itemTokens = (item.raw.title+" "+item.raw.artist).toLocaleLowerCase().replace(/[^A-Za-z0-9\s]/g, "").split(" ");
  const queryTokens = queryText.toLocaleLowerCase().replace(/[^A-Za-z0-9\s]/g, "").split(" ");
  return queryTokens.every(queryToken => itemTokens.some(itemToken => itemToken.includes(queryToken)));
};

const clearDismissedDialog = ref(false);

const updateSignupIsOpen = async () => {
  await useFetch(`/api/admin/updateisopen`, {
    method: "post",
    body: {
      status: signupOpen.value,
    },
    async onResponse({ request, response, options }) {
      await refreshSignupOpen();
    },
  });
};

const clearDismissedSignups = async () => {
  await useFetch(`/api/admin/cleardismissedsignups`, {
    method: "post",
    async onResponse({ request, response, options }) {
      clearDismissedDialog.value = false;
    },
  });
};

const updateHiddenCategories = async () => {
  await useFetch(`/api/admin/updatehiddencategories`, {
    method: "post",
    body: {
      categories: hiddenCategories.value,
    },
    async onResponse({ request, response, options }) {
      await refreshHiddenCategories();
    },
  });
};

const updateHiddenSongs = async () => {
  await useFetch(`/api/admin/updatehiddensongs`, {
    method: "post",
    body: {
      songs: hiddenSongs.value,
    },
    async onResponse({ request, response, options }) {
      await refreshHiddenSongs();
    },
  });
};
</script>

<template>
  <v-container>
    <v-row justify="center" class="my-5 text-center">
      <h1>Settings</h1>
    </v-row>
    <v-row justify="center" align="center" class="my-5 text-center">
      <v-col cols="auto">
        <v-switch
          v-model="signupOpen"
          @update:model-value="updateSignupIsOpen"
          label="Signup open"
        />
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="my-5">
      <v-col cols="auto"> Clear all dismissed signups </v-col>
      <v-col cols="auto">
        <v-dialog v-model="clearDismissedDialog" width="500">
          <template v-slot:activator="{ props }">
            <v-btn color="warning" v-bind="props">Clear</v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Clear dismissed signups">
              <v-card-text>
                This will permanently delete all dismissed signups. This cannot
                be undone! Are you sure?
              </v-card-text>

              <v-card-actions>
                <v-spacer />

                <v-btn @click="isActive.value = false">Cancel</v-btn>
                <v-btn @click="clearDismissedSignups()" color="warning">
                  Clear
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="my-5">
      <v-col cols="12" lg="6">
        <v-select
          chips
          closable-chips
          clearable
          persistent-clear
          multiple
          label="Hide Categories"
          :items="categories"
          v-model="hiddenCategories"
          @update:model-value="updateHiddenCategories()"
        />
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="my-5">
      <v-col cols="12" lg="6">
        <v-autocomplete
          chips
          closable-chips
          clearable
          persistent-clear
          multiple
          label="Hide Songs"
          :items="songs"
          :custom-filter="filterSongs"
          item-value="id"
          v-model="hiddenSongs"
          @update:model-value="updateHiddenSongs()"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="`${item.raw.title} - ${item.raw.artist}`"
            />
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>
