<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "admin",
});

const { data: signupOpen, refresh: refreshSignupOpen } = await useFetch(
  "/api/signup/isopen"
);

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
</script>

<template>
  <v-container>
    <v-row justify="center" class="my-5 text-center">
      <h1>Settings</h1>
    </v-row>
    <v-row justify="center" align="center" class="my-5">
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
  </v-container>
</template>
