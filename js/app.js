
const shop = document.getElementById('store');
const pokeCache = {}

const fetchproducto = async () => {
    const url = './js/API.json'
    const res = await fetch(url)
    const producto = await res.json()
    const prodAlmacenado = JSON.stringify(producto)
    localStorage.setItem('prod', prodAlmacenado)
    displayproducto(producto)
}

const displayproducto = (producto) => {
    const productoHTMLString = producto
        .map((prod) => `
        <li class="card" >
            <h2 class="card-title">${prod.name}</h2>
            <img alt = "image-of-${prod.name}" class="card-image" src="${prod.image}"/>
            <p class="card-subtitle" onclick = "selectproducto(${prod.id})">CLICK ME!</p>
        </li>
    `
        )
        .join('');
        const icon = document.getElementById('cart-icon')
        const sumatoria = document.getElementById('sumatoria-productos')
        const conteo = document.getElementById('conteo-productos')
        const contator = localStorage.getItem('conteo')
        const total = JSON.parse(localStorage.getItem('total'))
        if(total>0){
            icon.innerHTML = `<a><i class="material-icons md-36" style="color: orange">add_shopping_cart</i></a>`
            conteo.innerHTML = `<p>${contator}</p>`
            sumatoria.innerHTML = `<p>$ ${total}</p>`
        }
    shop.innerHTML = productoHTMLString;
};

const selectproducto = async (id)=>{
        const url = `./js/API.json`
        const res = await fetch (url)
        const prod = await res.json()
        const productId= prod[id-1]
        displayPopup(productId)
}

const displayPopup = (productId) =>{
    const image = productId.image
    const htmlString = `
    <div class = "popup" id = "popup">
    <button id = "closeBtn" onclick = "closePopup()">Close</button>
    <div class="card-popup">
            <img class="card-image-popup"  src="${image}" />
            <h2 class="card-title-popup">${productId.name}</h2>
            <p>${productId.description}</p>
            <p class="card-subtitle-modal"><b>Price: $ ${productId.price}</b></p>
            <button id="botoncito" onclick = "displayId(${productId.id})">I WANT IT!!</button>
        </div>
    </div>
    `
    shop.innerHTML = htmlString + shop.innerHTML
}

const closePopup = () =>{
    const popup = document.querySelector('.popup')
    popup.parentElement.removeChild(popup)

}

const findOrCreateCartProduct = () => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('cart'));
  }

  const createCart = (productId, array) =>{
    let productArr = findOrCreateCartProduct();
            
    let itExist = productArr.find(item => item.id == productId);
    if (!itExist) {
      productArr.push({ ...array[productId - 1], count: 1 });
    } else {
      itExist.count += 1;
    }
    localStorage.setItem('cart', JSON.stringify(productArr));
  }

const displayId = (productId) =>{
    const array = JSON.parse(localStorage.getItem('prod'))
    const precio = array[productId-1].price
    const nombre = array[productId-1].name
    var conteoProductos = localStorage.getItem('conteo')
    var total = localStorage.getItem('total')
    const icon = document.getElementById('cart-icon')
    const sumatoria = document.getElementById('sumatoria-productos')
    const conteo = document.getElementById('conteo-productos')
    createCart(productId, array)
    if(total==null && conteoProductos==null){
        conteoProductos = 1
        localStorage.setItem('total', precio)
        localStorage.setItem('conteo', conteoProductos)
        conteo.innerHTML = `<p>${conteoProductos}</p>`
        sumatoria.innerHTML = `<p>$ ${precio}</p>`
        icon.innerHTML = `<a><i class="material-icons md-36" style="color: orange">add_shopping_cart</i></a>`
        alert(`Thanks! ${nombre} ADDED, your new total is $ ${precio}`)
    }else{
        total = (parseFloat(total) + precio).toFixed(2)
        conteoProductos = parseInt(conteoProductos)+1   
        localStorage.setItem('total', total)
        localStorage.setItem('conteo', conteoProductos)
        sumatoria.innerHTML = `<p>$ ${total}</p>`
        conteo.innerHTML = `<p>${conteoProductos}</p>`
        icon.innerHTML = `<a><i class="material-icons md-36" style="color: orange">add_shopping_cart</i></a>`
        alert(`Thanks! ${nombre} ADDED, your new total is $ ${total}`)
    }
}


fetchproducto();