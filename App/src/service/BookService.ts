import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {Book} from "@/model/Book";
import {removeEntity, retrieveEntities, saveEntity} from "@/database/PersistencyService";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";
import {Page} from "@/model/Page";
import {DeepWatcher} from "@/helpers/DeepWatcher";
import {usePageService} from "@/service/PageService";
import {pageIndexes, updatePages} from "@/database/Indexer";

export const useBookService = defineStore('bookService', () => {
    const pageService = usePageService();
    const book: Ref<Book> = ref(new Book(""));
    const pages: Ref<Page[]> = ref([]);
    const bookWatcher: DeepWatcher = new DeepWatcher();

    function initBook(bookToInit: Book) {
        bookWatcher.destroyWatcher();
        book.value = bookToInit;
        book.value.modificationDate = new Date();
        retrieveEntities(pageIndexes.value).then((retrievedPages: Page[]) => {
            pages.value = retrievedPages
            bookWatcher.createWatcher(book, () => saveEntity(book.value))
        });
    }

    async function addPage(type: string) {
        const page: Page = new Page(type);
        await saveEntity(page);
        putToArray(pages.value, page);
        await updatePages();
        pageService.editPage(page)
    }

    async function removePage(page: Page) {
        ripFromArray(pages.value, page)
        await updatePages();
        await removeEntity(page);
    }

    async function swapPage(from = 0, to = 0) {
        putToArray(pages.value, ripFromArray(pages.value, pages.value[from]), to);
        await updatePages();
    }

    async function setBookTitle(title: string) {
        book.value.title = title;
    }

    async function setBookCover(picture: string) {
        book.value.cover = picture;
    }

    async function addTag(tag: string) {
        if (!book.value.tags.includes(tag)) {
            putToArray(book.value.tags, tag);
        }
    }

    async function removeTag(tag: string) {
        ripFromArray(book.value.tags, tag);
    }

    return {
        book,
        pages,
        initBook,
        addPage,
        removePage,
        swapPage,
        setBookTitle,
        setBookCover,
        addTag,
        removeTag,
    }
});
