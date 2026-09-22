# KARTA KONTRAKTU — TEMAT 5. GRA MEMORY

Zespół: 2 Temat: Gra memory

## Role

Integrator (main.js, index.html): Stanislav

API (api.js): Mikita

Stan (stan.js): Darii

Widok (widok.js, styl.css): Maksym

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
+--------------------------------------------------------------+
```

## 2. Kształt jednego elementu w stanie

```js
{
  id: 1,
  symbol: "🍎",
  odkryta: false,
  znaleziona: false
}
```

## 3. Funkcje udostępniane przez moduły

```text
plik       nazwa funkcji                     przyjmuje              zwraca
---------  --------------------------------  ---------------------  -------------------------
api.js     pobierzDane()                     nic                    Promise<tablica symboli>
stan.js    ustawKarty(karty)                 tablica kart           nic
stan.js    pobierzStan()                     nic                    tablica kart
stan.js    odkryjKarte(id)                   id                     karta albo null
stan.js    zakryjKarte(id)                   id                     nic
stan.js    oznaczJakoZnaleziona(id)          id                     nic
stan.js    zwiekszRuch()                     nic                    nic
stan.js    zwiekszCzas()                     nic                    nic
stan.js    zapiszWynik(wynik)                obiekt wyniku          nic
stan.js    pobierzWyniki()                   nic                    tablica wyników
widok.js   rysuj(karty)                      tablica kart           nic
widok.js   aktualizujStatystyki(ruchy,czas)  ruchy, czas            nic
widok.js   pokazKomunikat(tekst)             tekst                  nic
widok.js   pokazWyniki(wyniki)               tablica wyników        nic
```
