export default {
    template: `
        <main class="page-gambling">
            <div id="draggable-clock">
                <span id="clock-time"></span>
            </div>
            <h1>Welcome to the Gambling Page!</h1>
            <p>More exciting gambling features coming soon...</p>
        </main>
    `,
    mounted() {
        this.initClock();
    },
    methods: {
        initClock() {
            this.$nextTick(() => {
                const draggableClock = document.getElementById('draggable-clock');
                const clockTime = document.getElementById('clock-time');

                if (!draggableClock || !clockTime) {
                    console.error('Clock elements not found in Gambling page.');
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
                    draggableClock.style.position = 'fixed'; // Ensure position is fixed during drag
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
        },
    },
};
