# Jellyfin to Seerr Redirect 

Lekki i skuteczny skrypt JavaScript do przekierowywania konkretnych bibliotek Jellyfin na zewnętrzne adresy URL (np. Jellyseerr, Seerr). Rozwiązanie typu "inject-and-forget", które nie wymaga instalacji ciężkich wtyczek.

---
### Przetestowane na:
- **Jellyfin** 10.11.8
- **Seerr** 3.1.0
## Dlaczego to rozwiązanie?

- **Bez wtyczek:** Nie obciążasz serwera dodatkowymi procesami.
- **Niezależność od języka:** Skrypt identyfikuje kafelek po unikalnym `data-id`.
- **Błyskawiczne działanie:** Wykorzystuje delegację zdarzeń (Event Delegation), dzięki czemu przekierowanie następuje natychmiast po kliknięciu.

---


## 🛠️ Instrukcja instalacji


### 1. Przygotowanie "pustej" biblioteki (Trigger)

Aby skrypt miał na czym operować, musisz stworzyć w Jellyfin bibliotekę, która będzie służyła jako przycisk.

1.  Wejdź w **Kokpit** -> **Biblioteki**.
2.  Kliknij **Dodaj media do biblioteki**.
3.  Ustaw typ zawartości. Nie ma znaczenia jaki.
4.  Nadaj nazwę wyświetlaną (np. `Discover`).
5.  **Foldery:** Nie dodawaj żadnych folderów! Zostaw tę sekcję pustą.
6.  W ustawieniach biblioteki (na dole):
    *   Odznacz wszystkie opcje
7.  Zatwierdź klikając **OK**.

Teraz na ekranie głównym pojawi się kafelek z Twoją nazwą. Jeśli chcesz, by wyglądał profesjonalnie, kliknij na niego trzy kropki -> **Edytuj obraz** i wgraj własną grafikę (np. logo Seerr).

### 2. Znajdź ID swojej biblioteki
1. Otwórz Jellyfin w przeglądarce.
2. Kliknij prawym przyciskiem myszy na kafelek biblioteki, którą chcesz przekierować (np. "Seerr").
3. Wybierz **Zbadaj (Inspect)**.
4. Znajdź atrybut `data-id` (np. `data-id="019e0750d3ff75a79b877af453d36efb"`). Skopiuj go.

### 3. Utworzenie pliku redirect.js
Wklej poniższy skrypt do pliku redirect.js

```html
    document.addEventListener('click', function(event) {
        // Szukamy najbliższego kafelka (karty)
        const card = event.target.closest('.card, .navMenuOption');

        if (card) {
            // Sprawdzamy po unikalnym ID Twojej biblioteki
            const itemId = card.getAttribute('data-id') || card.getAttribute('data-itemid');

            // ID z kodu to: 019e0750d3ff75a79b877af453d36efb zamień na swój
            if (itemId === '019e0750d3ff75a79b877af453d36efb') {

                console.log("Wykryto kliknięcie w bibliotekę przekierowań. Przekierowuję do Jellyseerr...");

                event.preventDefault();
                event.stopPropagation();

                // TU WPISZ SWÓJ ADRES JELLYSEERR
                const jellyseerrUrl = 'https://127.0.0.1:5055';
                window.location.href = jellyseerrUrl;
            }
        }
    }, true);
```
### 3. Edycja index.html
Skopiuj swój index.html do wybranej lokalizacji poleceniem:
```sh
docker cp <name_of_jellyfin_container>:/jellyfin/jellyfin-web/index.html ./index.html
```
Wklej poniższy skrypt na samym dole pliku `index.html` Twojego serwera Jellyfin (tuż przed tagiem `</body>`):

```html
<script src="redirect.js?v=2"></script>
```
!!! Uwaga! Przy każdej zmianie w redirect.js najlepiej jest zmienić v=2 na kolejny. Wtedy mamy pewność, że przeglądarka poprawnie załaduje zmieniony plik.

### 4. Wdrożenie (Docker)

Jeśli używasz Dockera, najbezpieczniej jest podmontować zmodyfikowany plik przez wolumen w docker-compose.yml:

```yml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    volumes:
      - /sciezka/do/twojego/index.html:/jellyfin/jellyfin-web/index.html:ro
      - /sciezka/do/twojego/index.html:/jellyfin/jellyfin-web/redirect.js:ro
```
Restart kontenera:
```sh
docker compose ip -d --force-recreate <name_of_jellyfin_container>
