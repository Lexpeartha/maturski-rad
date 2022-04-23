let activeEffect = null

function effect(eff) {
  // Postavljamo aktivni efekat
  activeEffect = eff
  // Izvrsavamo efekat
  eff()
  // Sklanjamo aktivni efekat
  activeEffect = null
}

let proizvod = reactive({ cena: 100, kolicina: 2 })

let ukupno = 0

// WeakMap se razlikuje od Mapa samo time sto je kljuc objekat a ne string
// Ovo je top level varijable u kojoj stavljamo sve objekte koji treba da budu reaktivni
const targetMap = new WeakMap()

// Funkcija koja sadrzi promene koje azuriraju vrednosti koje zelimo (u ovom slucaju ukupnu cenu)
effect(() => {
  ukupno = proizvod.cena * proizvod.kolicina
})

// Funkcija koja belezi objekte koje zelimo da pratimo i na cije promene se reaguje
function track(target, key) {
  if (!activeEffect) return

  // Proveravamo da li je targetMap vec definisan za target
  let depsMap = targetMap.get(target)
  // Ako nije, definisemo ga kao praznu mapu
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  // Proveravamo da li je vec definisan key za target
  let dep = depsMap.get(key)
  // Ako nije, definisemo ga kao prazan set
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  // Dodajemo efekat koji zelimo da se izvrsi na promene
  dep.add(activeEffect)
}

// Funkcija koja izvrsava sve efekte, u svim svojstvima datog objekta
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const dep = depsMap.get(key)
  if (!dep) return

  dep.forEach(effect => effect())
}

// Reaktivna funkcija koja wrappuje objekat u reaktivan proxy objekat
function reactive(obj) {
  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      let oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      // Ako je vrednost promenjena, izvrsavamo sve efekte
      if (oldValue !== value) {
        trigger(target, key)
      }
      return result
    },
  }

  // Vracamo proxy objekat sa get/set interceptoromima
  return new Proxy(obj, handler)
}

// Funkcija za primitivne vrednosti
function ref(initialValue) {
  return reactive({ value: initialValue })
}

// Primer kako se koristi
// NAPOMENA: Iskomentarisani kod je onaj koji nije neophodan vise, ali ostace ovde kao referenca

// Pocinjemo da pratimo svojsvojstvo objekta kolicina
// track(proizvod, 'kolicina')
// Inicijalizujemo vrednost efekta
// effect()

console.log('Ukupno 1: ', ukupno) // 200

// Azuriramo vrednost na koju se varijabla oslanja
proizvod.kolicina = 3

console.log('Ukupno 2: ', ukupno) // 200

// Vrednost se azurirala tek kada smo pozvali sve efekte kroz metodu trigger
// trigger(proizvod, 'kolicina')

// console.log('Ukupno nakon efekta:', ukupno) // 300
