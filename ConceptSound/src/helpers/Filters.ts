import {ref, Ref} from "vue";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";

export class Filters {

    public titleFilter: Ref<string>;
    public tagFilter: Ref<string[]>;

    public constructor() {
        this.titleFilter = ref("");
        this.tagFilter = ref([]);
    }

    public matchesFilter(bookCover): boolean {
        return bookCover.title.toLowerCase().indexOf(this.titleFilter.value.toLowerCase()) != -1
            && this.tagFilter.value.every((tag) => bookCover.tags.includes(tag));
    }

    public enableTag(tag: string) {
        putToArray(this.tagFilter.value, tag);
    }

    public disableTag(tag: string) {
        ripFromArray(this.tagFilter.value, tag)
    }
}