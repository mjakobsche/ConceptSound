import {defineStore} from "pinia";
import {computed, ComputedRef} from "vue";
import {useBookService} from "@/service/BookService";
import {Book} from "@/model/Book";
import {useLibraryService} from "@/service/LibraryService";

export const useTagService = defineStore('tagService', () => {
    const libraryService = useLibraryService();
    const tags: ComputedRef<string[]> = computed(() => {
        return [...new Set(libraryService.library.flatMap((book: Book) => book.tags))];
    })
    return {tags}
})
