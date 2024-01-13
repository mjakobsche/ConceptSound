import {createApp} from "vue";
import {createPinia} from "pinia";
import App from "./App.vue";
import router from "./views/Router";

import {IonicVue} from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme.css";
import BookPageText from "./components/BookPageText.vue";
import BookWorkshopText from "./components/BookWorkshopText.vue";
import BookWorkshopAudio from "./components/BookWorkshopAudio.vue";
import BookPageAudio from "./components/BookPageAudio.vue";
import BookPagePhoto from "./components/BookPagePhoto.vue";
import BookWorkshopPhoto from "./components/BookWorkshopPhoto.vue";
import BookPageScore from "./components/BookPageScore.vue";
import BookWorkshopScore from "./components/BookWorkshopScore.vue";
import {initStorage} from "@/utils/StorageWrapper";

const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(createPinia())
    .component("BookPageText", BookPageText)
    .component("BookWorkshopText", BookWorkshopText)
    .component("BookPageAudio", BookPageAudio)
    .component("BookWorkshopAudio", BookWorkshopAudio)
    .component("BookPagePhoto", BookPagePhoto)
    .component("BookWorkshopPhoto", BookWorkshopPhoto)
    .component("BookPageScore", BookPageScore)
    .component("BookWorkshopScore", BookWorkshopScore);

router.isReady().then(() => initStorage()).then(() => app.mount("#app"));
