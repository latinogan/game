 

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
       question:"Cual es la capital de Colombia",
       choice1:"cali",
       choice2:"medellin",
       choice3:"bogota",
       choice4:"palmira",
       answer:3,
},

{  
	   question:"cuanto es 4+4",
       choice1:"6",
       choice2:"12",
       choice3:"4",
       choice4:"8",
       answer:4,

},

{
	  question:"Hola en ingles",
      choice1:"hello",
      choice2:"hey bro",
      choice3:"hola",
      choice4:"wsp",
      answer:1,
},

{
	question:"cual es la montaña mas alta",
    choice1:"Denali",
    choice2:"everest",
    choice3:"makalu",
    choice4:"no se",
    answer:2,
},

{
	question:"cual pais es una potencia",
   choice1:"mexico",
   choice2:"suiza",
   choice3:"londres",
   choice4:"Usa",
   answer:4,
},
{
	question:"capital de italia",
   choice1:"España",
   choice2:"suiza",
   choice3:"Roma",
   choice4:"Usa",
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

		if(!acceptingAnswers) return

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