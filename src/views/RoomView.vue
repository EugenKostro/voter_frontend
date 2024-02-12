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
              <v-btn class="vote-btn" @click="vote('YES')" :disabled="hasVoted"
                >YES</v-btn
              >
              <v-btn class="vote-btn" @click="vote('NO')" :disabled="hasVoted"
                >NO</v-btn
              >
              <v-btn
                class="vote-btn"
                @click="vote('DONT_KNOW')"
                :disabled="hasVoted"
                >DON'T KNOW</v-btn
              >
              <v-btn v-if="voted >= maxParticipants" @click="endVoting">STATISTICS</v-btn>
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
      roomName: "",
      timeLeft: "",
      voted: 0,
      voters: [],
      voteLink: "",
      endTime: null,
      intervalId: null,
      hasVoted: false,
      numberOfParticipants: 0,
      isCreator: false,
      maxParticipants: 0,
    };
  },
  methods: {
    fetchRoomData() {
      const roomToken = this.$route.params.roomToken;
      this.voteLink = `${window.location.origin}/room/${roomToken}`;
      fetch(`https://voter-p3p3.onrender.com/rooms/${roomToken}`, {
        headers: this.authHeader(),
      })
        .then((response) => response.json())
        .then((data) => {
  this.roomName = data.name;
  this.endTime = new Date(data.expiresAt).getTime();
  this.maxParticipants = data.maxParticipants;
  this.voted = data.votes.length;
  this.updateTimeLeft();
  this.numberOfParticipants = data.maxParticipants;
  this.isCreator = data.creatorId === localStorage.getItem("userId");
})

        .catch((error) => console.error("Error:", error));
    },
    vote(option) {
      if (this.hasVoted) {
        alert("You have already voted.");
        return;
      }

      const roomToken = this.$route.params.roomToken;
      fetch(`https://voter-p3p3.onrender.com/rooms/vote/${roomToken}`, {
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
            localStorage.setItem(`hasVoted_${roomToken}`, "true");
            alert("Your vote has been registered.");
            this.fetchRoomData(); 
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
          this.timeLeft = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
      }, 1000);
    },
    copyVoteLink() {
      navigator.clipboard.writeText(this.voteLink).then(
        () => {
          this.$toast.open({
            message: "Vote link copied to clipboard!",
            type: "success",
          });
        },
        (err) => {
          console.error("Could not copy text: ", err);
          alert("Failed to copy the link.");
        }
      );
    },
    async endVoting() {
  try {
    const response = await fetch(`https://voter-p3p3.onrender.com/rooms/end/${this.$route.params.roomToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.authHeader(),
      },
    });
    const data = await response.json();
    if (response.ok) {
      alert(`Voting ended. Results: YES: ${data.results.YES}, NO: ${data.results.NO}, DON'T KNOW: ${data.results["DON'T KNOW"]}`);
    } else {
      alert(data.message || "Failed to end voting.");
    }
  } catch (error) {
    console.error("Error ending voting:", error);
    alert("An error occurred while trying to end voting.");
  }
},

  },
  mounted() {
    this.fetchRoomData();
    const hasVoted = localStorage.getItem(
      `hasVoted_${this.$route.params.roomToken}`
    );
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

</style>