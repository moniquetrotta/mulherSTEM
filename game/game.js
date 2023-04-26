const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let avalilableQuestions = [];

let questions = [
  {
    question:
      'Qual é o nome da matemática e escritora inglesa que é considerada a primeira programadora da história?',
    choice1: 'Ada Lovelace',
    choice2: ' Mary Sommerville',
    choice3: 'Anne Milbanke',
    choice4: 'Elizabeth Byron',
    answer: 1,
  },
  {
    question:
      'Qual é o nome da máquina que Ada Lovelace criou o primeiro algoritmo para ser processado por ela?',
    choice1: 'Máquina diferencial',
    choice2: ' Máquina analítica',
    choice3: 'Máquina de Turing',
    choice4: ' Máquina de Jacquard',
    answer: 2,
  },
  {
    question:
      'Quem foi a mentora de Ada Lovelace que a apresentou a Charles Babbage?',
    choice1: 'Elizabeth Fry',
    choice2: 'Florence Nightingale',
    choice3: ' Mary Sommerville',
    choice4: ' Marie Curie',
    answer: 3,
  },
  {
    question:
      'Qual era a profissão do pai de Ada Lovelace, que ela nunca conheceu pessoalmente?',
    choice1: 'Poeta',
    choice2: 'Médico',
    choice3: 'Advogado',
    choice4: ' Político',
    answer: 1,
  },
  {
    question:
      'Qual era a doença que causou a morte de Ada Lovelace aos 36 anos de idade?',
    choice1: 'Tuberculose',
    choice2: ' Câncer no útero',
    choice3: 'Malária',
    choice4: 'Diabetes',
    answer: 2,
  },
  {
    question:
      'Em que data é comemorado o Dia Nacional Ada Lovelace nos Estados Unidos?',
    choice1: '8 de março',
    choice2: ' 9 de outubro',
    choice3: '10 de dezembro',
    choice4: '27 de novembro',
    answer: 2,
  },
  {
    question:
      'Qual é o nome da faculdade em Londres que homenageia Ada Lovelace e é voltada ao ensino de tecnologia?',
    choice1: ' Ada National College for Digital Skills',
    choice2: ' Ada Academy of Computer Science',
    choice3: 'Ada School of Engineering and Mathematics',
    choice4: 'Ada Institute of Technology and Innovation',
    answer: 1,
  },
  {
    question:
      'Quais são as áreas de conhecimento que Ada Lovelace é uma inspiração para muitas mulheres?',
    choice1: 'Ciência, tecnologia, engenharia e matemática (STEM)',
    choice2: 'Arte, literatura, música e filosofia (ALMF)',
    choice3: 'História, geografia, sociologia e antropologia (HGSA)',
    choice4: ' Educação, saúde, direito e administração (EHDA)',
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 8;

startGame = () => {
  questionCounter = 0;
  score = 0;
  avalilableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (avalilableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('/game/end.html');
  }
  questionCounter++;
  progressText.innerText = `Pergunta ${questionCounter} de ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionsIndex = Math.floor(Math.random() * avalilableQuestions.length);
  currentQuestion = avalilableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });
  avalilableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
