var memory_array = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
  "I",
  "I",
  "J",
  "J",
  "K",
  "K",
  "L",
  "L"
];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
/* variable to count moves*/
var clicks = 0;
var rating = "3 stars";

Array.prototype.memory_tile_shuffle = function() {
  var i = this.length,
    j,
    temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};

/**function for generating a new board**/

function newBoard() {
  tiles_flipped = 0;
  var output = "";
  memory_array.memory_tile_shuffle();
  for (var i = 0; i < memory_array.length; i++) {
    output +=
      '<div id = "tile_' +
      i +
      '" onclick="memoryFlipTile(this,\'' +
      memory_array[i] +
      "')\"></div>";
  }
  document.getElementById("memory_board").innerHTML = output;
  element.addEventListener("click", newBoard());
}

//**refresh button function to start over mid game
function startOver() {
  location.reload();
}

function onClick() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
}

//*----------------star rating--------------------*//
function ratingFunction() {
  if (clicks > 48) {
    var list = document.getElementsByClassName("stars")[0];
    list.getElementsByClassName("fa fa-star")[2].style.color = "gray";
    rating = "2 stars";
  }
  if (clicks > 58) {
    var list = document.getElementsByClassName("stars")[0];
    list.getElementsByClassName("fa fa-star")[1].style.color = "gray";
    rating = "1 star";
  }
  if (clicks > 68) {
    var list = document.getElementsByClassName("stars")[0];
    list.getElementsByClassName("fa fa-star")[0].style.color = "gray";
    rating = "0 stars";
  }
}


//*------------------timer counter---------------**//
var c = 0;
function myCounter() {
  document.getElementById("seconds").innerHTML = ++c;
}

function memoryFlipTile(tile, val) {
  /** grab 2 arguments coming into the function that were created in the output loop for each div**/
  if (tile.innerHTML == "" && memory_values.length < 2) {
    //**the memory_values array starts out empty so as long as it is less than 2 go on**/
    tile.style.background = "#FFF";
    //*card background becomes white**//
    tile.innerHTML = val;
    //**value put into the card**//

    //**evaluate the memory values array -- if it is 0, then a new value will be pushed into it
    //*and the tile-id reps the card the user is clicking
    if (memory_values.length == 0) {
      memory_values.push(val);
      memory_tile_ids.push(tile.id);

      //*if there is already 1 clicked over
    } else if (memory_values.length == 1) {
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
      //* condition to see if both cards are a match
      if (memory_values[0] == memory_values[1]) {
        //* the tiles match so the need to stay flipped over so make them greater than 2
        tiles_flipped += 2;
        // Clear both arrays
        memory_values = [];
        memory_tile_ids = [];
        // Check to see if the whole board is cleared
        if (tiles_flipped == memory_array.length) {
          c = c;
//pop up window when the game is done//
          alert(
            "Winner!  Rating: " +
              rating +
              "*** Number of Moves: " +
              clicks +
              "*** Time:" +
              c
          );
          alert("Good Job! Click 'OK' to play again!");
          document.getElementById("memory_board").innerHTML = "";
          clearInterval(myTimer);
          location.reload();
          newBoard();
        }
      } else {
        function flip2Back() {
          // Flip the 2 tiles back over
          var tile_1 = document.getElementById(memory_tile_ids[0]);
          var tile_2 = document.getElementById(memory_tile_ids[1]);
          tile_1.style.background = "url(diskette.JPG) no-repeat";
          tile_1.innerHTML = "";
          tile_2.style.background = "url(diskette.JPG) no-repeat";
          tile_2.innerHTML = "";
          // Clear both arrays
          memory_values = [];
          memory_tile_ids = [];
        }
        //** the 2 cards will flip back for about half a second 700 msecs; 500 msecs is a half second
        setTimeout(flip2Back, 700);
      }
    }
  }
}
