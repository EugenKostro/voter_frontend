import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateRoomView from "../views/CreateRoomView.vue";
import RoomView from "../views/RoomView.vue";
import RegisterView from "@/views/registerView.vue";
import LoginView from "@/views/loginView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/create-room",
    name: "createRoom",
    component: CreateRoomView,
  },
  {
    path: "/room",
    name: "room",
    component: RoomView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
