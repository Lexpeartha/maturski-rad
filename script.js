let brojac = 0

const button = document.getElementsByClassName('button')[0]
const brojacElement = document.getElementsByClassName('brojac')[0]

const povecajBrojac = () => {
  brojac += 1
}

const azurirajTekstBrojaca = () => {
  brojacElement.innerHTML = brojac.toString()
}

button.addEventListener('click', event => {
  event.preventDefault()

  povecajBrojac()

  azurirajTekstBrojaca()
})
