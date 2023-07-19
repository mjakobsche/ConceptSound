import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/Navigation.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/tabs/canvas",
	},
	{
		path: "/tabs/",
		component: TabsPage,
		children: [
			{
				path: "",
				redirect: "/tabs/canvas",
			},
			{
				path: "library",
				component: () => import("@/views/TabLibrary.vue"),
			},
			{
				path: "canvas",
				component: () => import("@/views/TabCanvas.vue"),
			},
			{
				path: "utilities",
				component: () => import("@/views/TabUtilities.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
