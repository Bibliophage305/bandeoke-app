<script setup>
definePageMeta({
  middleware: ["can-be-turned-off"],
});
const route = useRoute();

const { data } = await useFetch(`/api/songs/${route.params.id}`);

const name = ref("");

const submit = async () => {
  await useFetch("/api/signup", {
    method: "post",
    body: {
      name: name.value,
      song_id: route.params.id,
    },
    async onResponse() {
      await navigateTo("/signup/success");
    },
    async onResponseError() {
      await navigateTo("/signup/error");
    },
  });
};
</script>

<template>
  <div>
    <v-container>
      <v-row justify="center">
        <h1>Sign up to sing a song with The Fever!</h1>
      </v-row>
      <v-row justify="center">
        <h2>You've chosen {{ data.title }} - {{ data.artist }}</h2>
      </v-row>
      <v-row justify="center" class="my-5">
        Give us your name so we can call you to the stage
      </v-row>
      <v-row justify="center">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field label="Name" v-model="name"></v-text-field>
        </v-responsive>
      </v-row>
      <v-row justify="center">
        <v-btn color="red" class="mr-5" to="/"> Cancel </v-btn>
        <v-btn color="blue" @click="submit" :disabled="name === ''">
          Submit
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>
