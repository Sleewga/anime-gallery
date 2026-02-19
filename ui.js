export class UiManager {
  #cardContainer;
  #pageNav;

  constructor(pageNav, cardContainer) {
    this.#cardContainer = cardContainer;
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
      card.id = i;

      this.#cardContainer.appendChild(card);
    }
  }

  showDetail(detail) {
    const detailElement = document.createElement("div");

    const synopsisTitle = document.createElement("h1");
    synopsisTitle.innerText = "Synopsis:";
    const synopsis = document.createElement("p");
    synopsis.innerText = detail.synopsis;

    detailElement.appendChild(synopsisTitle);
    detailElement.appendChild(synopsis);

    const charactersTitle = document.createElement("h1");
    charactersTitle.innerText = "Characters:";

    detailElement.appendChild(charactersTitle);

    const charactersContainer = document.createElement("ul");
    charactersContainer.classList.add("characters-container");
    this.loadCharacters(charactersContainer, detail);

    detailElement.appendChild(charactersContainer);
    detailElement.classList.add("anime-detail");
    this.addCloseButton(detailElement);

    this.#cardContainer.appendChild(detailElement);
  }

  loadCharacters(charactersContainer, detail) {
    for (let i = 0; i < detail.character.data.length; i++) {
      const characterContainer = document.createElement("li");
      const character = detail.character.data[i].character;

      const image = document.createElement("img");
      image.src = character.images.jpg.image_url;

      const name = document.createElement("h3");
      name.innerText = character.name;

      characterContainer.appendChild(image);
      characterContainer.appendChild(name);

      charactersContainer.appendChild(characterContainer);
    }
  }

  addCloseButton(parentElement) {
    const closeButton = document.createElement("a");
    closeButton.innerText = "x";
    closeButton.classList.add("close-button");

    parentElement.appendChild(closeButton);
  }

  closeDetail() {
    const detail = document.querySelector(".anime-detail");
    this.#cardContainer.removeChild(detail);
  }

  updateNavigation(currentPage, hasNextPage) {
    this.#pageNav.innerHTML = "";

    if (currentPage != 1) {
      const previousPage = this.createPageNumElement(Number(currentPage) - 1);
      this.#pageNav.appendChild(previousPage);
    }

    const thisPage = this.createPageNumElement(currentPage);
    thisPage.classList.add("current");
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
