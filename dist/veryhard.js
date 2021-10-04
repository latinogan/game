

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
       question:"como se llama la celula nerviosa",
       choice1:"corazon",
       choice2:"gliales",
       choice3:"neuronas",
       choice4:"no se",
       answer:3,
},

{  
	   question:"pais entre Peru y Colombia",
       choice1:"venezuela",
       choice2:"brazil",
       choice3:"uruguay",
       choice4:"ecuador",
       answer:4,

},

{
	  question:"que escribia un testador",
      choice1:"un libro",
      choice2:"la biblia",
      choice3:"programacion",
      choice4:"testamento",
      answer:4,
},

{
	question:"identidad secreta de don diego de la vega",
    choice1:"capitan",
    choice2:"policia",
    choice3:"el zorro",
    choice4:"civil",
    answer:3,
},

{
	question:"que pajaro es el simbolo de la paz",
   choice1:"cuervo",
   choice2:"paloma",
   choice3:"aguila",
   choice4:"loro",
   answer:2,
},
{
	question:"que es HTML",
   choice1:"hypertext markup lenguage",
   choice2:"hyper mega lenguage",
   choice3:"hibrid make up lenguage",
   choice4:"marketin lenguage",
   answer:1,
},
{
	question:"que es JS",
   choice1:"JAVA",
   choice2:"JSON",
   choice3:"JAVASCRIPT",
   choice4:"NO SE",
   answer:3,
}

]

const SCORE_POINTS = 300
const MAX_QUESTIONS = 7

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