console.info('PRIMER REAKTIVNOSTI')

const prodajniPredmet = reactive({
  ime: 'Carape',
  cena: 200,
  kolicina: 1,
})

let prodajnaCena = ref(0)
let popust = ref(15) // u procentima

effect(() => {
  prodajnaCena.value =
    prodajniPredmet.cena * prodajniPredmet.kolicina * (1 - popust.value / 100)
})

console.log('1 par carapa sa popustom od 15 procenata: ', prodajnaCena.value)

prodajniPredmet.cena = 250
prodajniPredmet.kolicina = 2
popust.value = 5

console.log('2 para carapa sa popustom od 5 procenata: ', prodajnaCena.value)
