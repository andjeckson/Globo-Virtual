let $ = document.querySelector.bind(document) // cria um seletor $()

let globo = $('#globo')
let elmPedraSorteada      = $('#globo #pedra-sorteada')
let elmNumPedraSorteada   = $('.globo .numero')
let elmLetraPedraSorteada = $('.globo .letra');
let btnSortear            = $('#btn-sortear')
let tabelaDeNumeros       = $('#tabela-de-numeros')
let checkbox              = $('.app-bar input[type=checkbox]')

let pedrasSorteadas  = new Set()
let ultimaPedraSorteada = null
let sinteseDeVoz = false

// Adicona zero à esquerda aos números menores que 10

function adicionarZeroAEsquerda(numero){
    let stringNumero = String(numero)
    let numeroFormatado = stringNumero.padStart(2, '0')
        return numeroFormatado
}

//Gira o globo
function girarOGlobo(){
    globo.classList.add('girar')
    btnSortear.disabled = true
    falar('Sorteando pedra…')
}

globo.onanimationend = ()=>{
    globo.classList.remove('girar')
    btnSortear.disabled = false
     sortearPedra()
}

//Gera uma tabela com os números de 1 a 75
function gerarTabelaDeNumeros(){
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')
    
    tabelaDeNumeros.appendChild(thead)
    tabelaDeNumeros.appendChild(tbody)
    
    const tr = document.createElement('tr')
          thead.appendChild(tr)
    
    const BINGO = ['B','I','N','G','O']
          BINGO.forEach((letra)=>{
              const th = document.createElement('th')
                    th.textContent = letra
                    th.className = letra
                    
              tr.appendChild(th)
          })
          
          // Gera os números de 1 a 75
          
          for( let i = 1; i <= 15; i++){
               const tr = document.createElement('tr')
                     for( j = 0; j < 5; j++){
                         let n = j === 0 ? i : i + (15*j)
                         let cedula = criarCedula(n, BINGO[j])
                         tr.appendChild(cedula)
                     }
                     
                     tbody.appendChild(tr)
          }
    
}

// cria cedula da tabela com os respectivos números 

function criarCedula(numero, letra){
     const td = document.createElement('td')
           td.textContent = adicionarZeroAEsquerda(numero)
           td.id = 'pedra-' + numero
           td.classList = 'pedra-'+letra.toLowerCase()
           td.dataset.letra = letra
           
           return td
}

gerarTabelaDeNumeros()


// Sorteia uma pedra
function sortearPedra(){
     const numero = Math.floor( Math.random() * 75) + 1
           
           // Evita que os números se repitam
           if( pedrasSorteadas.has(numero)){
                 sortearPedra() // Sorteia novamente
           }else{
               pedrasSorteadas.add(numero) // Adiciona a pedra
               mostrarPedraSorteada(numero)
           }
}


// Mostra a ultima pedra sorteada
function mostrarPedraSorteada(numero){

    let cedula = $('#pedra-'+numero)
        cedula.classList.add('pintar')
        
    let letra = cedula.dataset.letra
    
    elmPedraSorteada.className = 'pedra-sorteada pedra-'+String(letra).toLowerCase()
    
    elmLetraPedraSorteada.textContent = letra
    elmNumPedraSorteada.textContent = adicionarZeroAEsquerda(numero);
    
    let fala = `Pedra sorteada: letra ${letra != 'O' ? letra: 'Ó'}, número ${numero}. ${letra != 'O' ? letra: 'Ó'}, ${numero}`
    falar(fala)
}


// Usa a tts para falar as pedras sorteadas
function falar(texto){
    if( sinteseDeVoz === true)
    {
           
     let speechUtterance = new SpeechSynthesisUtterance(texto)
         speechUtterance.lang = 'pt-BR'
         speechUtterance.rate = 1.5
         speechSynthesis.speak( speechUtterance )
 }
}

checkbox.addEventListener('change',()=>{
     sinteseDeVoz = checkbox.checked
    
    if( window.SpeechSynthesisUtterance){
         if( sinteseDeVoz === true){
              falar('Síntese de voz ativada!')
         }
    }else{
        alert('Seu navegador não tem suporte para a síntese de voz.')
        checkbox.checked = false
    }
})

btnSortear.onclick = ()=>{
      girarOGlobo()
}


// Abertura do app

let telaDeAbertura = document.querySelector('.abertura')
    telaDeAbertura.addEventListener('animationend', (e)=>{
           if(e.target.classList.contains('abertura'))
           {
             telaDeAbertura.remove()
           }
    })