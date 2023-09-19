<script setup>
const drawer = ref(false);
</script>

<template>
  <v-layout>
    <v-app-bar>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          link
          prepend-icon="mdi-home"
          title="Home"
          value="home"
          :to="'/admin'"
        />
        <v-list-item
          link
          prepend-icon="mdi-cog"
          title="Settings"
          value="settings"
          :to="'/admin/settings'"
        />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>
