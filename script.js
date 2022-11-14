let productos = [
  { id: 1, nombre: "Amd ryzen 5 5600g", precio: 17000, imgUrl: "img/ryzen5.jpg" },
  { id: 2, nombre: "Amd ryzen 7 6500g", precio: 21000, imgUrl: "img/ryzen5.jpg" },
  { id: 3, nombre: "Amd ryzen 7 4500g", precio: 18000, imgUrl: "img/ryzen5.jpg" }
]

const contenedorCarrito = document.getElementById("carritoContenedor")

let contenedorProductos = document.getElementById("contenedorProductos")
renderizarProductos()

let botones = document.getElementsByClassName('boton')
let inputBusqueda = document.getElementById('busqueda')


inputBusqueda.oninput = () => {
  let productosFiltrados = productos.filter(producto => producto.nombre.includes(inputBusqueda.value))
  renderizarProductos(productosFiltrados)
}

function renderizarProductos(productosFiltrados) {
  let productosARenderizar = productos
  if (productosFiltrados) {
    productosARenderizar = productosFiltrados
  }
  contenedorProductos.innerHTML = ''
  for (const producto of productosARenderizar) {
    let tarjetaProducto = document.createElement('div')
    tarjetaProducto.className = 'producto'
    tarjetaProducto.innerHTML = `
    <h3>${producto.nombre}</h3>
    <h4>${producto.precio}</h4>
    <img src=${producto.imgUrl} id="img">
    <button class="boton" id=${producto.id}>Agregar al carrito</button>
    `

    contenedorProductos.append(tarjetaProducto)
    
  }
}

let totalCarrito = ""
let totalCarritoPrecio = 0
let carrito = document.getElementById('carrito')
let carritoGuardado = []
if (localStorage.getItem('carrito')) {
  carritoGuardado = JSON.parse(localStorage.getItem('carrito'))
}

for (const item of carritoGuardado) {
  let productoBuscado = productos.find(producto => producto.id == item.id)
  carritoHtml()
  
}

for (const boton of botones) {
  boton.onclick = (e) => {
    let productoBuscado = productos.find(producto => producto.id == e.target.id)

    let posicionProductoEnCarrito = carritoGuardado.findIndex(producto => producto.id == e.target.id)

    if (posicionProductoEnCarrito != -1) {
      carritoGuardado[posicionProductoEnCarrito].unidades++
      carritoGuardado[posicionProductoEnCarrito].subTotal = carritoGuardado[posicionProductoEnCarrito].precioUnidad * carritoGuardado[posicionProductoEnCarrito].unidades
    } else {
      carritoGuardado.push({ id: productoBuscado.id, nombre: productoBuscado.nombre, precioUnidad: productoBuscado.precio, unidades: 1, subTotal: productoBuscado.precio })
    }
    

    for (let i of carritoGuardado) totalCarrito += i;
    localStorage.setItem('carrito', JSON.stringify(carritoGuardado))


    let carritoGuardadoPrecio = []
    carritoGuardadoPrecio.push(productoBuscado.precio)
    for (let i of carritoGuardadoPrecio) totalCarritoPrecio += i;
    
    carritoHtml()
  }

}

function carritoHtml() {
  if(Object.keys(carritoGuardado).length === 0){
    carrito.innerHTML = `
      <div class="itemCarrito animate">
      Gracias por su compra
      </div>
    `
    return
  }
  carrito.innerHTML = `
      <div class="itemCarrito">
          <p>Nombre</p>
          <p>Precio</p>
          <p>Unidades</p>
          <p>Sub Total</p>
      </div>
    `
  let total = 0
  for (const item of carritoGuardado) {
    total += item.subTotal
    carrito.innerHTML += `
      <div class="itemCarrito">
          <p>${item.nombre}</p> 
          <p>${item.precioUnidad}</p>
          <p>${item.unidades}</p>
          <p>${item.subTotal}</p>
      </div>
    `
  
  }
  carrito.innerHTML += `
      <div class="itemCarrito">
          <h3>Total: ${total}</h3>
          <button class='botones' id='botonComprar'>Comprar</button>
      </div>
    `
  const btnComprar = document.getElementById('botonComprar')

  btnComprar.addEventListener('click', () => {
    carritoGuardado = []
    localStorage.clear()
    carritoHtml()
  })
  
 
 
}


const eliminar = document.getElementById('eliminar')

  eliminar.addEventListener("click", () => {
    eliminarProducto(productos.id);
});

const eliminarProducto = (id) => {
  const foundId = carritoGuardado.find((productos) => productos.id === id);

  console.log(foundId);

  carrito = carritoGuardado.filter((carritoId) => {
    return carritoId !== foundId;
  })

  carritoHtml()
}


// const actualizarCarrito = () => {
//   contenedorCarrito.innerHTML = ""

//   carritoGuardado.forEach((prod) =>{
//     const div = document.createElement('div')
//     div.className = ('productoEnCarrito')
//     div.innerHTML = `
//     <p>${prod.nombre}</p>
//     <p>Precio: ${prod.precio}</p>
//     <p>Unidades: <span id="cantidad">${prod.unidades}</span></p>
//     <buttton onclick = "eliminarDelCarrito(${prod.id}) class="boton-eliminar><i class=fas fas-trash-alt"></buttton>"
//     `
//     contenedorCarrito.appendChild(div)
//   })

// }