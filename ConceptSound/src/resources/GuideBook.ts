import {Book} from "@/model/Book";
import {Page} from "@/model/Page";
import {save} from "@/database/StorageWrapper";
import {Index} from "@/model/Index";

async function createGuidePage(name: string, content: string) {
    await new Promise(r => setTimeout(r, 1));
    const page = new Page("text");
    page.name = name;
    page.content = content;
    return page;
}

function getGuideBook() {
    return new Book("Kliknij mnie");
}

async function getGuidePages() {
    return [
        await createGuidePage("wstęp", "Gratulacje, udało Ci się otworzyć pierwszy zeszyt! Na kolejnych stronach zaprezentuje kluczowe możliwości ConceptSound."),
        await createGuidePage("strony",
            "Oto więc kolejna strona! Możesz tu zapisywać swoje muzyczne notatki.\n" +
            "Aby edytować stronę kliknij na + \n" +
            "Otworzy się wówczas warsztat  umożliwiający edycję zawartości oraz nazwy strony. Możesz go wyciągnąć bardziej do góry lub zamknąć przesuwając w stronę dolnej krawędzi ekranu. Warsztat może zajmować 25%, 50% lub 90% ekranu. Spróbuj to przetestować!\n" +
            "Aby ukryć treść strony kliknij <⦾> \n" +
            "Kliknij ponownie w to samo miejsce aby pokazać ją ponownie.\n" +
            "Możesz też dowolnie przekładać strony zamieniając je miejscami. W tym celu złap za tytuł strony i przeciągnij ją w górę lub w dół."),
        await createGuidePage("typy stron",
            "Aby dodać stronę, kliknij przycisk w prawym dolnym rogu. Możesz teraz wybrać jeden z czterech typów stron: tekstowy, nutowy, dźwiękowy lub wizualny.\n" +
            "1) tekstowy: podobnie jak pozostałe strony w tym poradniku. Możesz tu także dodawać komentarze na marginesie, poprzedzając linijkę tekstu symbolem małpy: \n" +
            "@w ten sposób!\n" +
            "2) nutowy: zacznij pisać nuty nazwami literowymi i obserwuj efekty nad ekranem warsztatu. Aby dowiedzieć się więcej sprawdź notację ABC.js.\n" +
            "3) dźwiękowy: możesz nagrać i odtworzyć nagranie - klikając w stosownym miejscu na wizualizacji fali dźwiękowej.\n" +
            "4) wizualny: możesz dołączyć zdjęcie jako stronę zeszytu.\n" +
            "Aby usunąć stronę przytrzymaj <⦾> do momentu zawibrowania."),
        await createGuidePage("zeszyt",
            "Zbiór stron to zeszyt. Ten - ma tytuł \"Kliknij mnie\". Aby go edytować naciśnij górny pasek. W menu, które się ukaże, możesz zmienić nazwę zeszytu, ustawić jego okładkę - klikając przycisk zdjęcia, lub opisać zeszyt słowami kluczowymi. Aby przypisać słowo kluczowe kliknij na symbol zakładki. Aby je usunąć - kliknij na nie.\n" +
            "W przyszłości zobaczysz w tym miejscu wszystkie słowa kluczowe istniejące w twojej bibliotece - kliknięcie na dane słowo przypisze je do aktualnie wybranego zeszytu."),
        await createGuidePage("biblioteka",
            "Aby wrócić do biblioteki Twoich zeszytów naciśnij przycisk powrotu. Możesz tam dodawać, otwierać i usuwać zeszyty. Klikając na górny pasek ekranu biblioteki otworzysz menu filtrowania - możesz wyszukiwać zeszyty po nazwie i po tagach."),
        await createGuidePage("zakończenie",
            "Jeżeli dotarłeś aż tutaj - gratulacje! Mam nadzieję, że aplikacja ta będzie ci dobrze służyć. Jeśli wszystko jest już jasne, możesz wrócić do biblioteki i usunąć ten zeszyt.")
    ]
}

async function setupGuide() {
    const guideBook = getGuideBook();
    const guideIndex: Index = new Index(guideBook.id);
    await save(guideBook.id, guideBook);
    const guidePages = await getGuidePages();
    for (let i = 0; i < guidePages.length; i++) {
        const guidePage = guidePages[i]
        await save(guidePage.id, guidePage);
        guideIndex.pagesId.push(guidePage.id)
    }
    return [guideIndex];
}

export {setupGuide}