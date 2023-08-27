import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {Page} from "@/model/Page";

export const useWorkshop = defineStore("workshop", () => {
    const emptyPage: Page = {
        id: -1,
        type: "",
        name: "",
        data: "",
        hidden: false,
    };
    const page: Ref<Page> = ref(emptyPage);

    function setPage(newPage: Page) {
        page.value = newPage;
    }

    return {page, setPage};
});
