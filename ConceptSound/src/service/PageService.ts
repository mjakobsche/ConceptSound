import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {Page} from "@/model/Page";
import {DeepWatcher} from "@/helpers/DeepWatcher";
import {saveEntity} from "@/database/PersistencyService";

export const usePageService = defineStore('pageService', () => {

    const editedPage: Ref<Page> = ref(null as Object);
    const editedPageWatcher: DeepWatcher = new DeepWatcher();

    function editPage(page: Page) {
        editedPageWatcher.destroyWatcher();
        editedPage.value = page;
        editedPageWatcher.createWatcher(editedPage, () => saveEntity(editedPage.value));
    }

    async function togglePageVisibility() {
        editedPage.value.isVisible = !editedPage.value.isVisible;
    }

    async function setPageData(pageData: string) {
        editedPage.value.content = pageData;
    }

    async function setPageName(pageName: string) {
        editedPage.value.name = pageName
    }

    return {
        editedPage,
        editPage,
        togglePageVisibility,
        setPageData,
        setPageName
    }
})