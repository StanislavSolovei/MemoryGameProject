const board = document.querySelector("#board");
const movesElement = document.querySelector("#moves");
const timeElement = document.querySelector("#time");
const messageElement = document.querySelector("#message");
const scoresBody = document.querySelector("#scores-body");

let obslugaKliknieciaKarty = () => {};

export function ustawObslugeKlikniecia(callback) {
  obslugaKliknieciaKarty = callback;
}

export function rysuj(karty) {
  board.innerHTML = "";

  karty.forEach((karta) => {
    const przycisk = document.createElement("button");

    przycisk.type = "button";
    przycisk.className = "card";
    przycisk.setAttribute("aria-label", "Zakryta karta");

    if (karta.odkryta || karta.znaleziona) {
      przycisk.classList.add("card--open");
      przycisk.textContent = karta.symbol;
      przycisk.setAttribute("aria-label", `Odkryta karta: ${karta.symbol}`);
    } else {
      przycisk.textContent = "?";
    }

    if (karta.znaleziona) {
      przycisk.classList.add("card--found");
      przycisk.disabled = true;
    }

    przycisk.addEventListener("click", () => {
      obslugaKliknieciaKarty(karta.id);
    });

    board.appendChild(przycisk);
  });
}

export function aktualizujStatystyki(ruchy, czas) {
  movesElement.textContent = String(ruchy);
  timeElement.textContent = formatujCzas(czas);
}

export function pokazKomunikat(tekst) {
  messageElement.textContent = tekst;
}

export function pokazWyniki(wyniki) {
  scoresBody.innerHTML = "";

  if (wyniki.length === 0) {
    const wiersz = document.createElement("tr");
    const komorka = document.createElement("td");

    komorka.colSpan = 4;
    komorka.textContent = "Brak wyników — zagraj pierwszą partię.";
    wiersz.appendChild(komorka);
    scoresBody.appendChild(wiersz);
    return;
  }

  wyniki.forEach((wynik, index) => {
    const wiersz = document.createElement("tr");
    const wartosci = [
      index + 1,
      tekstPoziomu(wynik.poziom),
      wynik.ruchy,
      formatujCzas(wynik.czas)
    ];

    wartosci.forEach((wartosc) => {
      const komorka = document.createElement("td");
      komorka.textContent = String(wartosc);
      wiersz.appendChild(komorka);
    });

    scoresBody.appendChild(wiersz);
  });
}

function formatujCzas(sekundy) {
  const minuty = Math.floor(sekundy / 60);
  const sekundyPoMinucie = sekundy % 60;

  return `${String(minuty).padStart(2, "0")}:${String(sekundyPoMinucie).padStart(2, "0")}`;
}

function tekstPoziomu(liczbaPar) {
  if (Number(liczbaPar) === 4) return "Łatwy";
  if (Number(liczbaPar) === 6) return "Średni";
  if (Number(liczbaPar) === 8) return "Trudny";

  return `${liczbaPar} par`;
}
