import { AnimeService } from "./api.js";
import { UiManager } from "./ui.js";

const pageNav = document.getElementById("page-nav");
const cardContainer = document.getElementById("anime-cards");
const autoScroll = document.getElementsByName("auto-scroll")[0];

const animeService = new AnimeService();
const uiManager = new UiManager(pageNav, cardContainer);

const maxCardsPerPage = 3;
let currentPage = 1;
let currentCards = [];

let autoScrollInterval = null;

await startShowing();

async function startShowing() {
  pageSetup();
  autoScrollSetup();
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

function autoScrollSetup() {
  autoScroll.addEventListener("click", async () => {
    if (event.target.checked == true) {
      startAutoScrolling();
    } else {
      stopAutoScrolling();
    }
  });
}

function startAutoScrolling() {
  autoScrollInterval = setInterval(() => {
    currentPage++;
    pageSetup();
  }, 5000);
}

function stopAutoScrolling() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = null;
}

async function pageSetup() {
  const cards = await getCards();
  currentCards = cards;
  const amountOfPages = cards.pagination.last_visible_page;

  if (currentPage > amountOfPages) {
    currentPage--;
  }

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
