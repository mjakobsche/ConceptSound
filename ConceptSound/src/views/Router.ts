import {createRouter, createWebHistory} from "@ionic/vue-router";
import {RouteRecordRaw} from "vue-router";
import LibraryView from "./LibraryView.vue";
import BookView from "./BookView.vue";

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
