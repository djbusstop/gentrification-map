import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MapView from "@/views/MapView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: MapView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
