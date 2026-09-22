import { pobierzDane } from "./api.js";
import {
  ustawKarty,
  pobierzStan,
  pobierzRuchy,
  pobierzCzas,
  rozpocznijGre,
  czyGraRozpoczeta,
  zwiekszRuch,
  zwiekszCzas,
  odkryjKarte,
  zakryjKarte,
  oznaczJakoZnaleziona,
  wszystkieParyZnalezione,
  zapiszWynik,
  pobierzWyniki,
  wyzerujStan
} from "./stan.js";
import {
  rysuj,
  aktualizujStatystyki,
  pokazKomunikat,
  pokazWyniki,
  ustawObslugeKlikniecia
} from "./widok.js";

const newGameButton = document.querySelector("#new-game");
const difficultySelect = document.querySelector("#difficulty");

let liczbaPar = Number(difficultySelect.value);
let wybraneKarty = [];
let planszaZablokowana = false;
let timerId = null;
let numerGry = 0;

ustawObslugeKlikniecia(obsluzKlikniecieKarty);
newGameButton.addEventListener("click", () => rozpocznijNowaGre(liczbaPar));
difficultySelect.addEventListener("change", zmienPoziom);

pokazWyniki(pobierzWyniki());
rozpocznijNowaGre(liczbaPar);

async function rozpocznijNowaGre(pary) {
  const numerTejGry = ++numerGry;

  zatrzymajTimer();
  wyzerujStan();
  wybraneKarty = [];
  planszaZablokowana = false;

  pokazKomunikat("");
  aktualizujStatystyki(0, 0);

  try {
    const symbole = await pobierzDane();

    if (numerTejGry !== numerGry) {
      return;
    }

    const wybraneSymbole = tasuj([...symbole]).slice(0, pary);
    const noweKarty = utworzParyKart(wybraneSymbole);

    ustawKarty(tasuj(noweKarty));
    rysuj(pobierzStan());
  } catch (error) {
    pokazKomunikat(`Błąd: ${error.message}`);
  }
}

async function zmienPoziom() {
  liczbaPar = Number(difficultySelect.value);
  await rozpocznijNowaGre(liczbaPar);
}

function obsluzKlikniecieKarty(id) {
  if (planszaZablokowana) {
    return;
  }

  const karta = odkryjKarte(id);

  if (!karta) {
    return;
  }

  if (!czyGraRozpoczeta()) {
    rozpocznijGre();
    uruchomTimer();
  }

  wybraneKarty.push(karta);
  rysuj(pobierzStan());

  if (wybraneKarty.length < 2) {
    return;
  }

  zwiekszRuch();
  aktualizujStatystyki(pobierzRuchy(), pobierzCzas());
  sprawdzPare();
}

function sprawdzPare() {
  const [pierwszaKarta, drugaKarta] = wybraneKarty;
  planszaZablokowana = true;

  if (pierwszaKarta.symbol === drugaKarta.symbol) {
    oznaczJakoZnaleziona(pierwszaKarta.id);
    oznaczJakoZnaleziona(drugaKarta.id);
    wybraneKarty = [];
    planszaZablokowana = false;

    rysuj(pobierzStan());

    if (wszystkieParyZnalezione()) {
      zakonczGre();
    }

    return;
  }

  const numerGryDlaOpoznienia = numerGry;

  window.setTimeout(() => {
    if (numerGryDlaOpoznienia !== numerGry) {
      return;
    }

    zakryjKarte(pierwszaKarta.id);
    zakryjKarte(drugaKarta.id);
    wybraneKarty = [];
    planszaZablokowana = false;

    rysuj(pobierzStan());
  }, 700);
}

function uruchomTimer() {
  zatrzymajTimer();

  timerId = window.setInterval(() => {
    zwiekszCzas();
    aktualizujStatystyki(pobierzRuchy(), pobierzCzas());
  }, 1000);
}

function zatrzymajTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function zakonczGre() {
  zatrzymajTimer();

  const wynik = {
    poziom: liczbaPar,
    ruchy: pobierzRuchy(),
    czas: pobierzCzas()
  };

  zapiszWynik(wynik);
  pokazWyniki(pobierzWyniki());
  pokazKomunikat(
    `Wygrana! Ruchy: ${wynik.ruchy}, czas: ${formatujCzas(wynik.czas)}.`
  );
}

function utworzParyKart(symbole) {
  const karty = [];
  let nextId = 1;

  symbole.forEach((element) => {
    for (let kopia = 0; kopia < 2; kopia += 1) {
      karty.push({
        id: nextId,
        symbol: element.symbol,
        odkryta: false,
        znaleziona: false
      });
      nextId += 1;
    }
  });

  return karty;
}

function tasuj(tablica) {
  for (let i = tablica.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [tablica[i], tablica[j]] = [tablica[j], tablica[i]];
  }

  return tablica;
}

function formatujCzas(sekundy) {
  const minuty = Math.floor(sekundy / 60);
  const sekundyPoMinucie = sekundy % 60;

  return `${String(minuty).padStart(2, "0")}:${String(sekundyPoMinucie).padStart(2, "0")}`;
}
