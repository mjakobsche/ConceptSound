import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LibraryView from "../views/LibraryView.vue";
import BookView from "../views/BookView.vue";
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/library",
	},
	{
		path: "/library",
		name: "Biblioteka",
		component: LibraryView,
	},
	{
		path: "/book",
		name: "Utwór",
		component: BookView,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
