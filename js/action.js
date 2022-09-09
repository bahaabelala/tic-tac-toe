const game = document.querySelector('.game'),
    cells = document.querySelectorAll('.game__cell'),
    gameBackface = document.querySelector('.game-backface'),
    currentPlayer = document.querySelector('.current-player');

let n = 1,
    curLetter = '',
    curCell,
    empCells,
    xTestObj = {
        testArrR1: [],
        testArrR2: [],
        testArrR3: [],
        testArrC1: [],
        testArrC2: [],
        testArrC3: [],
        testArrD1: [],
        testArrD2: [],
    },
    oTestObj = {
        testArrR1: [],
        testArrR2: [],
        testArrR3: [],
        testArrC1: [],
        testArrC2: [],
        testArrC3: [],
        testArrD1: [],
        testArrD2: [],
    },
    xPositions = [],
    oPositions = [],
    clickSound = new Audio('sounds/click.wav'),
    winningSound = new Audio('sounds/winning.wav');

// -----------> ANIMATION

document.body.onload = function () {
    game.style.opacity = '1';
};

// -----------> ACTION

function WriteXO(cell, emptyCells) {
    clickSound.play();

    if (emptyCells === 8 && cell === curCell) {
        if (cell.textContent === 'X') {
            cell.style.color = 'rgb(219, 73, 73)';
            cell.innerText = 'O';
            xPositions.pop();
            oPositions.push(cell.classList[1]);
            n = 1;
        } else {
            cell.style.color = 'rgb(73, 73, 219)';
            cell.innerText = 'X';
            oPositions.pop();
            xPositions.push(cell.classList[1]);
            n = 0;
        }
    } else if (n % 2 === 1 && cell.textContent === '') {
        curLetter = 'X';
        cell.innerText = curLetter;
        cell.style.color = 'rgb(73, 73, 219)';
        n += 1;

        // --- Store Positions of X
        xPositions.push(cell.classList[1]);
    } else if (n % 2 === 0 && cell.textContent === '') {
        curLetter = 'O';
        cell.innerText = curLetter;
        cell.style.color = 'rgb(219, 73, 73)';
        n += 1;

        // --- Store Positions of O
        oPositions.push(cell.classList[1]);
    }

    curCell = cell;
}

function setFilters() {
    xTestObj.testArrR1 = xPositions.filter((cell) => cell[0] === '1');
    xTestObj.testArrR2 = xPositions.filter((cell) => cell[0] === '2');
    xTestObj.testArrR3 = xPositions.filter((cell) => cell[0] === '3');
    xTestObj.testArrC1 = xPositions.filter((cell) => cell[1] === '1');
    xTestObj.testArrC2 = xPositions.filter((cell) => cell[1] === '2');
    xTestObj.testArrC3 = xPositions.filter((cell) => cell[1] === '3');
    xTestObj.testArrD1 = xPositions.filter((cell) => cell[0] === cell[1]);
    xTestObj.testArrD2 = xPositions.filter(
        (cell) => parseInt(cell[0]) + parseInt(cell[1]) === 4
    );

    oTestObj.testArrR1 = oPositions.filter((cell) => cell[0] === '1');
    oTestObj.testArrR2 = oPositions.filter((cell) => cell[0] === '2');
    oTestObj.testArrR3 = oPositions.filter((cell) => cell[0] === '3');
    oTestObj.testArrC1 = oPositions.filter((cell) => cell[1] === '1');
    oTestObj.testArrC2 = oPositions.filter((cell) => cell[1] === '2');
    oTestObj.testArrC3 = oPositions.filter((cell) => cell[1] === '3');
    oTestObj.testArrD1 = oPositions.filter((cell) => cell[0] === cell[1]);
    oTestObj.testArrD2 = oPositions.filter(
        (cell) => parseInt(cell[0]) + parseInt(cell[1]) === 4
    );
}

function determineWinner() {
    switch (curLetter) {
        case 'X':
            if (
                xTestObj.testArrR1.length === 3 ||
                xTestObj.testArrR2.length === 3 ||
                xTestObj.testArrR3.length === 3 ||
                xTestObj.testArrC1.length === 3 ||
                xTestObj.testArrC2.length === 3 ||
                xTestObj.testArrC3.length === 3 ||
                xTestObj.testArrD1.length === 3 ||
                xTestObj.testArrD2.length === 3
            ) {
                displayWinner('X');
            }

            break;

        case 'O':
            if (
                oTestObj.testArrR1.length === 3 ||
                oTestObj.testArrR2.length === 3 ||
                oTestObj.testArrR3.length === 3 ||
                oTestObj.testArrC1.length === 3 ||
                oTestObj.testArrC2.length === 3 ||
                oTestObj.testArrC3.length === 3 ||
                oTestObj.testArrD1.length === 3 ||
                oTestObj.testArrD2.length === 3
            ) {
                displayWinner('O');
            }

            break;
    }
}

function displayWinner(winner) {
    winningSound.play();

    gameBackface.innerText = `' ${winner} '\nis the Winner!`;
    gameBackface.classList.add('game-backface-displayed');
    gameBackface.parentElement.style.transform = 'rotateY(180deg)';
}

game.addEventListener('click', function (e) {
    e.target.style.backgroundColor = '#27d36f';

    // --- Is All Empty?
    empCells = 0;
    Array.from(this.children).forEach((cell) => {
        empCells += cell.textContent === '' ? 1 : 0;
    });

    // --- write X or O
    WriteXO(e.target, empCells);

    // --- Sort Positions
    xPositions.sort();
    oPositions.sort();

    // --- Set Positions of who will Win
    setFilters();

    // --- Determine the Winner
    determineWinner();

    // --- Test
    console.log(`X: ${xPositions}`, `O: ${oPositions}`);
});
