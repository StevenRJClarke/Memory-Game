// Reset the "moves" counter to 0, and stores the number of moves as a variable
$('.moves').text('0');

var moves = $('.moves').text();

/*
 * Create a list that holds all of your cards
 */

 var cardList = $('.card');
 cardList.each(function() {
  //Pick up each card in order to shuffle them
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
  var card = this;
  //  - display the card's symbol (put this functionality in another function that you call from this one)
  openCard(card);

  // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  window.setTimeout(function() {
    toOpenList(card);

  // *  - if the list already has another card, check to see if the two cards match
  if (openList.length == 2) {
    // Check whether the two cards have the same symbol
    if($(openList[0]).find('i').attr('class')==$(openList[1]).find('i').attr('class')) {
      // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
      match(openList[0],openList[1])

      // Reset the open list
      openList = [];

      // *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
      addMove();
    }
    else {
      // *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
      unmatch(openList[0],openList[1]);

      // Reset the open list
      openList = [];

      // *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
      addMove();
    }
  }
},1200);


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

// Function to show matched cards
function match(card1, card2) {
  $(card1).find('.back').addClass('match');
  $(card2).find('.back').addClass('match');
  $(card1).parent('.flipper-container').effect("shake", {times: 2, distance: 30});
  $(card2).parent('.flipper-container').effect("shake", {times: 2, distance: 30});
}

// Function to show unmatched cards
function unmatch(card1, card2) {
  $(card1).find('.back').addClass('no-match');
  $(card2).find('.back').addClass('no-match');
  $(card1).parent('.flipper-container').effect("shake", {direction: "up", times: 2, distance: 30});
  $(card2).parent('.flipper-container').effect("shake", {direction: "up", times: 2, distance: 30});

  window.setTimeout(function() {
    $(card1).removeClass('open');
    $(card2).removeClass('open');

    window.setTimeout(function() {
      $(card1).find('.back').removeClass('no-match');
      $(card2).find('.back').removeClass('no-match');
    }, 800)
  }, 800)
}

// Function to increment the moves counter

function addMove() {
  moves++;
  $('.moves').text(moves);

  if (moves == 5) {
    $('.stars li:nth-of-type(3)').children('i').removeClass('fa-star').addClass('fa-star-o');
  } else if (moves == 10) {
    $('.stars li:nth-of-type(2)').children('i').removeClass('fa-star').addClass('fa-star-o');
  } else if (moves == 15) {
    $('.stars li:nth-of-type(1)').children('i').removeClass('fa-star').addClass('fa-star-o');
  }
}




// *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

