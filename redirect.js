['click', 'auxclick'].forEach(eventType => {
    document.addEventListener(eventType, function(event) {
        // Allow LMB (0) MMB (1) przycisk. RMB(2).
        if (event.button !== 0 && event.button !== 1) return;

        const card = event.target.closest('.card, .navMenuOption');

        if (!card) return;

        const itemId = card.dataset.id || card.dataset.itemid;

        if (itemId === '019e0750d3ff75a79b877af453d36efb') {
            event.preventDefault();
            event.stopPropagation();

            const jellyseerrUrl = 'https://127.0.0.1:5055';

            // Keyboard modifier handling (Ctrl, Cmd, Shift) for LMB
            const openInNewTab = (event.button === 1) || event.ctrlKey || event.metaKey || event.shiftKey;

            if (openInNewTab) {
                window.open(jellyseerrUrl, '_blank');
            } else {
                window.location.href = jellyseerrUrl;
            }
        }
    }, true);
});
