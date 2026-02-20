import { AnimeService } from "./api.js";
import { UiManager } from "./ui.js";

const pageNav = document.getElementById("page-nav");
const cardContainer = document.getElementById("anime-cards");

const animeService = new AnimeService();
const uiManager = new UiManager(pageNav, cardContainer);

const maxCardsPerPage = 3;
let currentPage = 1;
let currentCards = [];

await startShowing();

async function startShowing() {
  pageSetup();
  pageNav.addEventListener("click", async () => {
    if (event.target.name == "pageNum") {
      currentPage = Number(event.target.id);
      pageSetup();
    }
  });
  cardContainer.addEventListener("click", async () => {
    if (event.target.closest(".card")) {
      const cardLocation = event.target.closest(".card").id;
      const detail = await animeService.getAnimeDetail(
        currentCards.data[cardLocation],
      );
      uiManager.showDetail(detail);
    } else if (event.target.classList.contains("close-button")) {
      uiManager.closeDetail();
    }
  });
}

async function pageSetup() {
  const cards = await getCards();
  currentCards = cards;
  const amountOfPages = cards.pagination.last_visible_page;

  uiManager.showCards(cards.data);
  uiManager.updateNavigation(currentPage, amountOfPages);
}

async function getCards() {
  let animeCards = await animeService.getAnimePage(
    currentPage,
    maxCardsPerPage,
  );
  return animeCards;
}
