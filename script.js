let fields = [
  null, null, null,
  null, null, null,
  null, null, null
];

let currentPlayer = null;
let gameOver = false;

function choosePlayer(player) {
  if (currentPlayer === null && !gameOver) {
      currentPlayer = player;
      document.getElementById('playerX').classList.toggle('active', player === 'cross');
      document.getElementById('playerO').classList.toggle('active', player === 'circle');
  }
}

function render() {
  let table = document.getElementById('playground');
  let cells = table.getElementsByTagName('td');
  
  fields.forEach((field, index) => {
      if (field === 'cross') {
          cells[index].textContent = 'X';
      } else if (field === 'circle') {
          cells[index].textContent = 'O';
      } else {
          cells[index].textContent = '';
      }
  });
}

function makeMove(index) {
  if (fields[index] === null && currentPlayer !== null && !gameOver) {
      fields[index] = currentPlayer === 'cross' ? 'cross' : 'circle';
      render();
      
      if (checkWin(currentPlayer)) {
          gameOver = true;
          highlightWinningCombination(currentPlayer);
          return;
      }

      // Spielerwechsel
      currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
      document.getElementById('playerX').classList.toggle('active', currentPlayer === 'cross');
      document.getElementById('playerO').classList.toggle('active', currentPlayer === 'circle');
  }
}

function checkWin(player) {
  const winningCombinations = [
      [0, 1, 2], // Horizontale Reihen
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Vertikale Spalten
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonale
      [2, 4, 6]
  ];

  // Prüfe, ob eine Gewinnkombination erfüllt ist
  return winningCombinations.some(combination => {
      return combination.every(index => fields[index] === player);
  });
}

function highlightWinningCombination(player) {
  const winningCombinations = [
      [0, 1, 2], // Horizontale Reihen
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Vertikale Spalten
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonale
      [2, 4, 6]
  ];

  winningCombinations.forEach(combination => {
      if (combination.every(index => fields[index] === player)) {
          // Füge die Striche zu den Gewinnerzellen hinzu
          drawLine(combination);
      }
  });
}

function drawLine(combination) {
  let table = document.getElementById('playground');
  let cells = table.getElementsByTagName('td');

  combination.forEach(index => {
      let cell = cells[index];
      let line = document.createElement('div');
      line.classList.add('win-line');
      cell.appendChild(line);
  });

  // Bestimme die Richtung und rotiere die Linien entsprechend
  if (combination[0] === 0 && combination[1] === 1 && combination[2] === 2 || 
      combination[0] === 3 && combination[1] === 4 && combination[2] === 5 || 
      combination[0] === 6 && combination[1] === 7 && combination[2] === 8) {
      // Horizontale Linie
      document.querySelectorAll('.win-line').forEach(line => {
          line.style.transform = 'rotate(0deg)';
      });
  } else if (combination[0] === 0 && combination[1] === 3 && combination[2] === 6 || 
             combination[0] === 1 && combination[1] === 4 && combination[2] === 7 || 
             combination[0] === 2 && combination[1] === 5 && combination[2] === 8) {
      // Vertikale Linie
      document.querySelectorAll('.win-line').forEach(line => {
          line.style.transform = 'rotate(90deg)';
      });
  } else if (combination[0] === 0 && combination[1] === 4 && combination[2] === 8) {
      // Diagonale (von oben links nach unten rechts)
      document.querySelectorAll('.win-line').forEach(line => {
          line.style.width = '145%'; // Diagonale länger machen
          line.style.left = '-20%';  // Zentrieren
          line.style.transform = 'rotate(45.75deg)';
      });
  } else if (combination[0] === 2 && combination[1] === 4 && combination[2] === 6) {
      // Diagonale (von oben rechts nach unten links)
      document.querySelectorAll('.win-line').forEach(line => {
          line.style.width = '145%'; // Diagonale länger machen
          line.style.left = '-20%';  // Zentrieren
          line.style.transform = 'rotate(-45.75deg)';
      });
  }
}

function resetGame() {
  // Setzt das Spielfeld und alle Variablen zurück
  fields = [
      null, null, null,
      null, null, null,
      null, null, null
  ];
  
  currentPlayer = null;
  gameOver = false;

  // Entfernt alle Striche und markierten Felder
  let cells = document.getElementsByTagName('td');
  for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = '';
      let line = cells[i].querySelector('.win-line');
      if (line) {
          line.remove(); // Entfernt die Striche
      }
  }

  // Entfernt die Markierungen der aktiven Spieler
  document.getElementById('playerX').classList.remove('active');
  document.getElementById('playerO').classList.remove('active');

  // Spielfeld neu rendern
  render();
}


render();
