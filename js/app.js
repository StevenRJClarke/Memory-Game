/*
 * Create a list that holds all of your cards
 */

 var cardList = $('.card');
 cardList.each(function() {
  $(this).remove();
 })


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 var newList = shuffle(cardList);

 var front = '<div class=\'front\'></div>';
 var back = '<div class=\'back\'></div>';
 var flip = '<div class=\'flipper-container\'></div>';

 newList.each(function() {
  $('.deck').prepend($(this));
  $(this).wrap(flip);
  $(this).prepend(front);
  $(this).children('i').wrap(back);
})

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex); //Choose a random index from the card array (a number between 0 and 15)
        currentIndex -= 1; //Decrement the current index by 1 (from 16 to 15, from 15 to 14 etc...)
        temporaryValue = array[currentIndex]; //Store the currently indexed card
        array[currentIndex] = array[randomIndex]; //Replace the currently indexed card with the randomly chosen card...
        array[randomIndex] = temporaryValue; //...and replace the card that was randomly chosen with the currently index card... a swap!
      }

      return array;
    }



// set up the event listener for a card. If a card is clicked:
newList.each(function() {
  $(this).click(cardClick);
})

var card;

function cardClick() {
  //  - display the card's symbol (put this functionality in another function that you call from this one)
  openCard(this);

  // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  window.setTimeout(function() {
    toOpenList(this);
  },2000);

  // *  - if the list already has another card, check to see if the two cards match
  if (openList.length == 2) {
    if($(openList[0]).find('i').attr('class')==$(openList[1]).find('i').attr('class')) {
      // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
      openList = [];
    }
    else {
      // *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

      openList = [];
    }
  }


}

//Function to open card
function openCard(card) {
  $(card).addClass('open');
}

// Function to add "open" cards to list
var openList = [];

function toOpenList(card) {
  openList.push(card);
}






// *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
// *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

