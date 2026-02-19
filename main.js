import { AnimeService } from "./api.js";
import { UiManager } from "./ui.js";

const pageNav = document.getElementById("page-nav");

const animeService = new AnimeService();
const uiManager = new UiManager(pageNav);

const maxCardsPerPage = 3;
let currentPage = 1;

await startShowing();

async function startShowing() {
  pageSetup();
  pageNav.addEventListener("click", async () => {
    if (event.target.name == "pageNum") {
      currentPage = event.target.id;
      pageSetup();
    }
  });
}

async function pageSetup() {
  const cards = await getCards();
  const hasNextPage = cards.pagination.has_next_page;

  uiManager.showCards(cards.data);
  uiManager.updateNavigation(currentPage, hasNextPage);
}

async function getCards() {
  let animeCards = await animeService.getAnimePage(
    currentPage,
    maxCardsPerPage,
  );
  return animeCards;
}
