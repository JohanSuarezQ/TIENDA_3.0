let cartProducts = JSON.parse(localStorage.getItem('cart'));
const details = document.getElementById('details')
const printProducts = document.getElementById('cart')
const totalProducts = document.getElementById('total')

function createCart (){
    if(cartProducts){
        if(cartProducts.length !== 0){
            for(let i = 0; i< cartProducts.length; i++){
                const cartSide = cartProducts[i]
                printProducts.innerHTML += `
                <li id = "list-cart${i}" class = "list-cart">
                    <h2 class = "list-cart-title"><small>${cartSide.name}</small></h2>
                    <img class = "list-cart-image" width = "100" src="${cartSide.image}" alt="">
                    <p class = "list-cart-description"><small>${cartSide.description}</small></p>
                    <p class = "list-cart-price"></p>
                    <p id = "price${i}" class = "list-cart-amount"><small>Price: $ ${cartSide.price}</small></p>
                    <button class="more" onclick = "countMore(${cartSide.id}, ${cartSide.count})"><small>ADD</small></button>
                    <button class="menos" onclick = "countMenos(${cartSide.id}, ${cartSide.count})"><small>REMOVE</small></button>
                </li>`
                const total = localStorage.getItem('total')
                const conteo = localStorage.getItem('conteo')
                details.innerHTML = `
                <h3 class = "details-title">DETAILS<h3>
                <h3 class = "details-total">Total:</h3>
                    <p class = "details-total-number">$ ${total}</p> 
                <h3 class = "details-amount">Products Amount:</h3>
                    <p class = "details-amount-number">${conteo}</p>
                    <button class="delete-car" onclick = "deleteCar()">DELETE CAR</button>
                `
                const acumulado = document.getElementsByTagName('li')[i].querySelector('.list-cart-price')
                acumulado.innerHTML = `Amount: ${cartProducts[i].count}`
            }
        }
    }
    
}
function countMore (id, count){
    for(let i = 0; i< cartProducts.length; i++){
        if(cartProducts[i].id===id){
            var conteo = parseInt(localStorage.getItem('conteo'))
            var total = parseFloat(localStorage.getItem('total'))
            total = (total + cartProducts[i].price).toFixed(2)
            cartProducts[i].count += 1
            conteo++
            localStorage.setItem('conteo', conteo)
            localStorage.setItem('total', total)
            localStorage.setItem('cart', JSON.stringify(cartProducts))
            details.innerHTML = `
            <h3 class = "details-title">DETAILS<h3>
            <h3 class = "details-total">Total:</h3>
                <p class = "details-total-number">$ ${total}</p> 
            <h3 class = "details-amount">Products Amount:</h3>
                <p class = "details-amount-number">${conteo}</p>
                <button class="delete-car" onclick = "deleteCar()">DELETE CAR</button>
            `
            const acumulado = document.getElementsByTagName('li')[i].querySelector('.list-cart-price')
            acumulado.innerHTML = `Amount: ${cartProducts[i].count}`
        }
    }
}

function countMenos (id, count){
    for(let i = 0; i< cartProducts.length; i++){
        if(cartProducts[i].id===id){
            var conteo = parseInt(localStorage.getItem('conteo'))
            var total = parseFloat(localStorage.getItem('total'))
            total = (total - cartProducts[i].price).toFixed(2)
            cartProducts[i].count -= 1
            conteo--
            localStorage.setItem('conteo', conteo)
            localStorage.setItem('total', total)
            localStorage.setItem('cart', JSON.stringify(cartProducts))
            details.innerHTML = `
            <h3 class = "details-title">DETAILS<h3>
            <h3 class = "details-total">Total:</h3>
                <p class = "details-total-number">$ ${total}</p> 
            <h3 class = "details-amount">Products Amount:</h3>
                <p class = "details-amount-number">${conteo}</p>
                <button class="delete-car" onclick = "deleteCar()">DELETE CAR</button>
            `
            const acumulado = document.getElementsByTagName('li')[i].querySelector('.list-cart-price')
            acumulado.innerHTML = `Amount: ${cartProducts[i].count}`

            if(cartProducts[i].count<1){
                cartProducts.splice(i, 1)
                localStorage.setItem('cart', JSON.stringify(cartProducts))
                const padre = document.getElementById('cart')
                const hijo = document.getElementsByTagName("li")[i]
                const removido = padre.removeChild(hijo)
                if(cartProducts.length===0){
                    localStorage.removeItem('cart')
                    printProducts.innerHTML = `
                    <i class="material-icons md-48" id="sad-icon">sentiment_very_dissatisfied</i>
                    <h3>Your cart is empty click <button><a class="back-button" href="index.html">HERE!</a></button></h3>
                    `
                }
            }
        }
    }
}

function deleteCar(){
    const cartProducts = ''
    const total = 0
    const conteo = 0
    localStorage.setItem('cart', cartProducts)
    localStorage.setItem('conteo', conteo)
    localStorage.setItem('total', total)
    printProducts.innerHTML = `
    <i class="material-icons md-48" id="sad-icon">sentiment_very_dissatisfied</i>
    <h3>Your cart is empty click <button><a class="back-button" href="index.html">HERE!</a></button></h3>
    `
    details.innerHTML = `
            <h3 class = "details-title">DETAILS<h3>
            <h3 class = "details-total">Total:</h3>
                <p class = "details-total-number">$ 0.0</p> 
            <h3 class = "details-amount">Products Amount:</h3>
                <p class = "details-amount-number">0</p>
                <button class="delete-car" onclick = "deleteCar()">DELETE CAR</button>
            `
    localStorage.removeItem('cart')
}

function cartPageEmpty(){
    if(cartProducts===null){
        printProducts.innerHTML = `
        <i class="material-icons md-48" id="sad-icon">sentiment_very_dissatisfied</i>
        <h3>Your cart is empty click <button><a class="back-button" href="index.html">HERE!</a></button></h3>
        `
        details.innerHTML = `
            <h3 class = "details-title">DETAILS<h3>
            <h3 class = "details-total">Total:</h3>
                <p class = "details-total-number">$ 0.0</p> 
            <h3 class = "details-amount">Products Amount:</h3>
                <p class = "details-amount-number">0</p>
                <button class="delete-car" onclick = "deleteCar()">DELETE CAR</button>
            `
    }
}

cartPageEmpty()

createCart()

