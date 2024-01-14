import {defineStore} from "pinia";
import {computed, ComputedRef, ref, Ref, watch} from "vue";
import {Book} from "@/model/Book";
import {removeEntity, retrieveEntities, saveEntity} from "@/utils/PersistencyService";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";
import {Page} from "@/model/Page";
import {useIndexer} from "@/service/Indexer";
import {DeepWatcher} from "@/composables/DeepWatcher";

export const useBookService = defineStore('bookService', () => {
    const indexer = useIndexer();
    const library: Ref<Book[]> = ref([]);
    const tags: ComputedRef<string[]> = computed(() => {
        return [...new Set(library.value.flatMap((book: Book) => book.tags))];
    })
    const book: Ref<Book> = ref(new Book(""));
    const pages: Ref<Page[]> = ref([]);
    const editedPage: Ref<Page> = ref(null as Object);
    const bookWatcher: DeepWatcher = new DeepWatcher();
    const editedPageWatcher: DeepWatcher = new DeepWatcher();

    function initLibrary() {
        indexer.initIndexer().then(() => {
            retrieveEntities(indexer.bookIndexes).then((books) => {
                library.value = books;
            })
        });
    }

    function initBook(bookToInit: Book) {
        bookWatcher.destroyWatcher();
        book.value = bookToInit;
        book.value.modificationDate = new Date();
        retrieveEntities(indexer.pageIndexes).then((retrievedPages: Page[]) => pages.value = retrievedPages);
        bookWatcher.createWatcher(book, () => saveEntity(book.value))
    }

    function editPage(page: Page){
        editedPageWatcher.destroyWatcher();
        this.editedPage = page;
        editedPageWatcher.createWatcher(editedPage, () => saveEntity(editedPage.value));
    }

    async function addBook(title: string) {
        const book: Book = new Book(title);
        await saveEntity(book);
        putToArray(library.value, book);
        await indexer.updateBooks();
    }

    async function moveToTop(book: Book) {
        putToArray(library.value, ripFromArray(library.value, book))
        await indexer.updateBooks();
    }

    async function removeBook(book: Book) {
        ripFromArray(library.value, book);
        await indexer.updateBooks();
        await removeEntity(book);
    }

    async function addPage(type: string) {
        const page: Page = new Page(type);
        await saveEntity(page);
        putToArray(pages.value, page);
        await indexer.updatePages();
    }

    async function removePage(page: Page) {
        ripFromArray(pages.value, page)
        await indexer.updatePages();
        await removeEntity(page);
    }

    async function swapPage(from = 0, to = 0) {
        putToArray(pages.value, ripFromArray(pages.value, pages.value[from]), to);
        await indexer.updatePages();
    }

    async function togglePageVisibility() {
        editedPage.value.hidden = !editedPage.value.hidden;
    }

    async function setPageData(pageData: string) {
        editedPage.value.data = pageData;
    }

    async function setPageName(pageName: string) {
        editedPage.value.name = pageName
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
        library,
        tags,
        book,
        pages,
        editedPage,
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
        removeTag,
        initLibrary,
        addBook,
        removeBook,
        moveToTop
    }
});
