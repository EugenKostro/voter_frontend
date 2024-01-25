<template>
  <div>
    <div class="text-container">
      <div class="text-section left">
        <div class="welcome-text">
          WELCOME TO <br />
          THE <br />ANNONYMOUS <br />
          VOTING.
        </div>
      </div>
      <div class="text-section right">
        <div class="vote-text">
          VOTE <br />
          WITHOUT <br />
          CARE.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style>
.v-app-bar {
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.7),
    0 2px 4px -1px rgba(255, 255, 255, 0.06);
}

.v-app-bar::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: white;
  box-shadow: 0 2px 4px white;
  z-index: 3;
}

.v-application--wrap {
  background: url("@/assets/Background.png") no-repeat center center fixed;
  background-size: cover;
}

.text-container {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
}

.text-section {
  position: absolute;
}

.text-section.left {
  left: 10px;
  top: 100px;
}

.text-section.right {
  right: 50px;
  top: 130px;
}

.welcome-text,
.vote-text {
  color: white;
  font-weight: bold;
  font-size: 3em;
  z-index: 5;
  margin: 16px;
  border: 2px solid white;
  box-shadow: 0 0 10px white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  box-sizing: border-box;
}

.navigation-button {
  text-decoration: none;
  color: white !important;
  margin-right: 16px;
  font-weight: bold;
}
</style>
