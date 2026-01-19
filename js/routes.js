import List from './pages/List.js';
import Leaderboard from './pages/Leaderboard.js';
import Roulette from './pages/Roulette.js';
import AddLevel from './pages/AddLevel.js';
import Gambling from './pages/Gambling.js';

export default [
    { path: '/', component: List },
    { path: '/leaderboard', component: Leaderboard },
    { path: '/roulette', component: Roulette },
    { path: '/add-level', component: AddLevel },
    { path: '/gambling', component: Gambling },
];
