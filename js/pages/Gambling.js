    template: `
        <main class="page-gambling">
            <div id="draggable-clock">
                <span id="clock-time"></span>
            </div>

            <div class="stars" id="stars"></div>
            <div class="win-overlay" id="winOverlay">
                <div class="win-message">
                    <h2 id="winTitle">🎉 BIG WIN! 🎉</h2>
                    <div class="win-amount" id="winAmount">+500</div>
                </div>
            </div>

            <div class="jackpot-banner">💰 JACKPOT: <span id="jackpot">5000</span></div>

            <div class="casino-header">
                <h1 class="casino-title">NEON CASINO</h1>
            </div>

            <div class="game-selector">
                <button class="game-btn active" data-game="slots" @click="selectGame('slots')">🎰 SLOTS</button>
                <button class="game-btn" data-game="roulette" @click="selectGame('roulette')">🎡 ROULETTE</button>
                <button class="game-btn" data-game="dice" @click="selectGame('dice')">🎲 DICE</button>
                <button class="game-btn" data-game="blackjack" @click="selectGame('blackjack')">🃏 BLACKJACK</button>
                <button class="game-btn" data-game="poker" @click="selectGame('poker')">♠️ POKER</button>
            </div>

            <!-- SLOTS -->
            <div class="game-container" :class="{ 'active': activeGame === 'slots' }" id="slots">
                <div class="machine" id="machine">
                    <div class="title" id="slotTitle">NEON SLOT</div>
                    <div class="reels">
                        <div class="reel-wrap"><div class="reel"><div class="symbols"></div></div></div>
                        <div class="reel-wrap"><div class="reel"><div class="symbols"></div></div></div>
                        <div class="reel-wrap"><div class="reel"><div class="symbols"></div></div></div>
                    </div>
                    <div class="hud">
                        <div class="stats">
                            <div class="panel">BALANCE: <b id="slotBalance">1000</b></div>
                            <div class="bet panel">
                                BET: <b id="slotBet">50</b>
                                <button id="slotDown" @click="adjustBet('slots', -50)">-</button>
                                <button id="slotUp" @click="adjustBet('slots', 50)">+</button>
                            </div>
                        </div>
                        <button class="spin-btn" id="slotSpin" @click="spinSlots">SPIN</button>
                    </div>
                    <div class="particles" id="slotParticles"></div>
                </div>
            </div>

            <!-- ROULETTE -->
            <div class="game-container" :class="{ 'active': activeGame === 'roulette' }" id="roulette">
                <div class="roulette-table" id="rouletteTable">
                    <div class="title" id="rouletteTitle">ROULETTE</div>
                    <div style="position: relative;">
                        <div class="roulette-pointer"></div>
                        <div class="roulette-wheel" id="wheel"></div>
                    </div>
                    <div class="result-number" id="rouletteResult">-</div>
                    <div class="betting-grid">
                        <div class="bet-option red" :class="{ 'selected': selectedRouletteBet === 'red' }" @click="selectRouletteBet('red')" data-bet="red">RED</div>
                        <div class="bet-option black" :class="{ 'selected': selectedRouletteBet === 'black' }" @click="selectRouletteBet('black')" data-bet="black">BLACK</div>
                        <div class="bet-option" :class="{ 'selected': selectedRouletteBet === 'even' }" @click="selectRouletteBet('even')" data-bet="even">EVEN</div>
                        <div class="bet-option" :class="{ 'selected': selectedRouletteBet === 'odd' }" @click="selectRouletteBet('odd')" data-bet="odd">ODD</div>
                        <div class="bet-option" :class="{ 'selected': selectedRouletteBet === 'low' }" @click="selectRouletteBet('low')" data-bet="low">1-18</div>
                        <div class="bet-option" :class="{ 'selected': selectedRouletteBet === 'high' }" @click="selectRouletteBet('high')" data-bet="high">19-36</div>
                    </div>
                    <div class="hud">
                        <div class="stats">
                            <div class="panel">BALANCE: <b id="rouletteBalance">1000</b></div>
                            <div class="bet panel">
                                BET: <b id="rouletteBet">50</b>
                                <button id="rouletteDown" @click="adjustBet('roulette', -50)">-</button>
                                <button id="rouletteUp" @click="adjustBet('roulette', 50)">+</button>
                            </div>
                        </div>
                        <button class="spin-btn" id="rouletteSpin" @click="spinRoulette">SPIN</button>
                    </div>
                    <div class="particles" id="rouletteParticles"></div>
                </div>
            </div>

            <!-- DICE -->
            <div class="game-container" :class="{ 'active': activeGame === 'dice' }" id="dice">
                <div class="dice-game" id="diceGame">
                    <div class="title" id="diceTitle">DICE ROLL</div>
                    <div class="dice-container">
                        <div class="die" id="die1"><div class="die-value">?</div></div>
                        <div class="die" id="die2"><div class="die-value">?</div></div>
                    </div>
                    <div class="total-display" id="diceTotal">-</div>
                    <div class="dice-bets">
                        <div class="bet-option" :class="{ 'selected': selectedDiceBet === 'over7' }" @click="selectDiceBet('over7')" data-bet="over7">OVER 7</div>
                        <div class="bet-option" :class="{ 'selected': selectedDiceBet === 'under7' }" @click="selectDiceBet('under7')" data-bet="under7">UNDER 7</div>
                        <div class="bet-option" :class="{ 'selected': selectedDiceBet === 'seven' }" @click="selectDiceBet('seven')" data-bet="seven">LUCKY 7 (5x)</div>
                        <div class="bet-option" :class="{ 'selected': selectedDiceBet === 'doubles' }" @click="selectDiceBet('doubles')" data-bet="doubles">DOUBLES (4x)</div>
                    </div>
                    <div class="hud">
                        <div class="stats">
                            <div class="panel">BALANCE: <b id="diceBalance">1000</b></div>
                            <div class="bet panel">
                                BET: <b id="diceBet">50</b>
                                <button id="diceDown" @click="adjustBet('dice', -50)">-</button>
                                <button id="diceUp" @click="adjustBet('dice', 50)">+</button>
                            </div>
                        </div>
                        <button class="spin-btn" id="diceRoll" @click="rollDice">ROLL</button>
                    </div>
                    <div class="particles" id="diceParticles"></div>
                </div>
            </div>

            <!-- BLACKJACK -->
            <div class="game-container" :class="{ 'active': activeGame === 'blackjack' }" id="blackjack">
                <div class="blackjack-table" id="blackjackTable">
                    <div class="title" id="blackjackTitle">BLACKJACK</div>
                    <div class="card-area">
                        <div class="hand-label">DEALER</div>
                        <div class="card-row" id="dealerHand"></div>
                        <div class="hand-total" id="dealerTotal"></div>
                    </div>
                    <div class="card-area">
                        <div class="hand-label">YOUR HAND</div>
                        <div class="card-row" id="playerHand"></div>
                        <div class="hand-total" id="playerTotal"></div>
                    </div>
                    <div class="hud">
                        <div class="stats">
                            <div class="panel">BALANCE: <b id="blackjackBalance">1000</b></div>
                            <div class="bet panel">
                                BET: <b id="blackjackBet">50</b>
                                <button id="blackjackDown" @click="adjustBet('blackjack', -50)">-</button>
                                <button id="blackjackUp" @click="adjustBet('blackjack', 50)">+</button>
                            </div>
                        </div>
                        <div class="blackjack-actions">
                            <button id="dealBtn" @click="dealBlackjack">DEAL</button>
                            <button id="hitBtn" @click="hitBlackjack" :disabled="!blackjackGameActive || playerTotal > 21">HIT</button>
                            <button id="standBtn" @click="standBlackjack" :disabled="!blackjackGameActive">STAND</button>
                        </div>
                    </div>
                    <div class="particles" id="blackjackParticles"></div>
                </div>
            </div>

            <!-- POKER -->
            <div class="game-container" :class="{ 'active': activeGame === 'poker' }" id="poker">
                <div class="poker-table" id="pokerTable">
                    <div class="title" id="pokerTitle">VIDEO POKER</div>
                    <div class="poker-result" id="pokerResult">{{ pokerResult }}</div>
                    <div class="poker-hand" id="pokerHand">
                        <div v-for="(card, index) in pokerHand" :key="index" 
                            :class="['poker-card', card.suit, { 'selected': pokerHeld[index] }]"
                            @click="togglePokerHold(index)">
                            {{ card.value }}{{ suitSymbols[card.suit] }}
                        </div>
                    </div>
                    <div class="hud">
                        <div class="stats">
                            <div class="panel">BALANCE: <b id="pokerBalance">1000</b></div>
                            <div class="bet panel">
                                BET: <b id="pokerBet">50</b>
                                <button id="pokerDown" @click="adjustBet('poker', -50)">-</button>
                                <button id="pokerUp" @click="adjustBet('poker', 50)">+</button>
                            </div>
                        </div>
                        <button class="spin-btn" id="pokerDeal" @click="dealPoker">{{ pokerDealtInitial ? 'DRAW' : 'DEAL' }}</button>
                    </div>
                    <div class="particles" id="pokerParticles"></div>
                </div>
            </div>
        </main>
    `,
    data() {
        return {
            // Draggable clock state
            isDragging: false,
            offsetX: 0,
            offsetY: 0,

            // Casino global state
            gameState: {
                balance: 1000,
                jackpot: 5000,
            },
            
            // Casino game state
            activeGame: 'slots', // Default active game

            // Slots game state
            slotBet: 50,
            slotsSpinning: false,
            slotSymbolsList: ["🍒","🔔","🍋","⭐","💎","7️⃣"],

            // Roulette game state
            rouletteBet: 50,
            rouletteSpinning: false,
            selectedRouletteBet: null,
            rouletteReds: [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],
            rouletteResult: '-',

            // Dice game state
            diceBet: 50,
            diceRolling: false,
            selectedDiceBet: null,
            diceFaces: ['⚀','⚁','⚂','⚃','⚄','⚅'],
            die1Value: '?',
            die2Value: '?',
            diceTotal: '-',

            // Blackjack game state
            blackjackBet: 50,
            blackjackGameActive: false,
            blackjackDeck: [],
            dealerHand: [],
            playerHand: [],
            dealerTotal: '',
            playerTotal: '',
            blackjackSuits: ['hearts', 'diamonds', 'clubs', 'spades'],
            blackjackSuitSymbols: {'hearts':'♥','diamonds':'♦','clubs':'♣','spades':'♠'},
            blackjackValues: ['A','2','3','4','5','6','7','8','9','10','J','Q','K'],

            // Poker game state
            pokerBet: 50,
            pokerDeck: [],
            pokerHand: [],
            pokerHeld: [false, false, false, false, false],
            pokerDealtInitial: false,
            pokerResult: '',
            suitSymbols: {'hearts':'♥','diamonds':'♦','clubs':'♣','spades':'♠'}, // Duplicated for poker cards
            
            // Win Overlay
            winOverlayActive: false,
            winTitle: '🎉 BIG WIN! 🎉',
            winAmount: '+500',

            // Star particles
            stars: [],
        };
    },
    computed: {
        allBetsValid() {
            // Example: check if a bet is selected for the current game
            if (this.activeGame === 'roulette' && !this.selectedRouletteBet) return false;
            if (this.activeGame === 'dice' && !this.selectedDiceBet) return false;
            return true;
        }
    },
    mounted() {
        this.initClock();
        this.loadCasinoState();
        this.createStars();
        this.updateAllDisplays();
        this.fillReels(); // For slots
        this.createBlackjackDeck(); // For blackjack
        this.createPokerDeck(); // For poker
    },
    beforeUnmount() {
        // Clear clock interval if necessary
    },
    methods: {
        // === Clock Methods ===
        initClock() {
            const draggableClock = document.getElementById('draggable-clock');
            const clockTime = document.getElementById('clock-time');

            if (!draggableClock || !clockTime) {
                console.error('Clock elements not found in Gambling page.');
                return;
            }

            const updateClock = () => {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                clockTime.textContent = `${hours}:${minutes}:${seconds}`;
            };

            updateClock();
            setInterval(updateClock, 1000);

            draggableClock.addEventListener('mousedown', (e) => {
                this.isDragging = true;
                this.offsetX = e.clientX - draggableClock.getBoundingClientRect().left;
                this.offsetY = e.clientY - draggableClock.getBoundingClientRect().top;
                draggableClock.style.cursor = 'grabbing';
                draggableClock.style.position = 'fixed'; // Ensure position is fixed during drag
            });

            document.addEventListener('mousemove', (e) => {
                if (!this.isDragging) return;

                draggableClock.style.left = `${e.clientX - this.offsetX}px`;
                draggableClock.style.top = `${e.clientY - this.offsetY}px`;
            });

            document.addEventListener('mouseup', () => {
                this.isDragging = false;
                draggableClock.style.cursor = 'grab';
            });
        },

        // === Casino Global Methods ===
        loadCasinoState() {
            const saved = JSON.parse(localStorage.getItem('casinoState') || '{}');
            this.gameState.balance = saved.balance ?? 1000;
            this.gameState.jackpot = saved.jackpot ?? 5000;
            this.slotBet = this.loadBet('bet_slots', 50);
            this.rouletteBet = this.loadBet('bet_roulette', 50);
            this.diceBet = this.loadBet('bet_dice', 50);
            this.blackjackBet = this.loadBet('bet_blackjack', 50);
            this.pokerBet = this.loadBet('bet_poker', 50);
        },
        saveCasinoState() {
            localStorage.setItem('casinoState', JSON.stringify({ balance: this.gameState.balance, jackpot: this.gameState.jackpot }));
        },
        updateBalance(amount) {
            this.gameState.balance += amount;
            this.saveCasinoState();
            this.updateAllDisplays();
        },
        updateJackpot(amount) {
            this.gameState.jackpot += amount;
            this.saveCasinoState();
            document.getElementById('jackpot').textContent = this.gameState.jackpot;
        },
        updateAllDisplays() {
            if (document.getElementById('slotBalance')) document.getElementById('slotBalance').textContent = this.gameState.balance;
            if (document.getElementById('rouletteBalance')) document.getElementById('rouletteBalance').textContent = this.gameState.balance;
            if (document.getElementById('diceBalance')) document.getElementById('diceBalance').textContent = this.gameState.balance;
            if (document.getElementById('blackjackBalance')) document.getElementById('blackjackBalance').textContent = this.gameState.balance;
            if (document.getElementById('pokerBalance')) document.getElementById('pokerBalance').textContent = this.gameState.balance;
            if (document.getElementById('jackpot')) document.getElementById('jackpot').textContent = this.gameState.jackpot;
            
            if (document.getElementById('slotBet')) document.getElementById('slotBet').textContent = this.slotBet;
            if (document.getElementById('rouletteBet')) document.getElementById('rouletteBet').textContent = this.rouletteBet;
            if (document.getElementById('diceBet')) document.getElementById('diceBet').textContent = this.diceBet;
            if (document.getElementById('blackjackBet')) document.getElementById('blackjackBet').textContent = this.blackjackBet;
            if (document.getElementById('pokerBet')) document.getElementById('pokerBet').textContent = this.pokerBet;
        },
        loadBet(key, fallback=50){
            const v = parseInt(localStorage.getItem(key));
            return Number.isFinite(v) && v >= 50 ? v : fallback;
        },
        saveBet(key, value){ localStorage.setItem(key, value); },
        showWinOverlay(amount, isJackpot = false) {
            this.winOverlayActive = true;
            this.winTitle = isJackpot ? '🎰 JACKPOT! 🎰' : '🎉 BIG WIN! 🎉';
            this.winAmount = `+${amount}`;
            setTimeout(() => { this.winOverlayActive = false; }, 2500);
        },
        createStars() {
            const starsEl = document.getElementById('stars');
            if (!starsEl) return;
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 3}s`;
                starsEl.appendChild(star);
            }
        },
        selectGame(game) {
            this.activeGame = game;
            this.$nextTick(() => {
                this.updateAllDisplays(); // Ensure bet/balance displays are updated for the new game
            });
        },
        adjustBet(game, amount) {
            let currentBet = this[`${game}Bet`];
            currentBet = Math.max(50, Math.min(currentBet + amount, this.gameState.balance));
            this[`${game}Bet`] = currentBet;
            this.saveBet(`bet_${game}`, currentBet);
            this.updateAllDisplays();
        },
        burstMinor(containerEl){
            for (let i=0;i<24;i++){
                const p = document.createElement('div'); p.className='p';
                p.style.left = '50%'; p.style.top='50%';
                p.style.setProperty('--x', `${(Math.random()*200-100)}px`);
                p.style.setProperty('--y', `${(Math.random()*200-100)}px`);
                containerEl.appendChild(p);
                setTimeout(()=>p.remove(),900);
            }
        },
        burstMajor(containerEl){
            for (let i=0;i<60;i++){
                const p = document.createElement('div'); p.className='p';
                p.style.left = '50%'; p.style.top='50%';
                p.style.background = i % 3 === 0 ? '#ffd700' : '#7cffd4';
                p.style.filter = i % 3 === 0 ? 'drop-shadow(0 0 8px #ffd700)' : 'drop-shadow(0 0 8px #7cffd4)';
                p.style.width = `${Math.random()*4 + 4}px`;
                p.style.height = p.style.width;
                p.style.setProperty('--x', `${(Math.random()*400-200)}px`);
                p.style.setProperty('--y', `${(Math.random()*400-200)}px`);
                containerEl.appendChild(p);
                setTimeout(()=>p.remove(),900);
            }
        },

        // === Slots Methods ===
        fillReels() {
            const reels = document.querySelectorAll('#slots .reel');
            reels.forEach(reel => {
                const col = reel.querySelector('.symbols'); col.innerHTML = '';
                for (let i=0;i<20;i++) {
                    const s = document.createElement('div'); s.className='symbol'; 
                    s.textContent = this.slotSymbolsList[Math.floor(Math.random()*this.slotSymbolsList.length)];
                    col.appendChild(s);
                }
            });
        },
        stopReel(reel, finalSymbol, i) {
            const col = reel.querySelector('.symbols');
            const last = col.lastElementChild; last.textContent = finalSymbol; last.classList.add('final');
            const y = -(col.children.length - 1) * 110;
            col.style.transition = 'transform .6s cubic-bezier(.15,.8,.15,1)';
            col.style.transform = `translateY(${y}px)`;

            setTimeout(()=>{
                reel.classList.remove('spinning');
                const wraps = document.querySelectorAll('#slots .reel-wrap');
                wraps[i].classList.remove('scanning');
                col.style.transition = 'none';
                col.innerHTML = '';
                const finalDiv = document.createElement('div');
                finalDiv.className = 'symbol final';
                finalDiv.textContent = finalSymbol;
                col.appendChild(finalDiv);
                col.style.transform = 'translateY(0px)';
            }, 650);
        },
        evaluateSlots(results){
            let win = 0;
            let winType = 'none';
            const machine = document.getElementById('machine');
            const title = document.getElementById('slotTitle');
            const reels = document.querySelectorAll('#slots .reel');
            const particles = document.getElementById('slotParticles');
            
            if (results[0]==='7️⃣' && results[1]==='7️⃣' && results[2]==='7️⃣') {
                win = this.gameState.jackpot;
                winType = 'jackpot';
                this.gameState.jackpot = 5000;
                this.updateJackpot(0);
            }
            else if (results[0]===results[1] && results[1]===results[2]) {
                win = this.slotBet * 10;
                winType = 'major';
            }
            else if (results[0]===results[1] || results[1]===results[2] || results[0]===results[2]) {
                win = this.slotBet * 2;
                winType = 'minor';
            }
            
            if (winType === 'jackpot' || winType === 'major') {
                this.updateBalance(win);
                this.showWinOverlay(win, winType === 'jackpot');
                machine.classList.add('major-win');
                title.classList.add('major-glow');
                reels.forEach(r => r.classList.add('major-shake', 'major-glow'));
                this.burstMajor(particles);
                setTimeout(() => {
                    machine.classList.remove('major-win');
                    title.classList.remove('major-glow');
                    reels.forEach(r => r.classList.remove('major-shake', 'major-glow'));
                }, 1000);
            } else if (winType === 'minor') {
                this.updateBalance(win);
                machine.classList.add('win-pulse');
                title.classList.add('win-glow');
                reels.forEach(r => r.classList.add('win-shake'));
                this.burstMinor(particles);
                setTimeout(() => {
                    machine.classList.remove('win-pulse');
                    title.classList.remove('win-glow');
                    reels.forEach(r => r.classList.remove('win-shake'));
                }, 700);
            } else {
                machine.classList.add('lose');
                reels.forEach(r => r.classList.add('lose-fade'));
                setTimeout(() => {
                    machine.classList.remove('lose');
                    reels.forEach(r => r.classList.remove('lose-fade'));
                }, 800);
            }
            
            this.updateJackpot(Math.floor(this.slotBet * 0.1));
        },
        spinSlots() {
            if (this.slotsSpinning || this.gameState.balance < this.slotBet) return;
            this.slotsSpinning = true;

            const machine = document.getElementById('machine');
            const title = document.getElementById('slotTitle');
            const reels = document.querySelectorAll('#slots .reel');
            const wraps = document.querySelectorAll('#slots .reel-wrap');
            const particles = document.getElementById('slotParticles');

            machine.classList.remove('win-pulse', 'major-win', 'lose');
            title.classList.remove('win-glow', 'major-glow');
            reels.forEach(r => r.classList.remove('win-shake', 'major-shake', 'major-glow', 'lose-fade'));
            particles.innerHTML = '';

            this.updateBalance(-this.slotBet);

            const results = Array.from({length: 3}, () => this.slotSymbolsList[Math.floor(Math.random()*this.slotSymbolsList.length)]);

            reels.forEach((reel, i) => {
                const col = reel.querySelector('.symbols');
                reel.classList.remove('spinning','win-shake');
                wraps[i].classList.remove('scanning');
                col.querySelectorAll('.symbol').forEach(s=>s.classList.remove('final'));
                col.style.transition = 'none';
                col.style.transform = 'translateY(0px)';
                void col.offsetHeight; // Trigger reflow
                this.fillReels(); // Re-fill to ensure enough symbols for spin
                
                setTimeout(() => {
                    wraps[i].classList.add('scanning');
                    reel.classList.add('spinning');
                    col.style.transition = 'transform 1.2s linear';
                    // Calculate target position for the last symbol
                    const targetY = -(col.children.length - 1) * 110; // Assuming each symbol is 110px tall
                    col.style.transform = `translateY(${targetY}px)`;
                    setTimeout(() => this.stopReel(reel, results[i], i), 1200);
                }, i * 500);
            });

            setTimeout(() => { this.evaluateSlots(results); this.slotsSpinning = false; }, (reels.length - 1) * 500 + 1200 + 650 + 100);
        },

        // === Roulette Methods ===
        selectRouletteBet(betType) {
            this.selectedRouletteBet = betType;
        },
        checkWinRoulette(num, betType) {
            const isRed = this.rouletteReds.includes(num);
            switch(betType) {
                case 'red': return isRed;
                case 'black': return !isRed && num !== 0;
                case 'even': return num > 0 && num % 2 === 0;
                case 'odd': return num > 0 && num % 2 === 1;
                case 'low': return num >= 1 && num <= 18;
                case 'high': return num >= 19 && num <= 36;
                default: return false;
            }
        },
        spinRoulette() {
            if (this.rouletteSpinning || !this.selectedRouletteBet || this.gameState.balance < this.rouletteBet) return;
            this.rouletteSpinning = true;

            const table = document.getElementById('rouletteTable');
            const title = document.getElementById('rouletteTitle');
            const particles = document.getElementById('rouletteParticles');
            const wheel = document.getElementById('wheel');

            table.classList.remove('win-pulse', 'major-win', 'lose');
            title.classList.remove('win-glow', 'major-glow');
            particles.innerHTML = '';

            this.updateBalance(-this.rouletteBet);

            const num = Math.floor(Math.random() * 37);
            const rotations = 5 + Math.random() * 3;
            const finalAngle = (num * (360/37)) + (rotations * 360);
            
            wheel.style.transition = 'transform 3s cubic-bezier(.2,.8,.2,1)';
            wheel.style.transition = 'none';
            wheel.style.transform = 'rotate(0deg)';
            void wheel.offsetHeight; // Trigger reflow to apply reset immediately
            wheel.style.transition = 'transform 3s cubic-bezier(.2,.8,.2,1)';
            wheel.style.transform = `rotate(${finalAngle}deg)`;

            setTimeout(() => {
                this.rouletteResult = num;
                const resultEl = document.getElementById('rouletteResult');
                resultEl.style.color = this.rouletteReds.includes(num) ? '#ff6b6b' : num === 0 ? '#7cffd4' : '#ddd';
                
                const won = this.checkWinRoulette(num, this.selectedRouletteBet);
                if (won) {
                    const winAmount = this.rouletteBet * 2;
                    this.updateBalance(winAmount);
                    if (winAmount >= 200) this.showWinOverlay(winAmount);
                    table.classList.add('major-win');
                    title.classList.add('major-glow');
                    this.burstMajor(particles);
                    setTimeout(() => {
                        table.classList.remove('major-win');
                        title.classList.remove('major-glow');
                    }, 1000);
                } else {
                    table.classList.add('lose');
                    setTimeout(() => table.classList.remove('lose'), 800);
                }

                this.updateJackpot(Math.floor(this.rouletteBet * 0.1));
                this.rouletteSpinning = false;
            }, 3000);
        },

        // === Dice Methods ===
        selectDiceBet(betType) {
            this.selectedDiceBet = betType;
        },
        checkWinDice(d1, d2, betType) {
            const total = d1 + d2;
            switch(betType) {
                case 'over7': return total > 7;
                case 'under7': return total < 7;
                case 'seven': return total === 7;
                case 'doubles': return d1 === d2;
                default: return false;
            }
        },
        rollDice() {
            if (this.diceRolling || !this.selectedDiceBet || this.gameState.balance < this.diceBet) return;
            this.diceRolling = true;

            const game = document.getElementById('diceGame');
            const title = document.getElementById('diceTitle');
            const particles = document.getElementById('diceParticles');
            const die1 = document.getElementById('die1');
            const die2 = document.getElementById('die2');
            const die1Value = die1.querySelector('.die-value');
            const die2Value = die2.querySelector('.die-value');


            game.classList.remove('win-pulse', 'major-win', 'lose');
            title.classList.remove('win-glow', 'major-glow');
            particles.innerHTML = '';

            this.updateBalance(-this.diceBet);

            die1.classList.add('rolling');
            die2.classList.add('rolling');

            let count = 0;
            const interval = setInterval(() => {
                die1Value.textContent = this.diceFaces[Math.floor(Math.random() * 6)];
                die2Value.textContent = this.diceFaces[Math.floor(Math.random() * 6)];
                count++;
                
                if (count > 10) {
                    clearInterval(interval);
                    
                    const d1 = Math.floor(Math.random() * 6) + 1;
                    const d2 = Math.floor(Math.random() * 6) + 1;
                    
                    die1Value.textContent = this.diceFaces[d1 - 1];
                    die2Value.textContent = this.diceFaces[d2 - 1];
                    die1.classList.remove('rolling');
                    die2.classList.remove('rolling');
                    
                    const total = d1 + d2;
                    this.diceTotal = `Total: ${total}`;
                    
                    const won = this.checkWinDice(d1, d2, this.selectedDiceBet);
                    if (won) {
                        const multiplier = this.selectedDiceBet === 'seven' ? 5 : this.selectedDiceBet === 'doubles' ? 4 : 2;
                        const winAmount = this.diceBet * multiplier;
                        this.updateBalance(winAmount);
                        if (winAmount >= 200) this.showWinOverlay(winAmount);
                        
                        game.classList.add('major-win');
                        title.classList.add('major-glow');
                        this.burstMajor(particles);
                        setTimeout(() => {
                            game.classList.remove('major-win');
                            title.classList.remove('major-glow');
                        }, 1000);
                    } else {
                        game.classList.add('lose');
                        setTimeout(() => game.classList.remove('lose'), 800);
                    }

                    this.updateJackpot(Math.floor(this.diceBet * 0.1));
                    this.diceRolling = false;
                }
            }, 100);
        },

        // === Blackjack Methods ===
        createBlackjackDeck() {
            this.blackjackDeck = [];
            for (let suit of this.blackjackSuits) {
                for (let value of this.blackjackValues) {
                    this.blackjackDeck.push({suit, value});
                }
            }
            for (let i = this.blackjackDeck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.blackjackDeck[i], this.blackjackDeck[j]] = [this.blackjackDeck[j], this.blackjackDeck[i]];
            }
        },
        blackjackCardValue(card) {
            if (card.value === 'A') return 11;
            if (['J','Q','K'].includes(card.value)) return 10;
            return parseInt(card.value);
        },
        blackjackHandTotal(hand) {
            let total = 0;
            let aces = 0;
            for (let card of hand) {
                total += this.blackjackCardValue(card);
                if (card.value === 'A') aces++;
            }
            while (total > 21 && aces > 0) {
                total -= 10;
                aces--;
            }
            return total;
        },
        createBlackjackCardElement(card, hidden = false) {
            return `
                <div class="card ${hidden ? 'card-back' : card.suit}">
                    ${hidden ? '' : card.value + this.blackjackSuitSymbols[card.suit]}
                </div>
            `;
        },
        updateBlackjackDisplay() {
            const dealerHandEl = document.getElementById('dealerHand');
            const playerHandEl = document.getElementById('playerHand');
            
            if (dealerHandEl) dealerHandEl.innerHTML = this.dealerHand.map((card, i) => this.createBlackjackCardElement(card, this.blackjackGameActive && i === 1)).join('');
            if (playerHandEl) playerHandEl.innerHTML = this.playerHand.map(card => this.createBlackjackCardElement(card)).join('');

            this.playerTotal = `Total: ${this.blackjackHandTotal(this.playerHand)}`;
            if (this.blackjackGameActive) {
                this.dealerTotal = `Total: ${this.blackjackCardValue(this.dealerHand[0])}`;
            } else {
                this.dealerTotal = `Total: ${this.blackjackHandTotal(this.dealerHand)}`;
            }
        },
        dealBlackjack() {
            if (this.gameState.balance < this.blackjackBet) return;
            
            this.updateBalance(-this.blackjackBet);
            this.createBlackjackDeck();
            this.dealerHand = [this.blackjackDeck.pop(), this.blackjackDeck.pop()];
            this.playerHand = [this.blackjackDeck.pop(), this.blackjackDeck.pop()];
            this.blackjackGameActive = true;
            
            const table = document.getElementById('blackjackTable');
            const title = document.getElementById('blackjackTitle');
            const particles = document.getElementById('blackjackParticles');

            table.classList.remove('win-pulse', 'major-win', 'lose');
            title.classList.remove('win-glow', 'major-glow');
            particles.innerHTML = '';
            
            this.updateBlackjackDisplay();
            
            if (this.blackjackHandTotal(this.playerHand) === 21) {
                this.endBlackjackGame();
            }
        },
        hitBlackjack() {
            if (!this.blackjackGameActive) return;
            this.playerHand.push(this.blackjackDeck.pop());
            this.updateBlackjackDisplay();
            
            if (this.blackjackHandTotal(this.playerHand) > 21) {
                this.endBlackjackGame();
            }
        },
        standBlackjack() {
            if (!this.blackjackGameActive) return;
            this.endBlackjackGame();
        },
        endBlackjackGame() {
            this.blackjackGameActive = false;
            
            while (this.blackjackHandTotal(this.dealerHand) < 17) {
                this.dealerHand.push(this.blackjackDeck.pop());
            }
            
            this.updateBlackjackDisplay();
            
            const playerTotal = this.blackjackHandTotal(this.playerHand);
            const dealerTotal = this.blackjackHandTotal(this.dealerHand);
            
            let winAmount = 0;
            const table = document.getElementById('blackjackTable');
            const title = document.getElementById('blackjackTitle');
            const particles = document.getElementById('blackjackParticles');


            if (playerTotal > 21) {
                table.classList.add('lose');
                setTimeout(() => table.classList.remove('lose'), 800);
            } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
                winAmount = this.playerHand.length === 2 && playerTotal === 21 ? this.blackjackBet * 2.5 : this.blackjackBet * 2;
                this.updateBalance(winAmount);
                table.classList.add('major-win');
                title.classList.add('major-glow');
                this.burstMajor(particles);
                setTimeout(() => {
                    table.classList.remove('major-win');
                    title.classList.remove('major-glow');
                }, 1000);
            } else if (playerTotal === dealerTotal) {
                this.updateBalance(this.blackjackBet);
                table.classList.add('win-pulse');
                setTimeout(() => table.classList.remove('win-pulse'), 700);
            } else {
                table.classList.add('lose');
                setTimeout(() => table.classList.remove('lose'), 800);
            }
            
            this.updateJackpot(Math.floor(this.blackjackBet * 0.1));
        },

        // === Poker Methods ===
        createPokerDeck() {
            this.pokerDeck = [];
            for (let suit of this.blackjackSuits) { // Using blackjack suits for consistency
                for (let value of this.blackjackValues) { // Using blackjack values for consistency
                    this.pokerDeck.push({suit, value});
                }
            }
            for (let i = this.pokerDeck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.pokerDeck[i], this.pokerDeck[j]] = [this.pokerDeck[j], this.pokerDeck[i]];
            }
        },
        pokerCardValue(card) {
            if (card.value === 'A') return 14;
            if (['J','Q','K'].includes(card.value)) return 13;
            return parseInt(card.value);
        },
        evaluatePokerHand(cards) {
            const values = cards.map(c => this.pokerCardValue(c)).sort((a,b) => b-a);
            const suits = cards.map(c => c.suit);
            const freq = {};
            values.forEach(v => freq[v] = (freq[v] || 0) + 1);
            const counts = Object.values(freq).sort((a,b) => b-a);
            const isFlush = new Set(suits).size === 1;
            const straight = values[0] - values[4] === 4 && new Set(values).size === 5;

            if (straight && isFlush && values[0] === 14) return {name: 'Royal Flush', multiplier: 250};
            if (straight && isFlush) return {name: 'Straight Flush', multiplier: 50}; // Added Straight Flush
            if (counts[0] === 4) return {name: 'Four of a Kind', multiplier: 25}; // Reduced multiplier
            if (counts[0] === 3 && counts[1] === 2) return {name: 'Full House', multiplier: 9}; // Reduced multiplier
            if (isFlush) return {name: 'Flush', multiplier: 6}; // Reduced multiplier
            if (straight) return {name: 'Straight', multiplier: 4}; // Reduced multiplier
            if (counts[0] === 3) return {name: 'Three of a Kind', multiplier: 3}; // Reduced multiplier
            if (counts[0] === 2 && counts[1] === 2) return {name: 'Two Pair', multiplier: 2}; // Reduced multiplier
            if (counts[0] === 2) {
                const pair = Object.entries(freq).find(e => e[1] === 2)[0];
                if (parseInt(pair) >= 11) return {name: 'Jacks or Better', multiplier: 1}; // Added Jacks or Better
                return {name: 'Pair', multiplier: 0}; // Pair without Jacks or Better doesn't win
            }
            return {name: 'No Win', multiplier: 0};
        },
        dealPoker() {
            if (this.gameState.balance < this.pokerBet) return;
            
            const table = document.getElementById('pokerTable');
            const title = document.getElementById('pokerTitle');
            const particles = document.getElementById('pokerParticles');


            table.classList.remove('win-pulse', 'major-win', 'lose');
            title.classList.remove('win-glow', 'major-glow');
            particles.innerHTML = '';


            if (!this.pokerDealtInitial) {
                // Initial deal
                this.updateBalance(-this.pokerBet);
                this.createPokerDeck();
                this.pokerHand = [this.pokerDeck.pop(), this.pokerDeck.pop(), this.pokerDeck.pop(), this.pokerDeck.pop(), this.pokerDeck.pop()];
                this.pokerHeld = [false, false, false, false, false];
                this.pokerDealtInitial = true;
                this.pokerResult = '';
            } else {
                // Draw phase
                for (let i = 0; i < 5; i++) {
                    if (!this.pokerHeld[i]) {
                        this.pokerHand[i] = this.pokerDeck.pop();
                    }
                }
                
                const evalResult = this.evaluatePokerHand(this.pokerHand);
                this.pokerResult = evalResult.name;
                
                if (evalResult.multiplier > 0) {
                    const winAmount = this.pokerBet * evalResult.multiplier;
                    this.updateBalance(winAmount);
                    if (winAmount >= 200) this.showWinOverlay(winAmount);
                    table.classList.add('major-win');
                    title.classList.add('major-glow');
                    this.burstMajor(particles);
                    setTimeout(() => {
                        table.classList.remove('major-win');
                        title.classList.remove('major-glow');
                    }, 1000);
                } else {
                    table.classList.add('lose');
                    setTimeout(() => table.classList.remove('lose'), 800);
                }

                this.updateJackpot(Math.floor(this.pokerBet * 0.1));
                this.pokerDealtInitial = false;
            }
        },
        togglePokerHold(index) {
            if (this.pokerDealtInitial) { // Only allow holding on initial deal
                this.pokerHeld[index] = !this.pokerHeld[index];
            }
        },
    },
};
