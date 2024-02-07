<template>
  <v-app>
    <v-app-bar app color="black">
      <v-toolbar-title class="white--text">VOTER</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link v-if="isLoginOrRegisterPage" to="/" class="navigation-button"
        >HOME</router-link
      >
      <router-link
        v-if="!isLoggedIn && !isLoginOrRegisterPage"
        to="/login"
        class="navigation-button"
        >LOGIN</router-link
      >
      <router-link
        v-if="!isLoggedIn && !isLoginOrRegisterPage"
        to="/register"
        class="navigation-button"
        >REGISTRATION</router-link
      >
      <router-link v-if="isLoggedIn" to="/create-room" class="navigation-button"
        >CREATE ROOM</router-link
      >
      <v-btn v-if="isLoggedIn" text class="white--text" @click="logout"
        >LOGOUT</v-btn
      >
    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("userToken");
    },
    isLoginOrRegisterPage() {
      return this.$route.path === "/login" || this.$route.path === "/register";
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("userToken");
      this.$router.push("/login");
    },
  },
};
</script>
