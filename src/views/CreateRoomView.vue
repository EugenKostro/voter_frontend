<template>
  <v-app>
    <v-app-bar app color="black">
      <v-toolbar-title class="white--text">VOTER</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/" class="white--text">HOME</router-link>
    </v-app-bar>

    <v-parallax
      src="@/assets/Background.png"
      height="850"
    >
    </v-parallax>
    <v-container fluid class="pa-0 white-background">
      <v-spacer></v-spacer> 
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="mb-12"> 
            <v-card-title>
              Room Details
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Room Name"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" class="mr-4">
                Create
              </v-btn>
              <v-btn color="grey" @click="clearForm">
                Clear
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-spacer></v-spacer> 
    </v-container>
  </v-app>
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

.form-container {
  margin-top: 1000px; 
  padding-bottom: 1500px; 
}
.white-background {
  background-color: white; 
}


</style>

