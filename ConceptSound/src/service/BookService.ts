import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {Book} from "@/model/Book";
import {removeEntity, retrieveEntities, retrieveEntity, saveEntity} from "@/utils/PersistencyService";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";
import {Page} from "@/model/Page";

export const useBookService = defineStore('bookService', () => {
    const book: Ref<Book> = ref(new Book("Temporary"));
    const pages: Ref<Page[]> = ref([]);

    function initBook(bookId: string) {
        retrieveEntity(bookId).then((retrievedBook: Book) => {
            book.value = retrievedBook;
            book.value.modificationDate = new Date();
            retrieveEntities(book.value.pagesId).then((retrievedPages: Page[]) => pages.value = retrievedPages)
        })
    }

    async function addPage(type: string) {
        const page: Page = new Page(type);
        await saveEntity(page);
        putToArray(pages.value, page);
        book.value.pagesId = pages.value.map((page) => page.id);
        await saveEntity(book.value)
    }

    async function removePage(page: Page) {
        ripFromArray(pages.value, page)
        book.value.pagesId = pages.value.map((page) => page.id);
        await saveEntity(book.value);
        await removeEntity(page);
    }

    async function swapPage(from = 0, to = 0) {
        putToArray(pages.value, ripFromArray(pages.value, pages.value[from]), to);
        book.value.pagesId = pages.value.map((page) => page.id);
        await saveEntity(book.value);
    }

    async function togglePageVisibility(page: Page) {
        page.hidden = !page.hidden;
        await saveEntity(page);
    }

    async function setPageData(page: Page, pageData: string) {
        page.data = pageData;
        await saveEntity(page);
    }

    async function setPageName(page: Page, pageName: string) {
        page.name = pageName
        await saveEntity(page);
    }

    async function setBookTitle(title: string) {
        book.value.title = title;
        await saveEntity(book.value)
    }

    async function setBookCover(picture: string) {
        book.value.cover = picture;
        await saveEntity(book.value)
    }

    async function addTag(tag: string) {
        if (!book.value.tags.includes(tag)) {
            putToArray(book.value.tags, tag);
            await saveEntity(book.value)
        }
    }

    async function removeTag(tag: string) {
        ripFromArray(book.value.tags, tag);
        await saveEntity(book.value)
    }

    return {
        book,
        pages,
        initBook,
        addPage,
        removePage,
        togglePageVisibility,
        setPageData,
        setPageName,
        swapPage,
        setBookTitle,
        setBookCover,
        addTag,
        removeTag
    }
});
