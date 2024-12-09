import { showModalWindow, hideModalWindow, showModalContent} from './modal/modal.js'

class Title {
  constructor() {
    this.title = document.querySelector(".title")
    this.interval = undefined
    this.inputSpeed = 100
  }

  set setMessage(message) {
    let msgLength = 0
    this.interval = setInterval(() => {
      this.title.innerHTML = message.substring(0, msgLength);
      if (msgLength === message.length) {
        clearInterval(this.interval)
      }
      msgLength++
    }, this.inputSpeed)
  }

  printDelay(message) {
    return message.length * this.inputSpeed
  }
}

// Новый блок кода

function addNewGift() {
  const giftContainer = document.querySelector(".gift-container")
  const newGift = document.createElement('span')
  newGift.classList.add("gift")
  giftContainer.appendChild(newGift)
}

function chooseRandomGift(gifts) {
  const randomIndex = Math.floor(Math.random() * (gifts.length - 1)); // генерируем случайный индекс в допустимом диапазоне
  return gifts[randomIndex]
}


function generateGame(messageTitle, giftAmount) {
  // Очищаем старые подарки 
  const giftContainer = document.querySelector(".gift-container")
  giftContainer.innerHTML = ""
  
  // Печатаем сообщение
  title.setMessage = messageTitle
  const showGiftDelay = (3 + messageTitle.length) * title.inputSpeed
  
  setTimeout(() => {
    let amountClicks = 0
    // Создаём новые подарки и выбираем один выигрышный
    for(let i = 0; i < giftAmount; i++){
      addNewGift()
    }
    const gifts = document.querySelectorAll('.gift-container .gift')
    const randomGift = chooseRandomGift(gifts)
    if(level != 4) {
      randomGift.addEventListener("click", () => {
        level++
        const levelMessage = levels[level].message
        const levelGiftAmount = levels[level].giftAmount
  
        generateGame(levelMessage, levelGiftAmount)
      })
    }
    // Добавляем счетчиков кликов на подарки
    gifts.forEach((gift) => {
      gift.addEventListener('click', (event) => {
        gift.style.backgroundImage = "url('./images/gift-crossed.png')"
        amountClicks++
        if (amountClicks === 200) {
          const modalMessage = 'Ну вот и все, ты потратил все свои попытки'
          showModalWindow(modalMessage)
          setTimeout(() => {
            const modalImage = document.querySelector('.modal__image')
            modalImage.style.width = "400px"
            modalImage.style.height = "400px"
            showModalContent('Не расстраивайся, все равно держи подарок, как ты просил - носки', "./images/socks.png")
          }, title.printDelay(modalMessage) + 1000)
          // Очищаем все подарки 
          setTimeout(() => {
            giftContainer.innerHTML = ""
            title.setMessage = "Ладно, не будем тебя больше мучать, ты заслужил этот подарок"
            setTimeout(() => {
              const mainGift = document.querySelector('.main-gift')
              mainGift.style.display = 'inline-block'
              mainGift.addEventListener('mousemove', (event) => {
                const randomX = Math.random() * (window.innerWidth - 200);
                const randomY = Math.random() * (window.innerHeight - 300);
              
                event.target.style.left = `${randomX}px`;
                event.target.style.top = `${randomY}px`;
              })
              setTimeout(() => {title.setMessage = "Ха-ха, ну давай еще немного"}, 10000)
              setTimeout(() => {
                const mainGift = document.querySelector('.main-gift')
                mainGift.style.display = 'none'
                const finalMessage = "Хорошо, забирай свой приз"
                title.setMessage = finalMessage
                setTimeout(() => {
                  const finalGift = document.querySelector('.final-gift')
                  finalGift.style.display = 'inline-block'
                  finalGift.addEventListener('click', () => { 
                    const modalTitle = document.querySelector('.modal__title')
                    modalTitle.style.fontSize = '22px'
                    modalTitle.style.lineHeight = '2'                    
                    showModalWindow('Вот твой приз, заходи сюда - https://kupikod.com/shop/activation и вводи IQHJK-CXXSY-PZCDA', './images/cat.jpg')
                  })
                }, title.printDelay(finalMessage))
                
              }, 30000)
            }, title.printDelay("Ладно, не будем тебя больше мучать, ты заслужил этот подарок"))
          }, 15000)
        }
      });
    });
  },showGiftDelay)
}


// Блок игры
const title = new Title()
const beginButtonsContainer = document.querySelector(".begin-buttons")
const beginButtons = document.querySelectorAll(".begin-button")

let level = 1

const levels = {
  "2": {
    message: "Думал будет легко?",
    giftAmount: 5
  },
  "3": {
    message: "Неплохо, а если вот так?",
    giftAmount: 20
  },
  "4": {
    message: "Ладно, ладно, снова угадал, давай в последний раз",
    giftAmount: 200
  },
}


// Забиндим события у кнопок
beginButtons[0].addEventListener('click', () => {
  beginButtons.forEach(button => {
    button.classList.remove('show-button')
    beginButtonsContainer.style.display = "none"
  })
  generateGame("Забери свой подарок", 1)
})

beginButtons[1].addEventListener('click', () => {
  showModalWindow('А когда блять? Жми давай куда надо', './images/but-not-today.jpg')
})

beginButtons[2].addEventListener('click', () => {
  showModalWindow('Разработчик тоже не ебет че это за кнопка', './images/idk.png')
})

const beginMessage = "Привет, Иван, давай поиграем?"
title.setMessage = beginMessage

setTimeout(() => {
  beginButtons.forEach(button => {
    button.classList.add('show-button')
  })
}, title.printDelay(beginMessage))
