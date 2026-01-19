import routes from './routes.js';

export const store = Vue.reactive({
    dark: JSON.parse(localStorage.getItem('dark')) || false,
    toggleDark() {
        this.dark = !this.dark;
        localStorage.setItem('dark', JSON.stringify(this.dark));
    },
});

const app = Vue.createApp({
    data: () => ({ store }),
});
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

app.use(router);

app.mount('#app');

// Clock functionality
document.addEventListener('DOMContentLoaded', () => {
    Vue.nextTick(() => {
        const draggableClock = document.getElementById('draggable-clock');
        const clockTime = document.getElementById('clock-time');

        if (!draggableClock || !clockTime) {
            console.error('Clock elements not found.');
            return;
        }

        let isDragging = false;
        let offsetX, offsetY;

        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockTime.textContent = `${hours}:${minutes}:${seconds}`;
        }

        updateClock();
        setInterval(updateClock, 1000);

        draggableClock.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - draggableClock.getBoundingClientRect().left;
            offsetY = e.clientY - draggableClock.getBoundingClientRect().top;
            draggableClock.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            draggableClock.style.left = `${e.clientX - offsetX}px`;
            draggableClock.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            draggableClock.style.cursor = 'grab';
        });
    });
});
