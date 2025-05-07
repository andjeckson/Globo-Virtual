$ = document.querySelector.bind(document)

let globo         = $('.globo')
let elementoPedra = globo.querySelector('.pedra-sorteada')
let pedraNumero   = elementoPedra.querySelector('.numero')
let pedraLetra    = elementoPedra.querySelector('.letra')
let cedulas     = $('.cedulas')

let pedrasSorteadas = new Set()
const LIMITE_DE_PEDRAS = 75 // Limite de pedras a serem sorteadas.
let ultimaPedraSorteada = ''


function criarTabela(){
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')
    
    const headRow = document.createElement('tr')
    const BINGO = ['B','I','N','G','O']
    
    BINGO.forEach((letra)=>{
         const th = document.createElement('th')
               th.innerHTML = letra
               headRow.appendChild(th)
    })
    
    thead.appendChild(headRow)
    
    table.appendChild(thead)
    
    for(let i = 1 ;i <= 15; i++){
        let tr = document.createElement('tr')
        
        let tdB = document.createElement('td')
            tdB.id = 'pedra-'+ i
            tdB.textContent = addZeroAEsquerda(i)
            tdB.dataset.letra = 'B'
            tr.appendChild(tdB)
            
         let tdI = document.createElement('td')
             tdI.textContent = i + 15
             tdI.id = 'pedra-'+ (i + 15)
             tdI.dataset.letra = 'I'
             tr.appendChild(tdI)
             
         let tdN = document.createElement('td')
            tdN.textContent =  i + 30
            tdN.id = 'pedra-'+ (i + 30)
            tdN.dataset.letra = 'N'
            tr.appendChild(tdN)
            
         let tdG = document.createElement('td')
             tdG.textContent =  i + 45
             tdG.id = 'pedra-'+ (i + 45)
             tdG.dataset.letra = 'G'
             tr.appendChild(tdG)
             
         let tdO = document.createElement('td')
             tdO.textContent = i + 60
             tdO.id = 'pedra-'+ (i+60)
             tdO.dataset.letra = 'O'
             tr.appendChild(tdO)
         
       tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    cedulas.appendChild(table)
    
}



function sortearPedra() {
    
    let pedra = Math.floor(Math.random() * LIMITE_DE_PEDRAS) + 1;
    
    // Remove pedra repetida
    if (pedrasSorteadas.has(pedra)) {
        return sortearPedra(); // Faz um novo sorteio
    } else {
        pedrasSorteadas.add(pedra); 
        ultimaPedraSorteada = pedra;
    }
}



function girarOGlobo(){
    globo.classList.add('girar')
    elementoPedra.classList.remove('mostrar')
}

globo.addEventListener('click', girarOGlobo)

globo.addEventListener('animationend', ()=>{
  sortearPedra()
  mostrarPedraSorteada()
})

function mostrarPedraSorteada(){
 let cedula = cedulas.querySelector('#pedra-' + ultimaPedraSorteada)
 
     cedula.classList.add('sorteada');
     pedraLetra.innerHTML = cedula.dataset.letra
     pedraNumero.innerHTML = addZeroAEsquerda(ultimaPedraSorteada)
         
         elementoPedra.classList.add('mostrar')
         globo.classList.remove('girar')
}



function addZeroAEsquerda(str){
     return String(str).padStart(2, '0')
}

criarTabela()


let telaDeAbertura = document.querySelector('.abertura')
    telaDeAbertura.onanimationend = (e)=>{
        if(e.target.classList.contains('abertura'))
        {
             telaDeAbertura.remove()
        }
}
