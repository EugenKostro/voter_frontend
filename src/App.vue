<template>
  <v-app>
    <v-app-bar app color="black">
      <v-toolbar-title class="white--text">VOTER</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/create-room" class="navigation-button"
        >CREATE ROOM</router-link
      >
      <router-link to="/login" class="navigation-button">LOGIN</router-link>
      <router-link to="/registration" class="navigation-button"
        >REGISTRATION</router-link
      >
    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>

</style>
