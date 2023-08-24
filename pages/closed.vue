<script setup>
definePageMeta({
  middleware: ["can-be-turned-off"],
});
</script>

<template>
  <div>
    <v-container>
      <v-row justify="center">
        <h1>Signup is closed!</h1>
      </v-row>
      <v-row justify="center">
        <h2>
          You'll have to book us again to sing with us. See you next time!
        </h2>
      </v-row>
    </v-container>
  </div>
</template>
