<template>
  <v-app>
    <v-app-bar app color="black">
      <v-toolbar-title class="white--text">VOTER</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/" class="white--text">HOME</router-link>
    </v-app-bar>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex flex-column align-center">
          <div class="big-white-square">
            <div class="statistics">
              <div class="voters">Voters: 23</div>
              <div class="voted">Voted: 19</div>
            </div>
            <div class="button-group">
              <v-btn color="primary">Da</v-btn>
              <v-btn color="primary">Ne</v-btn>
              <v-btn color="primary">Suzdržan</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "RoomView",
};
</script>

<style>
.big-white-square {
  background-color: white;
  width: 100%;
  height: 110vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  margin-top: 40px;
}

.statistics {
  font-family: Arial, sans-serif;
  font-size: 15px;
  color: black;
  margin-bottom: 20px;
}

.voters,
.voted {
  margin-bottom: 5px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
