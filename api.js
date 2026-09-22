const SCIEZKA_DANYCH = "./karty.json";

/**
 * Pobiera listę symboli z lokalnego pliku JSON.
 * @returns {Promise<Array<{symbol: string}>>}
 */
export async function pobierzDane() {
  const odpowiedz = await fetch(SCIEZKA_DANYCH, { cache: "no-store" });

  if (!odpowiedz.ok) {
    throw new Error("Nie udało się pobrać pliku karty.json.");
  }

  const dane = await odpowiedz.json();

  if (!Array.isArray(dane)) {
    throw new Error("Plik karty.json musi zawierać tablicę.");
  }

  const symbole = dane.filter(
    (element) =>
      element &&
      typeof element.symbol === "string" &&
      element.symbol.trim() !== ""
  );

  if (symbole.length < 8) {
    throw new Error("Plik karty.json musi zawierać co najmniej 8 symboli.");
  }

  return symbole;
}
