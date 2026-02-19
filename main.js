import { AnimeService } from "./api.js";
import { UiManager } from "./ui.js";

const animeService = new AnimeService();
const uiManager = new UiManager();

const maxCardsPerPage = 3;

let currentPage = 1;

let animeCards = await animeService.getAnimePage(currentPage, maxCardsPerPage);
uiManager.showCards(animeCards);
