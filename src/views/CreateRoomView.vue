<template>
  <div>
    <v-app-bar app color="black">
      <v-toolbar-title class="white--text">VOTER</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/" class="navigation-button">HOME</router-link>
    </v-app-bar>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  name: "CreateRoomView",
};
</script>

<style>
.background {
  background: url("@/assets/Background.png") no-repeat center center fixed;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
}

.navigation-button {
  text-decoration: none;
  color: white !important;
  margin-right: 16px;
  font-weight: bold;
}
</style>
