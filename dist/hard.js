



const question= document.querySelector("#question");
const choices= Array.from(document.querySelectorAll(".choice-text"));
const progressText= document.querySelector("#progressText");
const scoreText= document.querySelector("#score");
const progressBarFull= document.querySelector("#progressBarFull");


let currentQuestion= {}
let acceptingAnswers= true
let score= 0
let questionCounter = 0
let availableQuestions=[]

let questions= [
    { 
       question:"deporte que se juega con disco",
       choice1:"tenis",
       choice2:"futbol",
       choice3:"beisbol",
       choice4:"hockey",
       answer:4,
},

{  
	   question:"cuanto es una docena",
       choice1:"2",
       choice2:"16*",
       choice3:"12",
       choice4:"8",
       answer:3,

},

{
	  question:"forma moleculas del agua",
      choice1:"HO",
      choice2:"HO2",
      choice3:"H20",
      choice4:"H2O2",
      answer:2,
},

{
	question:"capital de tailandia",
    choice1:"manila",
    choice2:"kula lupar",
    choice3:"Bangkok",
    choice4:"China",
    answer:3,
},

{
	question:"Cual es la moneda de chile",
   choice1:"peseta",
   choice2:"peso",
   choice3:"bolivar",
   choice4:"guarani",
   answer:2,
},
{
	question:"array en programacion",
    choice1:" { }",
    choice2:"( )",
    choice3:"[ ]",
    choice4:"/ /",
    answer:3,
}


]

const SCORE_POINTS = 300
const MAX_QUESTIONS = 6

startGame = () => {
	questionCounter = 0
	score = 0
	availableQuestions = [...questions]
	getNewQuestion()
}

getNewQuestion = () => {
	if (availableQuestions.length === 0  || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem("mostRecentScore", score)

		return window.location.assign("end.html")

	}

	questionCounter++
	progressText.innerText=`Question ${questionCounter} of ${MAX_QUESTIONS}`;
	
	progressBarFull.style.width =`${(questionCounter / MAX_QUESTIONS) * 100}%`;

	const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
	currentQuestion = availableQuestions[questionsIndex]
	question.innerText = currentQuestion.question

	choices.forEach(choice => {
		const number = choice.dataset["number"]
		choice.innerText= currentQuestion["choice" + number]
	})

	availableQuestions.splice(questionsIndex,1)
	acceptingAnswers = true
}

choices.forEach(choice => {
	choice.addEventListener("click", e =>{

		if(! acceptingAnswers) return

			acceptingAnswers = false
		const selectedChoice = e.target
		const selectedAnswer = selectedChoice.dataset["number"]

		let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
		if(classToApply === "correct") {
			incrementScore(SCORE_POINTS)
		}

		selectedChoice.parentElement.classList.add(classToApply)

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply)
			getNewQuestion()
		},1000)
	})
})
incrementScore= num => {
	score +=num
	scoreText.innerText= score
}
startGame()