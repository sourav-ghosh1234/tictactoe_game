const X_CLASS='x';
const CIRCLE_CLASS='circle'
const WINNING_COMBINATION=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
const cellElements=document.querySelectorAll('[data-cell]');
const board=document.getElementById('board')
const winningMessageElement=document.getElementById('winningMessage')
const restartButton=document.getElementById('restartButton')
let circleTurn

startGame()
restartButton.addEventListener('click',startGame)
cellElements.forEach(cell=>{
    cell.addEventListener('click',handleClick,{once:true})
})

function startGame(){
    
     circleTurn=false;
cellElements.forEach(cell=>{
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click',handleClick)
    cell.addEventListener('click',handleClick,{once:true})
})
setBoardHoverClass()
winningMessageElement.classList.remove('show')

}

function handleClick(e){
    const cell=e.target
    const currentClasss=circleTurn ? CIRCLE_CLASS : X_CLASS;

    //placed marks
    placeMark(cell,currentClasss)

    if(checkWin(currentClasss)){
        endGame(false)

    }else if(isDraw()){
        endGame(true)
    }else{
        //switching turns
    swapTurns()
    setBoardHoverClass()

    }


    

}

function endGame(draw){
    if(draw){

        winningMessageTextElement.innerText="Draw"
    }else{
        winningMessageTextElement.innerText=`${circleTurn ? "O's win" : "X's win"}`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
   return [...cellElements].every(cell=>{
       return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
   })
}
function placeMark(cell,currentClasss){
    cell.classList.add(currentClasss)
}

function swapTurns(){
    circleTurn= !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }

}

function checkWin(currentClasss){
    return WINNING_COMBINATION.some(combination=>{
       return combination.every(index=>{
           return cellElements[index].classList.contains(currentClasss)
       })
    })

}