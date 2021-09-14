const finalScore = document.getElementById("score");
const yourScore = localStorage.getItem("yourScore");
finalScore.innerText = yourScore;