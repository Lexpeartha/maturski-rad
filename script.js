// https://carbon.now.sh/?bg=rgba%28255%2C255%2C255%2C1%29&t=a11y-dark&wt=bw&l=javascript&ds=false&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=22px&ph=17px&ln=false&fl=1&fm=Fira+Code&fs=14px&lh=130%25&si=false&es=2x&wm=false&code=let%2520brojac%2520%253D%25200%250A%250Aconst%2520button%2520%253D%2520document.getElementsByClassName%28%27button%27%29%255B0%255D%250Aconst%2520brojacElement%2520%253D%2520document.getElementsByClassName%28%27brojac%27%29%255B0%255D%250A%250Aconst%2520povecajBrojac%2520%253D%2520%28%29%2520%253D%253E%2520%257B%250A%2520%2520brojac%2520%252B%253D%25201%250A%257D%250A%250Aconst%2520azurirajTekstBrojaca%2520%253D%2520%28%29%2520%253D%253E%2520%257B%250A%2520%2520brojacElement.innerHTML%2520%253D%2520brojac.toString%28%29%250A%257D%250A%250Abutton.addEventListener%28%27click%27%252C%2520event%2520%253D%253E%2520%257B%250A%2520%2520event.preventDefault%28%29%250A%250A%2520%2520povecajBrojac%28%29%250A%250A%2520%2520azurirajTekstBrojaca%28%29%250A%257D%29%250A
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
