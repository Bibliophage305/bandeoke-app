<script setup>
definePageMeta({
  middleware: ["auth"],
});

const password = useCookie("password", {
  default: () => "",
  maxAge: 604800,
});

const passwordAttempt = ref("");

const submit = async () => {
  await useFetch("/api/auth", {
    method: "post",
    body: {
      password: passwordAttempt.value,
    },
    async onResponse({ request, response, options }) {
      if (response.ok) {
        password.value = passwordAttempt.value;
        await navigateTo("/admin");
      } else {
        passwordAttempt.value = "";
      }
    },
  });
};
</script>

<template>
  <div>
    <v-container>
      <v-row justify="center">
        <h1>The Fever bandeoke admin login</h1>
      </v-row>
      <v-row justify="center">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            label="Password"
            v-model="passwordAttempt"
            type="password"
          />
        </v-responsive>
      </v-row>
      <v-row justify="center">
        <v-btn color="blue" @click="submit" :disabled="passwordAttempt === ''">
          Submit
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>
