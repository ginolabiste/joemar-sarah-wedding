const target = new Date('2026-10-29T14:00:00+08:00').getTime();
function tick() {
    const d = Math.max(0, target - Date.now()),
        day = Math.floor(d / 864e5),
        hr = Math.floor((d % 864e5) / 36e5),
        min = Math.floor((d % 36e5) / 6e4),
        sec = Math.floor((d % 6e4) / 1e3);
    days.textContent = day;
    hours.textContent = String(hr).padStart(2, '0');
    minutes.textContent = String(min).padStart(2, '0');
    seconds.textContent = String(sec).padStart(2, '0');
}
tick();
setInterval(tick, 1000);
const io = new IntersectionObserver(
    (es) =>
        es.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('visible');
        }),
    { threshold: 0.12 },
);
document.querySelectorAll('.reveal').forEach((e) => io.observe(e));
document.querySelector('.menu').onclick = () => {
    const n = document.querySelector('.nav nav');
    n.style.display = n.style.display === 'flex' ? 'none' : 'flex';
    Object.assign(n.style, {
        position: 'absolute',
        top: '68px',
        left: '0',
        right: '0',
        padding: '25px',
        background: '#fbf8f1',
        flexDirection: 'column',
        alignItems: 'center',
    });
};

const guestSearch = document.querySelector('#guest-search');
const tableCards = [...document.querySelectorAll('.table-card')];
const tableStatus = document.querySelector('#table-status');
const normalizeSearch = (value) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
const seatingTables = tableCards.map((card) => ({
    card,
    guests: [...card.querySelectorAll('li')].map((item) => ({
        item,
        name: normalizeSearch(item.textContent),
    })),
}));

function filterTables() {
    const query = normalizeSearch(guestSearch.value);
    const tableNumber = query.match(/^(?:table\s*#?\s*|#\s*)?(\d+)$/);
    const words = query.split(' ');
    let visibleTables = 0;
    let matchingGuests = 0;

    seatingTables.forEach(({ card, guests }) => {
        const matchesTable = tableNumber && Number(card.dataset.table) === Number(tableNumber[1]);
        let hasMatchingGuest = false;
        guests.forEach(({ item, name }) => {
            const matches = Boolean(query && !tableNumber && words.every((word) => name.includes(word)));
            item.classList.toggle('guest-match', matches);
            if (matches) {
                hasMatchingGuest = true;
                matchingGuests++;
            }
        });
        card.hidden = Boolean(query && !matchesTable && !hasMatchingGuest);
        if (!card.hidden) visibleTables++;
    });

    tableStatus.textContent = !query
        ? `${seatingTables.length} tables · ${seatingTables.reduce((sum, table) => sum + table.guests.length, 0)} guests listed`
        : tableNumber
          ? `${visibleTables} matching ${visibleTables === 1 ? 'table' : 'tables'}`
          : `${matchingGuests} matching ${matchingGuests === 1 ? 'guest' : 'guests'} across ${visibleTables} ${visibleTables === 1 ? 'table' : 'tables'}`;
    document.querySelector('#table-empty').hidden = visibleTables > 0;
}

document.querySelector('.table-search').hidden = false;
guestSearch.addEventListener('input', filterTables);
document.querySelector('#clear-table-search').addEventListener('click', () => {
    guestSearch.value = '';
    filterTables();
    guestSearch.focus();
});
