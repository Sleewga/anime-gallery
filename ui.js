export class UiManager {
  #cardContainer;
  #pageNav;

  constructor(pageNav) {
    this.#cardContainer = document.getElementById("anime-cards");
    this.#pageNav = pageNav;
  }

  showCards(animeCards) {
    this.#cardContainer.innerHTML = "";
    for (let i = 0; i < animeCards.length; i++) {
      const card = document.createElement("li");

      const name = document.createElement("h1");
      name.innerText = animeCards[i].title;

      const info = document.createElement("div");

      const image = document.createElement("img");
      image.src = animeCards[i].images.jpg.image_url;

      const score = document.createElement("span");
      score.innerText = animeCards[i].score;

      info.appendChild(name);
      info.appendChild(score);

      card.appendChild(image);
      card.appendChild(info);

      card.classList.add("card");

      this.#cardContainer.appendChild(card);
    }
  }

  updateNavigation(currentPage, hasNextPage) {
    this.#pageNav.innerHTML = "";

    if (currentPage != 1) {
      const previousPage = this.createPageNumElement(Number(currentPage) - 1);
      this.#pageNav.appendChild(previousPage);
    }

    const thisPage = this.createPageNumElement(currentPage);
    thisPage.classList.add("current");
    console.log(thisPage);
    console.log(thisPage.classList);
    this.#pageNav.appendChild(thisPage);

    if (hasNextPage) {
      const nextPage = this.createPageNumElement(Number(currentPage) + 1);
      this.#pageNav.appendChild(nextPage);
    }
  }

  createPageNumElement(num) {
    const page = document.createElement("a");
    page.innerText = num;
    page.id = num;
    page.name = "pageNum";
    return page;
  }
}
