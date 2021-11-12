function clearHighscores() {
    // (and reload)
    localStorage.removeItem("highscores");
    location.reload();
  }
  
  // attach clear event to clear score button
  var clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", function(){
    clearHighscores();
  })
  // run printhighscore when page loads
  printHighscores();
