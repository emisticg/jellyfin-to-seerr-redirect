<script>
    document.addEventListener('click', function(event) {
        // Szukamy najbliższego kafelka (karty)
        const card = event.target.closest('.card');

        if (card) {
            // Sprawdzamy po unikalnym ID Twojej biblioteki "Discover"
            const itemId = card.getAttribute('data-id');

            // ID z Twojego kodu to: 019e0750d3ff75a79b877af453d36efb zamień na swój
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
</script>
