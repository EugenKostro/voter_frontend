<template>
  <v-app>
    <v-app-bar app color="black">
      <v-toolbar-title class="white--text">VOTER</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="white--text" text @click="$router.push('/')">HOME</v-btn>
    </v-app-bar>

    <v-container fluid class="room-container">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-4" color="white">
            <div class="voting-buttons">
              <v-btn class="vote-btn" @click="vote('YES')" :disabled="hasVoted">YES</v-btn>
              <v-btn class="vote-btn" @click="vote('NO')" :disabled="hasVoted">NO</v-btn>
              <v-btn class="vote-btn" @click="vote('DONT_KNOW')" :disabled="hasVoted">DON'T KNOW</v-btn>
            </div>
            <v-text-field
              label="Vote Link"
              v-model="voteLink"
              readonly
              outlined
              dense
              append-outer-icon="mdi-content-copy"
              @click:append-outer="copyVoteLink"
            ></v-text-field>
            <div class="statistics">
              <div>Number of voters: {{ numberOfVoters }}</div>
              <div>Voted: {{ voted }}</div>
              <div>Time left: {{ timeLeft }}</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      roomName: '',
      timeLeft: '',
      numberOfVoters: 0,
      voted: 0,
      voters: [],
      voteLink: '',
      endTime: null,
      intervalId: null,
      hasVoted: false,
    };
  },
  methods: {
    fetchRoomData() {
      const roomToken = this.$route.params.roomToken;
      // Ispravak za generiranje linka
      this.voteLink = `${window.location.origin}/room/${roomToken}`;
      fetch(`http://localhost:3000/rooms/${roomToken}`, {
        headers: this.authHeader(),
      })
      .then((response) => response.json())
      .then((data) => {
        this.roomName = data.name;
        this.endTime = new Date(data.expiresAt).getTime();
        this.updateTimeLeft();
      })
      .catch((error) => console.error("Error:", error));
    },
    vote(option) {
      if (this.hasVoted) {
        alert("You have already voted.");
        return;
      }

      const roomToken = this.$route.params.roomToken;
      fetch(`http://localhost:3000/rooms/vote/${roomToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.authHeader(),
        },
        body: JSON.stringify({ vote: option }),
      })
      .then((response) => response.json())
      .then((data) => {
  if (data.message === "Vote registered.") {
    this.hasVoted = true;
    localStorage.setItem(`hasVoted_${this.$route.params.roomToken}`, 'true');
    alert("Your vote has been registered.");
  }
})

      .catch((error) => {
        console.error("Error during voting:", error);
      });
    },
    authHeader() {
      const token = localStorage.getItem("userToken");
      return token ? { Authorization: `Bearer ${token}` } : {};
    },
    updateTimeLeft() {
      if (this.intervalId) clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const timeLeft = this.endTime - currentTime;
        if (timeLeft <= 0) {
          clearInterval(this.intervalId);
          this.timeLeft = "Time's up!";
        } else {
          const minutes = Math.floor(timeLeft / 60000);
          const seconds = ((timeLeft % 60000) / 1000).toFixed(0);
          this.timeLeft = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
      }, 1000);
    },
    copyVoteLink() {
      navigator.clipboard.writeText(this.voteLink).then(() => {
        this.$toast.open({
          message: 'Vote link copied to clipboard!',
          type: 'success',
        });
      }, (err) => {
        console.error('Could not copy text: ', err);
        alert('Failed to copy the link.');
      });
    },
  },
  mounted() {
  this.fetchRoomData();
  const hasVoted = localStorage.getItem(`hasVoted_${this.$route.params.roomToken}`);
  this.hasVoted = !!hasVoted;
},
  beforeDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.room-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
}

.voting-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.vote-btn {
  margin: 0 10px;
  text-transform: uppercase;
}

.statistics {
  margin-top: 20px;
  text-align: center;
}

/* Additional styles as needed */
</style>
