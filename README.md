# MEMO GAME — projekt zgodny z Tematem 5

## Podział na moduły

**INTEGRATOR**
- `index.html` — struktura strony
- `main.js` — łączy API, stan i widok; steruje przebiegiem gry

**API**
- `api.js` — pobiera symbole z `karty.json` przez `fetch()`

**STAN**
- `stan.js` — przechowuje karty, ruchy i czas oraz obsługuje `localStorage`

**WIDOK**
- `widok.js` — rysuje planszę, statystyki, komunikat i wyniki
- `styl.css` — prosty wygląd strony

## 1. Szkic ekranu

```text
+--------------------------------------------------------------+
| MEMO GAME                         Ruchy: 0    Czas: 00:00    |
|--------------------------------------------------------------|
|                                                              |
|     +------+  +------+  +------+  +------+                   |
|     |  ?   |  |  ?   |  |  ?   |  |  ?   |                   |
|     +------+  +------+  +------+  +------+                   |
|                                                              |
|     +------+  +------+  +------+  +------+                   |
|     |  ?   |  |  ?   |  |  ?   |  |  ?   |                   |
|     +------+  +------+  +------+  +------+                   |
|                                                              |
|     [ Nowa gra ]                     Poziom: [ Łatwy ]       |
|                                                              |
|     Najlepsze wyniki                                         |
|     +-----+---------+-------+--------+                       |
|     |  #  | Poziom  | Ruchy |  Czas  |                       |
|     +-----+---------+-------+--------+                       |
+--------------------------------------------------------------+
```

## 2. Kształt jednego elementu stanu

```js
{
  id: 1,
  symbol: "🍎",
  odkryta: false,
  znaleziona: false
}
```

## 3. Kontrakt modułów

```text
api.js    pobierzDane()                 -> Promise<tablica symboli>

stan.js   ustawKarty(karty)             -> nic, ustawia stan gry
stan.js   pobierzStan()                 -> tablica kart
stan.js   odkryjKarte(id)               -> karta albo null
stan.js   zakryjKarte(id)               -> nic, zmienia stan
stan.js   oznaczJakoZnaleziona(id)      -> nic, zmienia stan
stan.js   zwiekszRuch()                 -> nic, zwiększa liczbę ruchów
stan.js   zwiekszCzas()                 -> nic, zwiększa czas
stan.js   zapiszWynik(wynik)            -> nic, zapisuje do localStorage
stan.js   pobierzWyniki()               -> tablica wyników

widok.js  rysuj(karty)                  -> nic, rysuje planszę
widok.js  aktualizujStatystyki(ruchy,czas) -> nic, aktualizuje ekran
widok.js  pokazKomunikat(tekst)         -> nic, pokazuje komunikat
widok.js  pokazWyniki(wyniki)           -> nic, rysuje tabelę
```

## Realizacja wymagań

- plansza z zakrytymi kartami — TAK
- odkrywanie po kliknięciu — TAK
- sprawdzanie par — TAK
- licznik ruchów — TAK; jeden ruch = próba odkrycia dwóch kart
- komunikat o wygranej — TAK
- tabela najlepszych wyników — TAK
- `localStorage` — TAK
- własny `karty.json` — TAK
- `fetch()` — TAK
- wybór trudności 4 / 6 / 8 par — TAK
- licznik czasu — TAK
- tasowanie przy każdej nowej grze — TAK
- internet nie jest potrzebny — TAK; dane są lokalne

## Uruchomienie

`fetch()` nie zadziała poprawnie przy otwieraniu pliku przez `file://`. Uruchomiamy projekt przez prosty serwer.

### VS Code + Live Server

Otwórzamy `index.html` przez **Open with Live Server**.
