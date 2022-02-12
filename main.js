//Blocks
const startBlock = document.querySelector('.start')
const mainGameBlock = document.querySelector('.main')
const notCorrectSymbolBlock = document.querySelector('.not-correct-symbol')
const notOurNumberBlock = document.querySelector('.not-our-number')
const gameOwerBlock = document.querySelector('.game_over')
const errorRangePage = document.querySelector('.error_range')
const success = document.querySelector('.success')


//Elements
const lives = document.querySelector('.lives')
const gameForm = document.querySelector('.gameForm')
const answerValue = document.querySelector('.answerValue')
const clue = document.querySelector('.clue')


//Buttons
const startBtn = document.querySelector('.startBtn')
const returnToGameBtns = document.querySelectorAll('.return_to_game_btn')


//State
let answer = ''

//Initialize
const randomNum =  Math.floor(Math.random() * (11 - 1)) + 1;
let livesCount = 3
setLife()

function openBlock(block) {
    const existBlocks = [
        startBlock,
        mainGameBlock,
        notCorrectSymbolBlock,
        notOurNumberBlock,
        gameOwerBlock,
        errorRangePage,
        success
    ]
    existBlocks.forEach(existBlock => {
        if (existBlock === block)
            existBlock.style.display = 'block'
        else existBlock.style.display = 'none'
    })
    clearInput()
}

openBlock(startBlock)


//startBlock
function startGame(){
    openBlock(mainGameBlock)
}


//GameBlock
function checkAnswer(event) {
    event.preventDefault()
    
    if(!answerValue.value) {
        alert('Ну комон блять, я писал для тебя игру тут, а ты даже не удосужился(лась) ввести хоть какойто символ? ну ты че? Ну Ё маЁ, я растроен,я больше не хочу играть.........')
        return window.location.replace('https://natribu.org/ru/')
    }

    const value =  +answerValue.value

    if (value === randomNum) return openBlock(success)

    if(value !== randomNum) livesCount--
    setLife()
    if(livesCount < 1) return openBlock(gameOwerBlock)

    if(isNaN(value)) return openBlock(notCorrectSymbolBlock)

    if(value < 1 || value > 10) return openBlock(errorRangePage)

    if (value < randomNum) {
        clue.innerText = 'Но вот подсказка. Чило которое мы загадали больше'
        return openBlock(notOurNumberBlock) 
    }
    if (value > randomNum) {
        clue.innerText = 'Но вот подсказка. Чило которое мы загадали меньше'
        return openBlock(notOurNumberBlock) 
    }


    clearInput()
}

function clearInput(){
    answerValue.value = ''
}

//Mistake blocks
function returnToGame() {
    return openBlock(mainGameBlock)
}

function setLife() {
    lives.innerText = livesCount
}

//Events
startBtn.addEventListener('click', startGame)
gameForm.addEventListener('submit', checkAnswer)

returnToGameBtns.forEach(btn => {
    btn.addEventListener('click', returnToGame)
})
