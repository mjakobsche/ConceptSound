import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Library from "../views/Library.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/library",
	},
	{
		path: "/library",
		name: "Biblioteka",
		component: Library,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
