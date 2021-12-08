// ------------------GLOBAL VARIABLES ---------------

let currentUser;
const users = [];
const userForm = document.getElementById('userForm');
const storedUsers = JSON.parse(localStorage.getItem('users'));

// ------------------ Constructor Functions --------------

// User objects to be pushed into local storage
const User = function (userName) {
  this.userName = userName;
  this.previousFive = [];
  this.timesVisited;
};

// Deck object dynamically made for both blackjack and 21 car trick
// Make a new deck in each game specific to its needs
const Deck = function () {
  this.cards = [];
};

// Card object for all cards... to be pushed into local storage and deck
const Card = function (cardName, cardImage) {
  this.cardName = cardName;
  this.cardImage = cardImage;
  this.value;
};

// ---------------------- User Object Prototype Functions ------------------

// Prototypes for setting values to user object's properties.... used in local storage pull and in setting in 21 card trick game
User.prototype.setPreviousFive = function (previousFive) {
  this.previousFive = previousFive;
};

User.prototype.setTimesVisited = function (timesVisited) {
  this.timesVisited = timesVisited;
};
// Might need to change this

// ------------------- Deck Object Prototype Functions ------------------
// Saves the preset deck to local storage
Deck.prototype.saveDeck = function () {
  const stringifiedCards = JSON.stringify(this.cards);
  localStorage.setItem('deck', stringifiedCards);
};
// Gets the preset deck of cards from local storage
Deck.prototype.getDeck = function () {
  const storedDeck = JSON.parse(localStorage.getItem('deck'));
  for (let card of storedDeck) {
    getCard(card.cardName, card.cardImage);
  }
};

// Set a random deck for whatever game it is called into
Deck.prototype.getRandomCards = function (amount) {
  const tempDeck = [];
  for (let i = 0; i < amount; i++) {
    let tempCard = this.cards[Math.floor(Math.random() * 51 + 1)];
    while (tempDeck.includes(tempCard)) {
      tempCard = this.cards[Math.floor(Math.random() * 51 + 1)];
    }
    tempDeck.push(tempCard);
  }
  return tempDeck;
};

// ------------------- GLOBAL FUNCTIONS -------------------------

function changePreviousFive(user, newCard) {
  console.log('USER IN CHANGE', user);
  console.log('PLAYERS CARD IN CHANGE', newCard);
  if (user.previousFive.length < 5) {
    user.previousFive.unshift(newCard);
    console.log('USER PREVIOUS IN IF', user.previousFive);
  } else {
    user.previousFive.unshift(newCard);
    user.previousFive.pop();
    console.log('USER PREVIOUS IN ELSE', user.previousFive);
  }
  // return user;
}

function addUser(userName, user) {
  let exists = false;
  for (let usersIndex of users) {
    if (usersIndex.userName === userName) {
      currentUser = usersIndex;
      currentUser.timesVisited++;
      exists = true;
      console.log(currentUser);
      saveCurrentUser();
      break;
    }
  }
  if (user && !exists) {
    const newUser = new User(userName);
    newUser.setPreviousFive(user.previousFive);
    newUser.setTimesVisited(user.timesVisited);
    users.push(newUser);
  }
  if (!user && !exists) {
    const newUser = new User(userName);
    currentUser = newUser;
    currentUser.timesVisited = currentUser.timesVisited++ || 1;
    saveCurrentUser();
    users.push(currentUser);
  }
}
// Function for making cards and aids with making cards deck is pulled from local storage
function getCard(cardName, cardImage) {
  const card = new Card(cardName, cardImage);
  deck.cards.push(card);
}

// Function to make an element with specific tagName, parent element, text content, image, and element id
function makeElem(tagName, parent, textContent, imageSrc, elemId, elemClass) {
  let elem = document.createElement(tagName);
  if (textContent) {
    elem.textContent = textContent;
  }
  if (imageSrc) {
    elem.setAttribute('src', imageSrc);
  }
  if (elemId) {
    elem.setAttribute('id', elemId);
  }
  if (elemClass) {
    elem.setAttribute('class', elemClass);
  }
  parent.appendChild(elem);
  return elem;
}

// ------------------- Local Storage Functions -----------------------

