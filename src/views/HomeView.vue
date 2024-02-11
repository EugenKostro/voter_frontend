<template>
  <div class="text-container">
    <div class="text-section welcome-text">
      WELCOME TO <br />
      THE <br />ANONYMOUS <br />
      VOTING.
    </div>
    <div class="text-section vote-text">
      VOTE <br />
      WITHOUT <br />
      CARE.
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style>
.v-application--wrap {
  background: url("@/assets/Background.png") no-repeat center center fixed;
  background-size: cover;
}

.text-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  position: relative;
}

.text-section {
  flex: 1;
  color: white;
  font-weight: bold;
  font-size: 3em;
  text-shadow: 4px 4px 8px rgba(242, 242, 242, 0.8);
  padding: 0 5%;
  box-sizing: border-box;
}

.welcome-text {
  text-align: left;
  margin-left: 2vw;
}

.vote-text {
  text-align: right;
  margin-right: 5vw;
}

</style>
