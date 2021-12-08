/* eslint-disable indent */
//  --------------- Gloabl Variables ----------------
currentUser = getCurrentUser();
const tempDeck = deck.getRandomCards(21);
const columnOne = [];
const columnTwo = [];
const columnThree = [];
let clickCount = 0;
const gameStartSection = document.getElementById('gameStart');
let readyButton;
const columnSection = document.getElementById('columnSection');
const columnArticle = document.getElementById('columnArticle');
const resultsSection = document.getElementById('resultsSection');
const playAgain = document.getElementById('playAgain');

// ---------------- Global Functions ---------------

// ---------------- Game start functions---------------------

function renderGameStart() {
  renderTempDeck();
  makeElem('button', gameStartSection, 'Ready!', null, 'readyButton');
  readyButton = document.getElementById('readyButton');
  readyButton.addEventListener('click', handleReadyButton);
}

function renderTempDeck() {
  const ulElem = makeElem('ul', gameStartSection);
  for (let i = 0; i < tempDeck.length; i++) {
    const liElem = makeElem('li', ulElem, null, null, `card${i + 1}`);
    makeElem('img', liElem, null, tempDeck[i].cardImage);
  }
}

// -------------- Column rendering functions ---------------

function renderColumns() {
  setColumns();
  const columnOneElem = makeElem('ul', columnArticle, null, null, 'columnOne');
  const columnTwoElem = makeElem('ul', columnArticle, null, null, 'columnTwo');
  const columnThreeElem = makeElem('ul', columnArticle, null, null, 'columnThree');
  for (let i = 0; i < columnOne.length; i++) {
    const liElem = makeElem('li', columnOneElem, null, null, null, `cd${i + 1}`);
    makeElem('img', liElem, null, columnOne[i].cardImage, null, 'colOne');
  }
  for (let i = 0; i < columnTwo.length; i++) {
    const liElem = makeElem('li', columnTwoElem, null, null, null, `cd${i + 1}`);
    makeElem('img', liElem, null, columnTwo[i].cardImage, null, 'colTwo');
  }
  for (let i = 0; i < columnThree.length; i++) {
    const liElem = makeElem('li', columnThreeElem, null, null, null, `cd${i + 1}`);
    makeElem('img', liElem, null, columnThree[i].cardImage, null, 'colThree');
  }
}

// Makes the columns to be displayed on the page after renderColumns is called
function setColumns() {
  columnOne.length = 0;
  columnTwo.length = 0;
  columnThree.length = 0;
  for (let i = 0; i < tempDeck.length; i += 3) {
    columnOne.push(tempDeck[i]);
  }
  for (let i = 1; i < tempDeck.length; i += 3) {
    columnTwo.push(tempDeck[i]);
  }
  for (let i = 2; i < tempDeck.length; i += 3) {
    columnThree.push(tempDeck[i]);
  }
}

// Repopulates the tempDeck with cards in proper order
function rearrangeTempDeck(columnClass) {
  tempDeck.length = 0;
  switch (columnClass) {
    case 'colOne':
      for (let i = 0; i < columnTwo.length; i++) {
        tempDeck.splice(i, 1, columnTwo[i]);
      }
      for (let i = 0; i < columnOne.length; i++) {
        tempDeck.splice(i + 7, 1, columnOne[i]);
      }
      for (let i = 0; i < columnThree.length; i++) {
        tempDeck.splice(i + 14, 1, columnThree[i]);
      }
      break;
    case 'colTwo':
      for (let i = 0; i < columnOne.length; i++) {
        tempDeck.splice(i, 1, columnOne[i]);
      }
      for (let i = 0; i < columnTwo.length; i++) {
        tempDeck.splice(i + 7, 1, columnTwo[i]);
      }
      for (let i = 0; i < columnThree.length; i++) {
        tempDeck.splice(i + 14, 1, columnThree[i]);
      }
      break;
    default:
      for (let i = 0; i < columnOne.length; i++) {
        tempDeck.splice(i, 1, columnOne[i]);
      }
      for (let i = 0; i < columnThree.length; i++) {
        tempDeck.splice(i + 7, 1, columnThree[i]);
      }
      for (let i = 0; i < columnTwo.length; i++) {
        tempDeck.splice(i + 14, 1, columnTwo[i]);
      }
      break;
  }
}

// ----------------------- Results Rendering Functions --------------

function renderResultsSection() {
  renderPlayersCard();
  renderStatistics();
}

function renderPlayersCard() {
  makeElem('img', resultsSection, null, currentUser.previousFive[0].cardImage, 'playersCard');
}

function renderStatistics() {
  const divElem = makeElem('div', resultsSection, null, null, 'stats');
  makeElem('h3', divElem, 'Statistics:');
  const statsUl = makeElem('ul', divElem, null, null, 'statsUl');
  makeElem('li', statsUl, `Username: ${currentUser.userName}`);
  makeElem('li', statsUl, `Times Visited Site: ${currentUser.timesVisited}`);
  makeElem('h4', divElem, 'Your previous five cards:');
  const ulElem = makeElem('ul', divElem, null, null, 'lastFive');
  for (let card of currentUser.previousFive) {
    const liElem = makeElem('li', ulElem);
    makeElem('img', liElem, null, card.cardImage);
  }
}

// --------------- Handlers -----------------------
function handleReadyButton(event) {
  event.preventDefault();
  gameStartSection.style = 'display: none';
  renderColumns();
  columnSection.style = 'display: block';
}
function handleColumnClick(event) {
  event.preventDefault();
  clickCount++;
  columnArticle.innerHTML = '';
  const columnClass = event.target.className;
  rearrangeTempDeck(columnClass);
  if (clickCount < 3) {
    renderColumns();
  } else {
    let playersCard = tempDeck[10];
    console.log('1', currentUser);
    if (currentUser !== null) {
      changePreviousFive(currentUser, playersCard);
      saveCurrentUser();
    }
    columnSection.style = 'display: none';
    resultsSection.style = 'display: flex';
    playAgain.style = 'display: flex';
    renderResultsSection();
  }
}

function handlePlayAgain() {
  saveUsers(currentUser);
  location.reload();
}

// ---------------- Listeners ---------------------

columnArticle.addEventListener('click', handleColumnClick);
playAgain.addEventListener('click', handlePlayAgain);

// --------------------- Calls --------------------

renderGameStart();
