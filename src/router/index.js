import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateRoomView from "../views/CreateRoomView.vue";
import RoomView from "../views/RoomView.vue";
import RegisterView from "@/views/registerView.vue";
import LoginView from "@/views/loginView.vue";
import UnauthorizedView from '@/views/unauthorizedView.vue';

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
    meta: { requiresAuth: true }
  },
  {
    path: "/room",
    name: "room",
    component: RoomView,
    meta: { requiresAuth: true } 
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
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: UnauthorizedView,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('userToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'unauthorized' });
  } else {
    next();
  }
});

export default router;
