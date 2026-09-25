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
