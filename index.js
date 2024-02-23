const movieSelector = document.getElementById("movie");
const countOfSeats = document.getElementById("count");
const priceOfSeats = document.getElementById("total");
const movieSeatContainer = document.querySelector(".movie-seat");
const allUnoccupiedSeats = document.querySelectorAll(
  ".row .seat:not(.occupied)"
);

populateUI();

let ticketPrice = +movieSelector.value;

function populateUI() {
  const selectedSeats = JSON.parse(
    localStorage.getItem("selectedSeatsIndexes")
  );
  if (selectedSeats !== null && selectedSeats.length > 0) {
    allUnoccupiedSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelector.selectedIndex = selectedMovieIndex;
  }
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateTotalPriceAndCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  countOfSeats.innerText = selectedSeatsCount;
  priceOfSeats.innerText = selectedSeatsCount * ticketPrice;
  const selectedSeatsIndex = [...selectedSeats].map((seat) =>
    [...allUnoccupiedSeats].indexOf(seat)
  );
  localStorage.setItem(
    "selectedSeatsIndexes",
    JSON.stringify(selectedSeatsIndex)
  );
}

// change movie type
movieSelector.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateTotalPriceAndCount();
});
// select seats
movieSeatContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateTotalPriceAndCount();
  }
});

updateTotalPriceAndCount();