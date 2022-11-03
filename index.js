let $start = document.querySelector('#start')
let $game= document.querySelector('#game')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

let colors = ['#090979', '#1d832a', '#3fb6c2', '#e709de']
let score = 0
let isGameStarted = false


function startGame() {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')
 

  $game.style.backgroundColor = '#fff';
  hide($start)  
  isGameStarted = true
  
  let interval = setInterval(function() { 
    let time = $time.textContent
    
    if(time <= 0) { 
      clearInterval(interval)
      endGame()
    } else { 
      $time.textContent = (time - 0.1).toFixed(1)
    }
    console.log('interval', $time.textContent)
  }, 100)

  renderBox()
}

function show($el) {
  $el.classList.remove('hide')
} 

function hide($el){
  $el.classList.add('hide')
} 

function renderBox() { 
  $game.innerHTML = ''
  let box = document.createElement('div');
  let boxSize = getRandom(20,100)
  let gameSize = $game.getBoundingClientRect()
  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.width - boxSize
  let randomColorIndex = getRandom(0,3)
  
  console.log(maxTop)
 
  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundColor = colors[randomColorIndex]
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  
  $game.insertAdjacentElement('afterbegin', box)
  console.log(gameSize)
}

function handleBoxClick(event) {
  if(!isGameStarted){
    return
  } else if (event.target.dataset.box) {
     score++   
     renderBox()
   }
}

function setGameScore() { 
  $result.innerHTML = score.toString()
}

function setGameTime() { 
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  hide($resultHeader)
  show($timeHeader)
}

function endGame() { 
  isGameStarted = false
  setGameScore()
  $gameTime.removeAttribute('disabled')
  show($start)
  $game.innerHTML = ''
  $game.style.backgroundColor = '#89d5e8'
  show($resultHeader)
  hide($timeHeader)
}



function getRandom(min, max) { 
  return Math.floor(Math.random() * (max-min) + min) 
}





// function Car(name,year) { 
//     this.name = name
//     this.year = year
// }

// Car.prototype.getAge = function() { 
//   return new Date().getFullYear() - this.year
// }

// let ford = new Car('Ford', 2015)
// let bmw = new Car('BMW', 2017)
// console.log(ford)
// console.log(bmw)


let ford = Object.create({
  calculateDistancePerYear: function() { 
    console.log('calculate')
  }
}, {
  name: {
    value: 'Ford',
    enumerable: true,
    writable: false,
    configurable: false,
  },
  model: {
    value: "Focus",
    enumerable: true,
    writable: false,
    configurable: false,
  },
  year: {
    value: 2015,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  distance: {
    value:120500,
    enumerable: true,
    writable: true,
    configurable: false,
  },
  age: {
    enumerable: true, 
    get: function(){  // Благодарая get и set мы можем отслеживать изменение каких либо ключей в объекте и выполнять какую-то свою логику 
      console.log('Получаем возраст')
      return new Date().getFullYear() - this.year
    },
    set: function(){ 
      console.log("Setting a value")
    }
  }
})  // Object - самый глобальный класс в Javascript. Первый параметр отвечает за прототип данного объекта, второй параметр отвечает за свойства данного объекта.

console.log(ford)

for (let key in ford) { 
  console.log(key,ford[key])
}
