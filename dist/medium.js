

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
       question:"las caleñas son",
       choice1:"como las flores",
       choice2:"como el mar",
       choice3:"como el cielo",
       choice4:"no se",
       answer:1,
},

{  
	   question:"1 comentario en javascript",
       choice1:"$$",
       choice2:"/*",
       choice3:"??",
       choice4:"//",
       answer:4,

},

{
	  question:"si quieres cortarte el cabello busca",
      choice1:"un estilista",
      choice2:"un mecanico",
      choice3:"un cantante",
      choice4:"un constructor",
      answer:1,
},

{
	question:"cual es el mas alto de los amiferos",
    choice1:"el leon",
    choice2:"la jirafa",
    choice3:"el oso",
    choice4:"la cebra",
    answer:2,
},

{
	question:"a un carro a que se le llama gato",
   choice1:"al conductor",
   choice2:"al dueño",
   choice3:"al pasajero",
   choice4:"a una herramienta",
   answer:4,
},
{
	question:"la anestesia de aplica al paciente",
    choice1:"para que duerma",
    choice2:"para el dolor",
    choice3:"para la pereza",
    choice4:"para la tristeza",
    answer:2,
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