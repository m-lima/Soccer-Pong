export default function keyboard(value) {
  let key = {
    value: value,
    isDown: false,
  }

  key.downHandler = (e) => {
    if (e.key === key.value) {
      key.isDown = true
      e.preventDefault()
    }
  }

  key.upHandler = (e) => {
    if (e.key === key.value) {
      key.isDown = false
      e.preventDefault()
    }
  }

  //Attach event listeners
  const downListener = key.downHandler.bind(key)
  const upListener = key.upHandler.bind(key)

  window.addEventListener('keydown', downListener, false)
  window.addEventListener('keyup', upListener, false)

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener)
    window.removeEventListener('keyup', upListener)
  }

  return key
}
