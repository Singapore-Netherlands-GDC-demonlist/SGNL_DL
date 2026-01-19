export default {
    template: `
        <main class="page-gambling">
            <div id="draggable-clock">
                <span id="clock-time"></span>
            </div>

            <div class="stars" ref="starsContainer"></div>
            <div class="win-overlay" :class="{ 'active': winOverlayActive }">
                <div class="win-message">
                    <h2 ref="winTitle">{{ winTitle }}</h2>
                    <div class="win-amount" ref="winAmount">{{ winAmount }}</div>
                </div>
            </div>

            <div class="jackpot-banner">💰 JACKPOT: <span ref="jackpotDisplay">{{ gameState.jackpot }}</span></div>

            <div class="casino-header">
                <h1 class="casino-title">NEON CASINO</h1>
            </div>

            <div class="game-selector">
                <button class="game-btn" :class="{ 'active': activeGame === 'slots' }" @click="selectGame('slots')">🎰 SLOTS</button>
                <button class="game-btn" :class="{ 'active': activeGame === 'roulette' }" @click="selectGame('roulette')">🎡 ROULETTE</button>
                <button class="game-btn" :class="{ 'active': activeGame === 'dice' }" @click="selectGame('dice')">🎲 DICE</button>
                <button class="game-btn" :class="{ 'active': activeGame === 'blackjack' }" @click="selectGame('blackjack')">🃏 BLACKJACK</button>
                <button class="game-btn" :class="{ 'active': activeGame === 'poker' }" @click="selectGame('poker')">♠️ POKER</button>
            </div>

            <!-- SLOTS -->
            <div class="game-container" :class="{ 'active': activeGame === 'slots' }">
                <div class="machine" ref="slotsMachine">
                    <div class="title" ref="slotTitle">NEON SLOT</div>
                    <div class="reels">
                        <div class="reel-wrap"><div class="reel" ref="slotReel0"><div class="symbols"></div></div></div>
                        <div class="reel-wrap"><div class="reel" ref="slotReel1"><div class="symbols"></div></div></div>
                        <div class="reel-wrap"><div class="reel" ref="slotReel2"><div class="symbols"></div></div></div>
                    </div>
                    <div class="hud">
                        <div class="stats">
                            <div class="panel">BALANCE: <b ref="slotBalance">{{ gameState.balance }}</b></div>
                            <div class="bet panel">
                                BET: <b ref="slotBetDisplay">{{ slotBet }}</b>
                                <button id="slotDown" @click="adjustBet('slots', -50)">-</button>
                                <button id="slotUp" @click="adjustBet('slots', 50)">+</button>
                            </div>
                        </div>
                        <button class="spin-btn" id="slotSpin" @click="spinSlots" :disabled="slotsSpinning || gameState.balance < slotBet">SPIN</button>
                    </div>
                    <div class="particles" ref="slotParticles"></div>
                </div>
            </div>

            <!-- ROULETTE -->
            <div class="game-container" :class="{ 'active': activeGame === 'roulette' }">
                <div class="roulette-table" ref="rouletteTable">
                    <div class="title" ref="rouletteTitle">ROULETTE</div>
                    <div style="position: relative;">
                        <div class="roulette-pointer"></div>
                        <div class="roulette-wheel" ref="wheel"></div>
                    </div>
                    <div class="result-number" ref="rouletteResult" :style="{ color: rouletteResultColor }">{{ rouletteResult }}</div>
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
                            <div class="panel">BALANCE: <b ref="rouletteBalance">{{ gameState.balance }}</b></div>
                            <div class="bet panel">
                                BET: <b ref="rouletteBetDisplay">{{ rouletteBet }}</b>
                                <button id="rouletteDown" @click="adjustBet('roulette', -50)">-</button>
                                <button id="rouletteUp" @click="adjustBet('roulette', 50)">+</button>
                            </div>
                        </div>
                        <button class="spin-btn" id="rouletteSpin" @click="spinRoulette" :disabled="rouletteSpinning || !selectedRouletteBet || gameState.balance < rouletteBet">SPIN</button>
                    </div>
                    <div class="particles" ref="rouletteParticles"></div>
                </div>
            </div>

            <!-- DICE -->
            <div class="game-container" :class="{ 'active': activeGame === 'dice' }">
                <div class="dice-game" ref="diceGame">
                    <div class="title" ref="diceTitle">DICE ROLL</div>
                    <div class="dice-container">
                        <div class="die" ref="die1"><div class="die-value">{{ die1Value }}</div></div>
                        <div class="die" ref="die2"><div class="die-value">{{ die2Value }}</div></div>
                    </div>
                    <div class="total-display" ref="diceTotal">{{ diceTotal }}</div>
                    <div class="dice-bets">
                        <div class="bet-option" :class="{ 'selected': selectedDiceBet === 'over7' }" @click="selectDiceBet('over7')" data-bet="over7">OVER 7</div>
                        <div class="bet-option" :class="{ 'selected': selectedDiceBet === 'under7' }" @click="selectDiceBet('under7')" data-bet="under7">UNDER 7</div>
                        <div class="bet-option" :class="{ 'selected': selectedDiceBet === 'seven' }" @click="selectDiceBet('seven')" data-bet="seven">LUCKY 7 (5x)</div>
                        <div class="bet-option" :class="{ 'selected': selectedDiceBet === 'doubles' }" @click="selectDiceBet('doubles')" data-bet="doubles">DOUBLES (4x)</div>
                    </div>
                    <div class="hud">
                        <div class="stats">
                            <div class="panel">BALANCE: <b ref="diceBalance">{{ gameState.balance }}</b></div>
                            <div class="bet panel">
                                BET: <b ref="diceBetDisplay">{{ diceBet }}</b>
                                <button id="diceDown" @click="adjustBet('dice', -50)">-</button>
                                <button id="diceUp" @click="adjustBet('dice', 50)">+</button>
                            </div>
                        </div>
                        <button class="spin-btn" id="diceRoll" @click="rollDice" :disabled="diceRolling || !selectedDiceBet || gameState.balance < diceBet">ROLL</button>
                    </div>
                    <div class="particles" ref="diceParticles"></div>
                </div>
            </div>

            <!-- BLACKJACK -->
            <div class="game-container" :class="{ 'active': activeGame === 'blackjack' }">
                <div class="blackjack-table" ref="blackjackTable">
                    <div class="title" ref="blackjackTitle">BLACKJACK</div>
                    <div class="card-area">
                        <div class="hand-label">DEALER</div>
                        <div class="card-row" ref="dealerHandContainer" v-html="dealerHandHTML"></div>
                        <div class="hand-total">{{ dealerTotal }}</div>
                    </div>
                    <div class="card-area">
                        <div class="hand-label">YOUR HAND</div>
                        <div class="card-row" ref="playerHandContainer" v-html="playerHandHTML"></div>
                        <div class="hand-total">{{ playerTotal }}</div>
                    </div>
                    <div class="hud">
                        <div class="stats">
                            <div class="panel">BALANCE: <b ref="blackjackBalance">{{ gameState.balance }}</b></div>
                            <div class="bet panel">
                                BET: <b ref="blackjackBetDisplay">{{ blackjackBet }}</b>
                                <button id="blackjackDown" @click="adjustBet('blackjack', -50)">-</button>
                                <button id="blackjackUp" @click="adjustBet('blackjack', 50)">+</button>
                            </div>
                        </div>
                        <div class="blackjack-actions">
                            <button id="dealBtn" @click="dealBlackjack" :disabled="blackjackGameActive || gameState.balance < blackjackBet">DEAL</button>
                            <button id="hitBtn" @click="hitBlackjack" :disabled="!blackjackGameActive || blackjackHandTotal(playerHand) > 21">HIT</button>
                            <button id="standBtn" @click="standBlackjack" :disabled="!blackjackGameActive">STAND</button>
                        </div>
                    </div>
                    <div class="particles" ref="blackjackParticles"></div>
                </div>
            </div>

            <!-- POKER -->
            <div class="game-container" :class="{ 'active': activeGame === 'poker' }">
                <div class="poker-table" ref="pokerTable">
                    <div class="title" ref="pokerTitle">VIDEO POKER</div>
                    <div class="poker-result" ref="pokerResult">{{ pokerResult }}</div>
                    <div class="poker-hand" ref="pokerHandContainer">
                        <div v-for="(card, index) in pokerHand" :key="index" 
                            :class="['poker-card', card.suit, { 'selected': pokerHeld[index] }]"
                            @click="togglePokerHold(index)"
                        >
                            {{ card.value }}{{ suitSymbols[card.suit] }}
                        </div>
                    </div>
                    <div class="hud">
                        <div class="stats">
                            <div class="panel">BALANCE: <b ref="pokerBalance">{{ gameState.balance }}</b></div>
                            <div class="bet panel">
                                BET: <b ref="pokerBetDisplay">{{ pokerBet }}</b>
                                <button id="pokerDown" @click="adjustBet('poker', -50)">-</button>
                                <button id="pokerUp" @click="adjustBet('poker', 50)">+</button>
                            </div>
                        </div>
                        <button class="spin-btn" id="pokerDeal" @click="dealPoker" :disabled="(pokerDealtInitial && !pokerHand.length) || gameState.balance < pokerBet">
                            {{ pokerDealtInitial ? 'DRAW' : 'DEAL' }}
                        </button>
                    </div>
                    <div class="particles" ref="pokerParticles"></div>
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
            clockInterval: null, // To store interval ID for clearing

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
            rouletteReds: [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36], // Corrected original typo: 23,23 was 23,23,25
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
        };
    },
    computed: {
        rouletteResultColor() {
            if (this.rouletteResult === '-') return '#eaf6ff'; // Default color
            if (this.rouletteResult === 0) return '#7cffd4'; // Green for 0
            if (this.rouletteReds.includes(this.rouletteResult)) return '#ff6b6b'; // Red
            return '#ddd'; // Black
        },
        dealerTotal() {
            if (this.blackjackGameActive && this.dealerHand.length > 1) {
                return `Total: ${this.blackjackCardValue(this.dealerHand[0])}`;
            }
            return `Total: ${this.blackjackHandTotal(this.dealerHand)}`;
        },
        playerTotal() {
            return `Total: ${this.blackjackHandTotal(this.playerHand)}`;
        },
        dealerHandHTML() {
            // This computes the HTML string for dealer's hand
            return this.dealerHand.map((card, i) => this.createBlackjackCardElement(card, this.blackjackGameActive && i === 1)).join('');
        },
        playerHandHTML() {
            // This computes the HTML string for player's hand
            return this.playerHand.map(card => this.createBlackjackCardElement(card)).join('');
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
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
        }
        // Additional cleanup for game intervals/timers if they exist
    },
    methods: {
        // === Clock Methods ===
        initClock() {
            // Ensure elements exist before manipulation
            this.$nextTick(() => {
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
                this.clockInterval = setInterval(updateClock, 1000); // Store interval ID

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
        },
        updateAllDisplays() {
            // All balance and bet displays are now updated via data binding and refs
            // No direct DOM manipulation needed here anymore, as Vue's reactivity handles it.
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
            this.$nextTick(() => { // Ensure starsContainer is rendered
                const starsEl = this.$refs.starsContainer;
                if (!starsEl) {
                    console.error('starsContainer ref not found.');
                    return;
                }
                for (let i = 0; i < 100; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    star.style.left = `${Math.random() * 100}%`;
                    star.style.top = `${Math.random() * 100}%`;
                    star.style.animationDelay = `${Math.random() * 3}s`;
                    starsEl.appendChild(star);
                }
            });
        },
        selectGame(game) {
            this.activeGame = game;
            this.$nextTick(() => {
                // Initial update for the newly active game's displays
                // The balance and bet for the active game will update automatically due to reactivity
            });
        },
        adjustBet(game, amount) {
            let currentBet = this[`${game}Bet`];
            currentBet = Math.max(50, Math.min(currentBet + amount, this.gameState.balance));
            this[`${game}Bet`] = currentBet;
            this.saveBet(`bet_${game}`, currentBet);
            // No need to call updateAllDisplays here, Vue reactivity handles it
        },

        // === Slots Methods ===
        fillReels() {
            // Reels are still handled by direct DOM manipulation for performance reasons during spinning
            const reels = [this.$refs.slotReel0, this.$refs.slotReel1, this.$refs.slotReel2];
            reels.forEach(reel => {
                if (!reel) return;
                const col = reel.querySelector('.symbols'); col.innerHTML = '';
                for (let i=0;i<20;i++) {
                    const s = document.createElement('div'); s.className='symbol'; 
                    s.textContent = this.slotSymbolsList[Math.floor(Math.random()*this.slotSymbolsList.length)];
                    col.appendChild(s);
                }
            });
        },
        stopReel(reelRefName, finalSymbol, i) {
            const reel = this.$refs[reelRefName];
            if (!reel) return;
            const col = reel.querySelector('.symbols');
            const last = col.lastElementChild; last.textContent = finalSymbol; last.classList.add('final');
            const y = -(col.children.length - 1) * 110;
            col.style.transition = 'transform .6s cubic-bezier(.15,.8,.15,1)';
            col.style.transform = `translateY(${y}px)`;

            setTimeout(()=>{
                reel.classList.remove('spinning');
                // No need for wraps, as particles are separate
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
            const machine = this.$refs.slotsMachine;
            const title = this.$refs.slotTitle;
            const reels = [this.$refs.slotReel0, this.$refs.slotReel1, this.$refs.slotReel2];
            
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
                if (machine) machine.classList.add('major-win');
                if (title) title.classList.add('major-glow');
                reels.forEach(r => r && r.classList.add('major-shake', 'major-glow'));
                this.burstMajor('slotParticles');
                setTimeout(() => {
                    if (machine) machine.classList.remove('major-win');
                    if (title) title.classList.remove('major-glow');
                    reels.forEach(r => r && r.classList.remove('major-shake', 'major-glow'));
                }, 1000);
            } else if (winType === 'minor') {
                this.updateBalance(win);
                if (machine) machine.classList.add('win-pulse');
                if (title) title.classList.add('win-glow');
                reels.forEach(r => r && r.classList.add('win-shake'));
                this.burstMinor('slotParticles');
                setTimeout(() => {
                    if (machine) machine.classList.remove('win-pulse');
                    if (title) title.classList.remove('win-glow');
                    reels.forEach(r => r && r.classList.remove('win-shake'));
                }, 700);
            } else {
                if (machine) machine.classList.add('lose');
                reels.forEach(r => r && r.classList.add('lose-fade'));
                setTimeout(() => {
                    if (machine) machine.classList.remove('lose');
                    reels.forEach(r => r.classList.remove('lose-fade'));
                }, 800);
            }
            
            this.updateJackpot(Math.floor(this.slotBet * 0.1));
        },
        spinSlots() {
            if (this.slotsSpinning || this.gameState.balance < this.slotBet) return;
            this.slotsSpinning = true;

            const machine = this.$refs.slotsMachine;
            const title = this.$refs.slotTitle;
            const reels = [this.$refs.slotReel0, this.$refs.slotReel1, this.$refs.slotReel2];
            const reelWraps = [this.$refs.slotReelWrap0, this.$refs.slotReelWrap1, this.$refs.slotReelWrap2]; // Assuming refs for wrappers
            
            if (machine) machine.classList.remove('win-pulse', 'major-win', 'lose');
            if (title) title.classList.remove('win-glow', 'major-glow');
            reels.forEach(r => r && r.classList.remove('win-shake', 'major-shake', 'major-glow', 'lose-fade'));
            if (this.$refs.slotParticles) this.$refs.slotParticles.innerHTML = '';

            this.updateBalance(-this.slotBet);

            const results = Array.from({length: 3}, () => this.slotSymbolsList[Math.floor(Math.random()*this.slotSymbolsList.length)]);

            reels.forEach((reel, i) => {
                if (!reel) return;
                const col = reel.querySelector('.symbols');
                reel.classList.remove('spinning','win-shake');
                if (reelWraps[i]) reelWraps[i].classList.remove('scanning'); // Use ref for wrap
                col.querySelectorAll('.symbol').forEach(s=>s.classList.remove('final'));
                col.style.transition = 'none';
                col.style.transform = 'translateY(0px)';
                void col.offsetHeight; // Trigger reflow
                this.fillReels(); // Re-fill to ensure enough symbols for spin
                
                setTimeout(() => {
                    if (reelWraps[i]) reelWraps[i].classList.add('scanning'); // Use ref for wrap
                    reel.classList.add('spinning');
                    col.style.transition = 'transform 1.2s linear';
                    // Calculate target position for the last symbol
                    const targetY = -(col.children.length - 1) * 110; // Assuming each symbol is 110px tall
                    col.style.transform = `translateY(${targetY}px)`;
                    setTimeout(() => this.stopReel(`slotReel${i}`, results[i], i), 1200); // Pass ref name
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

            const table = this.$refs.rouletteTable;
            const title = this.$refs.rouletteTitle;
            const wheel = this.$refs.wheel;

            if (table) table.classList.remove('win-pulse', 'major-win', 'lose');
            if (title) title.classList.remove('win-glow', 'major-glow');
            if (this.$refs.rouletteParticles) this.$refs.rouletteParticles.innerHTML = '';

            this.updateBalance(-this.rouletteBet);

            const num = Math.floor(Math.random() * 37);
            const rotations = 5 + Math.random() * 3;
            const finalAngle = (num * (360/37)) + (rotations * 360);
            
            if (wheel) {
                wheel.style.transition = 'none';
                wheel.style.transform = 'rotate(0deg)';
                void wheel.offsetHeight; // Trigger reflow to apply reset immediately
                wheel.style.transition = 'transform 3s cubic-bezier(.2,.8,.2,1)';
                wheel.style.transform = `rotate(${finalAngle}deg)`;
            }

            setTimeout(() => {
                this.rouletteResult = num; // This will trigger rouletteResultColor computed property
                
                const won = this.checkWinRoulette(num, this.selectedRouletteBet);
                if (won) {
                    const winAmount = this.rouletteBet * 2;
                    this.updateBalance(winAmount);
                    if (winAmount >= 200) this.showWinOverlay(winAmount);
                    if (table) table.classList.add('major-win');
                    if (title) title.classList.add('major-glow');
                    this.burstMajor('rouletteParticles');
                    setTimeout(() => {
                        if (table) table.classList.remove('major-win');
                        if (title) title.classList.remove('major-glow');
                    }, 1000);
                } else {
                    if (table) table.classList.add('lose');
                    setTimeout(() => {if (table) table.classList.remove('lose');}, 800);
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

            const game = this.$refs.diceGame;
            const title = this.$refs.diceTitle;
            const die1 = this.$refs.die1;
            const die2 = this.$refs.die2;

            if (game) game.classList.remove('win-pulse', 'major-win', 'lose');
            if (title) title.classList.remove('win-glow', 'major-glow');
            if (this.$refs.diceParticles) this.$refs.diceParticles.innerHTML = '';

            this.updateBalance(-this.diceBet);

            if (die1) die1.classList.add('rolling');
            if (die2) die2.classList.add('rolling');

            let count = 0;
            const interval = setInterval(() => {
                this.die1Value = this.diceFaces[Math.floor(Math.random() * 6)];
                this.die2Value = this.diceFaces[Math.floor(Math.random() * 6)];
                count++;
                
                if (count > 10) {
                    clearInterval(interval);
                    
                    const d1 = Math.floor(Math.random() * 6) + 1;
                    const d2 = Math.floor(Math.random() * 6) + 1;
                    
                    this.die1Value = this.diceFaces[d1 - 1];
                    this.die2Value = this.diceFaces[d2 - 1];
                    if (die1) die1.classList.remove('rolling');
                    if (die2) die2.classList.remove('rolling');
                    
                    const total = d1 + d2;
                    this.diceTotal = `Total: ${total}`;
                    
                    const won = this.checkWinDice(d1, d2, this.selectedDiceBet);
                    if (won) {
                        const multiplier = this.selectedDiceBet === 'seven' ? 5 : this.selectedDiceBet === 'doubles' ? 4 : 2;
                        const winAmount = this.diceBet * multiplier;
                        this.updateBalance(winAmount);
                        if (winAmount >= 200) this.showWinOverlay(winAmount);
                        
                        if (game) game.classList.add('major-win');
                        if (title) title.classList.add('major-glow');
                        this.burstMajor('diceParticles');
                        setTimeout(() => {
                            if (game) game.classList.remove('major-win');
                            if (title) title.classList.remove('major-glow');
                        }, 1000);
                    } else {
                        if (game) game.classList.add('lose');
                        setTimeout(() => {if (game) game.classList.remove('lose');}, 800);
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
            // Shuffle
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
        // updateBlackjackDisplay() is no longer needed as computed properties handle updates
        dealBlackjack() {
            if (this.gameState.balance < this.blackjackBet) return;
            
            this.updateBalance(-this.blackjackBet);
            this.createBlackjackDeck();
            this.dealerHand = [this.blackjackDeck.pop(), this.blackjackDeck.pop()];
            this.playerHand = [this.blackjackDeck.pop(), this.blackjackDeck.pop()];
            this.blackjackGameActive = true;
            
            const table = this.$refs.blackjackTable;
            const title = this.$refs.blackjackTitle;

            if (table) table.classList.remove('win-pulse', 'major-win', 'lose');
            if (title) title.classList.remove('win-glow', 'major-glow');
            if (this.$refs.blackjackParticles) this.$refs.blackjackParticles.innerHTML = '';
            
            // updateBlackjackDisplay() is no longer needed here
            
            if (this.blackjackHandTotal(this.playerHand) === 21) {
                this.endBlackjackGame();
            }
        },
        hitBlackjack() {
            if (!this.blackjackGameActive) return;
            this.playerHand.push(this.blackjackDeck.pop());
            // updateBlackjackDisplay() is no longer needed here
            
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
            
            // updateBlackjackDisplay() is no longer needed here
            
            const playerTotal = this.blackjackHandTotal(this.playerHand);
            const dealerTotal = this.blackjackHandTotal(this.dealerHand);
            
            let winAmount = 0;
            const table = this.$refs.blackjackTable;
            const title = this.$refs.blackjackTitle;

            if (playerTotal > 21) {
                if (table) table.classList.add('lose');
                setTimeout(() => {if (table) table.classList.remove('lose');}, 800);
            } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
                winAmount = this.playerHand.length === 2 && playerTotal === 21 ? this.blackjackBet * 2.5 : this.blackjackBet * 2;
                this.updateBalance(winAmount);
                if (table) table.classList.add('major-win');
                if (title) title.classList.add('major-glow');
                this.burstMajor('blackjackParticles');
                setTimeout(() => {
                    if (table) table.classList.remove('major-win');
                    if (title) title.classList.remove('major-glow');
                }, 1000);
            } else if (playerTotal === dealerTotal) {
                this.updateBalance(this.blackjackBet);
                if (table) table.classList.add('win-pulse');
                setTimeout(() => {if (table) table.classList.remove('win-pulse');}, 700);
            } else {
                if (table) table.classList.add('lose');
                setTimeout(() => {if (table) table.classList.remove('lose');}, 800);
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
            // Shuffle
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
            
            const table = this.$refs.pokerTable;
            const title = this.$refs.pokerTitle;

            if (table) table.classList.remove('win-pulse', 'major-win', 'lose');
            if (title) title.classList.remove('win-glow', 'major-glow');
            if (this.$refs.pokerParticles) this.$refs.pokerParticles.innerHTML = '';


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
                    if (table) table.classList.add('major-win');
                    if (title) title.classList.add('major-glow');
                    this.burstMajor('pokerParticles');
                    setTimeout(() => {
                        if (table) table.classList.remove('major-win');
                        if (title) title.classList.remove('major-glow');
                    }, 1000);
                } else {
                    if (table) table.classList.add('lose');
                    setTimeout(() => {if (table) table.classList.remove('lose');}, 800);
                }

                this.updateJackpot(Math.floor(this.pokerBet * 0.1));
                this.pokerDealtInitial = false;
            }
        },
        togglePokerHold(index) {
            if (this.pokerDealtInitial) { // Only allow holding on initial deal
                this.$set(this.pokerHeld, index, !this.pokerHeld[index]); // Use Vue.set for reactivity with array elements
            }
        },
    },
};