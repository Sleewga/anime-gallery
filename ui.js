export class UiManager {
  #cardContainer;

  constructor() {
    this.#cardContainer = document.getElementById("anime-cards");
  }

  showCards(animeCards) {
    console.log(animeCards);
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
}
