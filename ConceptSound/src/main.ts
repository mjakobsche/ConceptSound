import {createApp} from "vue";
import {createPinia} from "pinia";
import App from "./App.vue";
import router from "./views/Router";

import {IonicVue} from "@ionic/vue";

import "@ionic/vue/css/core.css";

import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

import "./theme.css";
import {initStorage} from "@/utils/StorageWrapper";
import TextPage from "@/components/pages/TextPage.vue";
import TextEditor from "@/components/pages/TextEditor.vue";
import AudioPage from "@/components/pages/AudioPage.vue";
import AudioEditor from "@/components/pages/AudioEditor.vue";
import PhotoPage from "@/components/pages/PhotoPage.vue";
import PhotoEditor from "@/components/pages/PhotoEditor.vue";
import ScorePage from "@/components/pages/ScorePage.vue";
import ScoreEditor from "@/components/pages/ScoreEditor.vue";

const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(createPinia())
    .component("text-page", TextPage)
    .component("text-editor", TextEditor)
    .component("audio-page", AudioPage)
    .component("audio-editor", AudioEditor)
    .component("photo-page", PhotoPage)
    .component("photo-editor", PhotoEditor)
    .component("score-page", ScorePage)
    .component("score-editor", ScoreEditor);

router.isReady().then(() => initStorage()).then(() => app.mount("#app"));
