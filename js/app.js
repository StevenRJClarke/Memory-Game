let moves = 0;
let cardList = [];
let newList = [];
let openList = [];
let time = 0;
let click = 0;
let matches = 0;
let star = 3;
let intervalID;

// Add functionality to restart button
$('.restart').click(restartGame);

// Add timer
const timer = "<div class=\"timer\">Time : <span class=\"time\">0</span> seconds</div>";
$(timer).insertAfter('.restart')

// Create victory modal
let modal = "<div class=\"modal\"><h3>Congratulations! You've won the game.</h3><p>With <span class=\"move-modal\"></span> moves, <span class=\"star-modal\"></span> and in <span class=\"time-modal\"></span> seconds</p><button class=\"button\">Play again!</button></div>";
$('.container').append(modal);
$('.button').click(closeModal);

startGame();

//Function to set up and start the game (on page load and when refresh button clicked)
function startGame() {

  // Reset the "moves" counter to 0, and stores the number of moves as a variable
  $('.moves').text('0');

  moves = $('.moves').text();

  // * Create a list that holds all of your cards
  cardList = $('.card');

  cardList.each(function() {
    //Pick up each card in order to shuffle them
      $(this).remove();
  })

  // * Display the cards on the page
  // *   - shuffle the list of cards using the provided "shuffle" method below
  newList = shuffle(cardList);

  // *   - loop through each card and create its
  newList.each(function() {
    // *   - add each card's HTML to the page
    const front = '<div class=\'front\'></div>';
    const back = '<div class=\'back\'></div>';
    const flip = '<div class=\'flipper-container\'></div>';

    $('.deck').prepend($(this));
    $(this).wrap(flip);
    $(this).prepend(front);
    $(this).children('i').wrap(back);
  })

  // set up the event listener for a card. If a card is clicked:
  newList.each(function() {
    $(this).click(cardClick);
  })

  // store cards with extra HTML
  newList = $('.flipper-container');
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex); //Choose a random index from the card array (a number between 0 and 15)
    currentIndex -= 1; //Decrement the current index by 1 (from 16 to 15, from 15 to 14 etc...)
    temporaryValue = array[currentIndex]; //Store the currently indexed card
    array[currentIndex] = array[randomIndex]; //Replace the currently indexed card with the randomly chosen card...
    array[randomIndex] = temporaryValue; //...and replace the card that was randomly chosen with the currently index card... a swap!
  }

  return array;
}

// Function when card clicked
function cardClick() {
  // Start timer
  click++;
  if (click == 1) {
    startTime();
  }

  // Remove event listener so the same card cannot be clicked twice to get a match
  $(this).off('click');

  let card = this;
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

        if (matches == 8) {
          winGame();
        }
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

// Increment timer after first click
function startTime() {
  intervalID = window.setInterval(function() {

    // Time increments by 1 second
    time++;
    $('.time').text(time);
  }, 1000);
}

//Function to open card
function openCard(card) {
  $(card).addClass('open');
}

// Function to add "open" cards to list
function toOpenList(card) {
  openList.push(card);
}

// Function to show matched cards
function match(card1, card2) {
  // Increment number of matches
  matches++;

  // Add match styling
  $(card1).find('.back').addClass('match');
  $(card2).find('.back').addClass('match');

  // Add match animation
  $(card1).parent('.flipper-container').effect("shake", {times: 2, distance: 30});
  $(card2).parent('.flipper-container').effect("shake", {times: 2, distance: 30});
}

// Function to show unmatched cards
function unmatch(card1, card2) {
  // Add no match styling
  $(card1).find('.back').addClass('no-match');
  $(card2).find('.back').addClass('no-match');

  // Add shake animation
  $(card1).parent('.flipper-container').effect("shake", {direction: "up", times: 2, distance: 30});
  $(card2).parent('.flipper-container').effect("shake", {direction: "up", times: 2, distance: 30});

  window.setTimeout(function() {
    // Turn cards back over
    $(card1).removeClass('open');
    $(card2).removeClass('open');

    //Reapply the event listener to unmatched cards
    $(card1).click(cardClick);
    $(card2).click(cardClick);

    window.setTimeout(function() {
      // Remove the no match formatting
      $(card1).find('.back').removeClass('no-match');
      $(card2).find('.back').removeClass('no-match');
    }, 800)
  }, 800)
}

// Function to increment the moves counter
function addMove() {
  moves++;
  $('.moves').text(moves);

  // Remove stars after certain number of moves
  if (moves == 12) {
    $('.stars li:nth-of-type(3)').children('i').removeClass('fa-star').addClass('fa-star-o');
    star--;
  } else if (moves == 24) {
    $('.stars li:nth-of-type(2)').children('i').removeClass('fa-star').addClass('fa-star-o');
    star--;
  }
}

// *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function winGame() {
  clearInterval(intervalID);

  // Create a modal
  $('.move-modal').text(moves);

  // Use single or plural stars correctly
  if (star == 1) {
    $('.star-modal').text(star + ' star ');
  } else {
    $('.star-modal').text(star + ' stars ');
  }
  $('.time-modal').text(time);
  $('.modal').css('display', 'flex');

}

//Function to close modal
function closeModal() {
  $('.modal').css('display', 'none');
  restartGame();
}

//Function to set up and start the game (on page load and when refresh button clicked)
function restartGame() {

  //Reset moves counter
  moves = 0;
  $('.moves').text(moves);

  //Reset time
  time = 0
  $('.time').text(time);
  clearInterval(intervalID);

  //Reset click
  click = 0;

  //Reset matches
  matches = 0;

  //Reset stars
  star = 3;
  $('.stars').find('i').removeClass('fa-star-o').addClass('fa-star');

  //Reset openList
  openList = [];

  // reapply the event listener for the cards that have been matched
  newList.find('.match').parent('.card').click(cardClick)

  //turn cards over than shuffle
  newList.find('.card').removeClass('open');
  newList.find('.back').removeClass('match');
  newList.detach();
  newList = shuffle(newList);
  newList.each(function() {
    $('.deck').append($(this));
  })
}