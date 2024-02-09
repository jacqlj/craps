const pointDiv = document.getElementById('point');
const currentDiv = document.getElementById('current');
const winLoseDiv = document.getElementById('win-lose');
const rollDiv = document.getElementById('roll');
const wlRatioDiv = document.getElementById('wl-ratio');

let current = 0;
let point = 0;
let wins = 0;
let losses = 0;

const setDieFace = (id, i) => {
    document.getElementById(id).src = 'static/img/face' + i + '.png';
};

const roll = () => {
    return new Promise((resolve, reject) => {
        currentDiv.innerHTML = 'Rolling...';
        let die1;
        let die2;
        for (let i = 10; i < 2000; i *= 1.1) {
            die1 = Math.floor(Math.random() * 6) + 1;
            die2 = Math.floor(Math.random() * 6) + 1;
            window.setTimeout(setDieFace, i, 'die1', die1);
            window.setTimeout(setDieFace, i, 'die2', die2);
        }
        current = die1 + die2;
        window.setTimeout(() => {
            let n = current === 8 || current === 11 ? 'n' : '';
            currentDiv.innerHTML =
                'You rolled a' + n + ' <b>' + current + '</b>';
        }, 2500);
        setTimeout(() => resolve('resolved'), 2500);
    });
};

const checkState = () => {
    if (point === 0) {
        // first roll
        point = current;
        pointDiv.innerHTML = 'Your point: <b>' + point + '</b>';
        pointDiv.style.display = 'block';
        pointDiv.style.visibility = 'hidden';
        winLoseDiv.style.display = 'block';
        winLoseDiv.style.visibility = 'hidden';
        if (current === 7 || current === 11) return 'win';
        if (current === 2 || current === 3 || current === 12) return 'lose';
        pointDiv.style.visibility = 'visible';
    } else {
        if (current === point) return 'win';
        if (current === 7) return 'lose';
    }
};

const updateWLRatio = () => {
    let text;
    if (wins + losses === 0) {
        text = '—';
    } else {
        text =
            wins +
            '/' +
            losses +
            ' (' +
            Math.round((wins / (wins + losses)) * 100) +
            '% wins)';
    }
    wlRatioDiv.innerHTML = 'Win/loss: ' + text;
};

rollDiv.addEventListener('click', (e) => {
    if (rollDiv.innerHTML === 'Start new game') {
        current = 0;
        point = 0;
        pointDiv.style.visibility = 'hidden';
        winLoseDiv.style.visibility = 'hidden';
        rollDiv.innerHTML = 'Roll dice';
    }
    roll().then(() => {
        const state = checkState();
        if (state === 'win') {
            winLoseDiv.innerHTML = 'You win! 🎉';
            winLoseDiv.style.color = '#118833';
            winLoseDiv.style.visibility = 'visible';
            rollDiv.innerHTML = 'Start new game';
            wins += 1;
            updateWLRatio();
        } else if (state === 'lose') {
            winLoseDiv.innerHTML = 'You lose! 😔✊';
            winLoseDiv.style.color = '#cc0033';
            winLoseDiv.style.visibility = 'visible';
            rollDiv.innerHTML = 'Start new game';
            losses += 1;
            updateWLRatio();
        }
    });
});

document.getElementById('reset').addEventListener('click', (e) => {
    wins = 0;
    losses = 0;
    updateWLRatio();
});
