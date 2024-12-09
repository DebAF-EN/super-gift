const boxes = document.querySelectorAll('.box')
const modalWindow = document.querySelector('.modal')
const modalMessage = document.querySelector('.modal__message')
const modalTitle = document.querySelector('.modal__title')
const modalText = document.querySelector('.modal__text')
const modalCrossIcon = document.querySelector('.modal__cross-icon')
const modalImage = document.querySelector('.modal__image')

modalCrossIcon.addEventListener('click', hideModalWindow)

function showModalWindow(titleMessage, imageUrl) {
  // Скидываем ссылку на картинку и убираем изображение
  modalImage.src = ''
  modalImage.style.display = 'none'

  modalWindow.style.display = 'flex'
  showModalContent(titleMessage, imageUrl)
}

function showModalContent(titleMessage, imageUrl) {

  let msgLength = 0

  const timer = setInterval(() => {
    modalTitle.innerHTML = titleMessage.substring(0, msgLength);
    msgLength++

    if (msgLength === titleMessage.length + 1) {  
      clearInterval(timer)
      if (imageUrl) {
        modalImage.style.display = 'inline-block'
        modalImage.src = imageUrl
      }
    }
  }, 100)
}

function hideModalWindow() {
  modalWindow.style.display = 'none'
}

export { showModalWindow, hideModalWindow, showModalContent}