// Function for saving users to local storage (WORKING)
function saveUsers(user) {
  if (user) {
    for (let userIndex of users) {
      if (userIndex.userName === user.userName) {
        userIndex.previousFive = user.previousFive;
        userIndex.timesVisited = user.timesVisited;
      }
    }
  }
  const stringifiedUsers = JSON.stringify(users);
  localStorage.setItem('users', stringifiedUsers);
}

// Function for getting users from local storage
function getUsers() {
  for (let user of storedUsers) {
    addUser(user.userName, user);
  }
}

function saveCurrentUser() {
  const stringifiedCurrentUser = JSON.stringify(currentUser);
  localStorage.setItem('currentUser', stringifiedCurrentUser);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// -------------------- Handler Functions ---------------
// Handles submit form input
function handleSubmitUser(event) {
  event.preventDefault();
  const userName = event.target.userName.value;
  addUser(userName);
  saveCurrentUser();
  userForm.reset();
}
// ------------------ Listeners ---------------------
// Listens for submit from userName form
if (userForm) {
  userForm.addEventListener('submit', handleSubmitUser);
}
// --------------- FUNCTION CALLS -----------------------

const deck = new Deck();

if (!localStorage.deck) {
  getCard('AC', '../img/cards/AC.jpg');
  getCard('AD', '../img/cards/AD.jpg');
  getCard('AH', '../img/cards/AH.jpg');
  getCard('AS', '../img/cards/AS.jpg');
  getCard('2C', '../img/cards/2C.jpg');
  getCard('2D', '../img/cards/2D.jpg');
  getCard('2H', '../img/cards/2H.jpg');
  getCard('2S', '../img/cards/2S.jpg');
  getCard('3C', '../img/cards/3C.jpg');
  getCard('3H', '../img/cards/3H.jpg');
  getCard('3D', '../img/cards/3D.jpg');
  getCard('3S', '../img/cards/3S.jpg');
  getCard('4C', '../img/cards/4C.jpg');
  getCard('4D', '../img/cards/4D.jpg');
  getCard('4H', '../img/cards/4H.jpg');
  getCard('4S', '../img/cards/4S.jpg');
  getCard('5C', '../img/cards/5C.jpg');
  getCard('5D', '../img/cards/5D.jpg');
  getCard('5H', '../img/cards/5H.jpg');
  getCard('5S', '../img/cards/5S.jpg');
  getCard('6C', '../img/cards/6C.jpg');
  getCard('6D', '../img/cards/6D.jpg');
  getCard('6H', '../img/cards/6H.jpg');
  getCard('6S', '../img/cards/6S.jpg');
  getCard('7C', '../img/cards/7C.jpg');
  getCard('7D', '../img/cards/7D.jpg');
  getCard('7H', '../img/cards/7H.jpg');
  getCard('7S', '../img/cards/7S.jpg');
  getCard('8C', '../img/cards/8C.jpg');
  getCard('8D', '../img/cards/8D.jpg');
  getCard('8H', '../img/cards/8H.jpg');
  getCard('8S', '../img/cards/8S.jpg');
  getCard('9C', '../img/cards/9C.jpg');
  getCard('9D', '../img/cards/9D.jpg');
  getCard('9H', '../img/cards/9H.jpg');
  getCard('9S', '../img/cards/9S.jpg');
  getCard('10C', '../img/cards/10C.jpg');
  getCard('10D', '../img/cards/10D.jpg');
  getCard('10H', '../img/cards/10H.jpg');
  getCard('10S', '../img/cards/10S.jpg');
  getCard('JC', '../img/cards/JC.jpg');
  getCard('JD', '../img/cards/JD.jpg');
  getCard('JH', '../img/cards/JH.jpg');
  getCard('JS', '../img/cards/JS.jpg');
  getCard('QC', '../img/cards/QC.jpg');
  getCard('QD', '../img/cards/QD.jpg');
  getCard('QH', '../img/cards/QH.jpg');
  getCard('QS', '../img/cards/QS.jpg');
  getCard('KC', '../img/cards/KC.jpg');
  getCard('KD', '../img/cards/KD.jpg');
  getCard('KH', '../img/cards/KH.jpg');
  getCard('KS', '../img/cards/KS.jpg');
  deck.saveDeck();
} else {
  deck.getDeck();
}

if (storedUsers) {
  getUsers();
}

// ----------------------- TESTS ----------------------------
