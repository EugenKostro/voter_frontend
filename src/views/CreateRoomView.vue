<template>
  <v-app>
    <v-app-bar app color="black">
      <v-toolbar-title class="white--text">VOTER</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/" class="white--text">HOME</router-link>
    </v-app-bar>

    <v-parallax src="@/assets/Background.png" height="850"></v-parallax>
    <v-container fluid class="pa-0 white-background">
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="mb-12">
            <v-card-title>Room Details</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Room Name"
                  v-model="roomName"
                  required
                ></v-text-field>
                <v-text-field
                  label="Number of participants"
                  v-model="numberOfParticipants"
                  required
                ></v-text-field>
                <v-text-field
                  label="Time to vote"
                  v-model="durationInMinutes"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" class="mr-4" @click="createRoom"
                >Create</v-btn
              >
              <v-btn color="red" @click="clearForm">Clear</v-btn>
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
  data() {
    return {
      roomName: "",
      numberOfParticipants: "",
      durationInMinutes: "",
    };
  },
  methods: {
    createRoom() {
      const token = localStorage.getItem("userToken");
      fetch("http://localhost:3000/rooms/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Dodajte token ovdje
        },
        body: JSON.stringify({
          name: this.roomName,
          maxParticipants: this.numberOfParticipants,
          durationInMinutes: this.durationInMinutes,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create room");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Room created successfully", data);
          // Obrada uspješnog odgovora
        })
        .catch((error) => {
          console.error("Error creating room:", error);
        });
    },
    clearForm() {
      this.roomName = "";
      this.numberOfParticipants = "";
      this.durationInMinutes = "";
    },
  },
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
  padding-bottom: 1200px;
}
.white-background {
  background-color: white;
}
</style>
