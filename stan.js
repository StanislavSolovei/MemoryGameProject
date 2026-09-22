const KLUCZ_WYNIKOW = "memo-game-wyniki";

let karty = [];
let ruchy = 0;
let czas = 0;
let graRozpoczeta = false;

export function ustawKarty(noweKarty) {
  karty = noweKarty.map((karta) => ({ ...karta }));
  ruchy = 0;
  czas = 0;
  graRozpoczeta = false;
}

export function pobierzStan() {
  return karty.map((karta) => ({ ...karta }));
}

export function pobierzRuchy() {
  return ruchy;
}

export function pobierzCzas() {
  return czas;
}

export function rozpocznijGre() {
  graRozpoczeta = true;
}

export function czyGraRozpoczeta() {
  return graRozpoczeta;
}

export function zwiekszRuch() {
  ruchy += 1;
}

export function zwiekszCzas() {
  czas += 1;
}

export function odkryjKarte(id) {
  const karta = znajdzKarte(id);

  if (!karta || karta.odkryta || karta.znaleziona) {
    return null;
  }

  karta.odkryta = true;
  return { ...karta };
}

export function zakryjKarte(id) {
  const karta = znajdzKarte(id);

  if (karta && !karta.znaleziona) {
    karta.odkryta = false;
  }
}

export function oznaczJakoZnaleziona(id) {
  const karta = znajdzKarte(id);

  if (karta) {
    karta.znaleziona = true;
    karta.odkryta = true;
  }
}

export function wszystkieParyZnalezione() {
  return karty.length > 0 && karty.every((karta) => karta.znaleziona);
}

export function zapiszWynik(wynik) {
  const wyniki = pobierzWyniki();

  wyniki.push({
    poziom: wynik.poziom,
    ruchy: wynik.ruchy,
    czas: wynik.czas
  });

  wyniki.sort((a, b) => {
    if (a.ruchy !== b.ruchy) {
      return a.ruchy - b.ruchy;
    }

    return a.czas - b.czas;
  });

  localStorage.setItem(KLUCZ_WYNIKOW, JSON.stringify(wyniki.slice(0, 10)));
}

export function pobierzWyniki() {
  try {
    const zapis = localStorage.getItem(KLUCZ_WYNIKOW);
    const wyniki = zapis ? JSON.parse(zapis) : [];

    return Array.isArray(wyniki) ? wyniki : [];
  } catch {
    return [];
  }
}

export function wyzerujStan() {
  karty = [];
  ruchy = 0;
  czas = 0;
  graRozpoczeta = false;
}

function znajdzKarte(id) {
  return karty.find((karta) => karta.id === id);
}
