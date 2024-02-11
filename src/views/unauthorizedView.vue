<template>
    <v-app>
      <v-app-bar app color="black">
        <v-toolbar-title class="white--text">VOTER</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/" class="white--text">HOME</router-link>
      </v-app-bar>
  
      <v-parallax src="@/assets/Background.png" height="850">
        <div class="unauthorized-text">
          <p class="unauthorized-message">Unauthorized</p>
          <router-link to="/login" class="unauthorized-link">Go to Login page</router-link>
          <router-link to="/register" class="unauthorized-link">Go to Registration page</router-link>
        </div>
      </v-parallax>
    </v-app>
  </template>
  
  <script>
  export default {
    name: "UnauthorizedView",
  };
  </script>
  
  <style scoped>
  .unauthorized-text {
    position: absolute;
    bottom: 50px; 
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: white;
  }
  
  .unauthorized-message {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .unauthorized-link {
    font-size: 18px;
    color: white;
    text-decoration: underline;
    margin: 0 10px;
  }
  </style>
  