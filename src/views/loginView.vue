<template>
  <v-container>
    <v-img
      :src="require('@/assets/Background.png')"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="100%"
    >
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-5" dark elevation="12">
            <v-card-title class="text-h5">Log in</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  label="Email"
                  v-model="email"
                  type="email"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="password"
                  type="password"
                  outlined
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary">Log in</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      fetch("https://voter-p3p3.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("userToken", data.token);
          this.$root.$emit("user-logged-in"); 
          this.$router.push("/");
        })

        .catch((error) => {
          console.error("Error during login:", error);
        });
    },
  },
};
</script>

<style scoped>
.v-application--wrap {
  background: url("@/assets/Background.png") no-repeat center center fixed;
  background-size: cover;
}
</style>
