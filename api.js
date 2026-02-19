export class AnimeService {
  #api = "https://api.jikan.moe/v4/";
  #animeSuffix = "anime";
  #characterSuffix = "characters";

  async getAmountOfPages(maxCardsPerPage) {
    let response = await this.getAnimePage(1, maxCardsPerPage);
    let amountOfPages = response.pagination.last_visible_page;
    return amountOfPages;
  }

  async getAnimePage(page, maxCardsPerPage) {
    const paramsObj = { page: page, limit: maxCardsPerPage };
    const searchParams = new URLSearchParams(paramsObj);
    let response = await fetch(
      this.#api + this.#animeSuffix + "?" + searchParams,
    );
    let json = await response.json();
    return json;
  }
}
