export class AnimeService {
  #api = "https://api.jikan.moe/v4/anime";

  async getAmountOfPages(maxCardsPerPage) {
    let response = await this.getAnimePage(1, maxCardsPerPage);
    let amountOfPages = response.pagination.last_visible_page;
    return amountOfPages;
  }

  async getAnimePage(page, maxCardsPerPage) {
    const paramsObj = { page: page, limit: maxCardsPerPage };
    const searchParams = new URLSearchParams(paramsObj);

    const response = await fetch(this.#api + "?" + searchParams);
    const json = await response.json();

    return json;
  }

  async getAnimeDetail(anime) {
    const response = await fetch(
      this.#api + "/" + anime.mal_id + "/characters",
    );
    const json = await response.json();

    const synopsis = anime.synopsis;

    const detail = { character: json, synopsis: synopsis };
    return detail;
  }
}
