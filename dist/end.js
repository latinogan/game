const username = document.querySelector("#username")
const saveScoreBtn = document.querySelector("#saveScoreBtn")
const finalScore = document.querySelector("#finalScore")
const mostResentScore = document.querySelector("#mostResentCode")

const highScore = JSON.parse(localStorage.getItem("highScores")) || []
const MAX_HIGH_SCORES=5
finalScore.innerText= mostResentScore
username.addEventListener("keyup", () => {
	saveScoreBtn.disabled=!username.value
})
saveHighscore = e => {
	e.preventDefault()

	const score= {
		score: mostResentScore,
		name: username.value
	}

	highScores.push(score)

	highScores.sort((a,b) => {
		return b.score - a.score
	})

	highScores.splice(5)

	localStorage.setItem("highScores",JSON.stringify(highScores))
	window.location.assign(/)
}