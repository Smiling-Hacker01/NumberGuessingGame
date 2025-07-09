 let randomNumber = parseInt(Math.ceil(Math.random()*100 + 1)) ;
const submit = document.getElementById('btn');
const userinput = document.getElementById('GuessNumber');
const guessSlot = document.querySelector('.Guesses');
const remaining = document.querySelector('.remaining');
const lowOrHi = document.querySelector('#loworHi');
const startOver = document.querySelector('#result');

const element = document.createElement('p');
let prevGuess = [];
let numGuess = 1;
let playGame = true;
if (playGame) {
    submit.addEventListener('click',(event)=> {
         event.preventDefault();
         const userGuess = parseInt(userinput.value)
         validateGuess(userGuess)
    })
    userinput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const userGuess = parseInt(userinput.value);
            validateGuess(userGuess);
        }
    });
}

function validateGuess(userGuess) {
    if (isNaN(userGuess)) {
       alert('Please enter a valid number');
    }
    else if (userGuess < 1) {
        alert('Please Enter Number Greater Than 1');
    }
    else if (userGuess > 100) {
        alert('Please Enter a Number Lower Than 100');
    }
    else{
        prevGuess.push(userGuess);
        if (numGuess === 11) {
            displayGuess(userGuess);
            displayMessage(`Game Over. Random Number Was ${randomNumber}`);
            endgame();
        }
        else{
            displayGuess(userGuess);
            checkGuess(userGuess)
        }
    }
}

function checkGuess(userGuess) {
    if (userGuess === randomNumber) {
        displayMessage(`You Guessed it right`);
        endgame();
    }
    else if (userGuess < randomNumber) {
        displayMessage(`Number is Too Low`);
    }
    else if (userGuess > randomNumber) {
        displayMessage(`Number is Too High`)
    }
}

function displayGuess(userGuess) {
   userinput.value = '';
   guessSlot.innerHTML += `${userGuess}  `;
   numGuess++;
   remaining.innerHTML = `${11 - numGuess} `;
}

function displayMessage(message) {
    lowOrHi.innerHTML =`${message}`
}

function endgame() {
   userinput.value = '';
   userinput.setAttribute('disabled', '');
   element.classList.add('button');
   element.innerHTML= `<h2 id="newGame">Start a New Game</h2>`;
   startOver.appendChild(element);
   playGame = false;
   newgame()
}

function newgame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', (e)=>{
      randomNumber = parseInt(Math.ceil(Math.random()*100 + 1)) ;
      prevGuess = [];
      numGuess = 1;
      guessSlot.innerHTML = '';
      remaining.innerHTML = `${11 - numGuess}`;
      userinput.removeAttribute('disabled');
      startOver.removeChild(element)
      playGame = true;
    })
}