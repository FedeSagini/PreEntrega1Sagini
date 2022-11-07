let productos = [
  {id: 1, nombre: "Amd ryzen 5 5600g", precio: 17000, imgUrl: "img/ryzen5.jpg" },
  {id: 2, nombre: "Amd ryzen 7 6500g", precio: 21000, imgUrl: "img/ryzen5.jpg"},
  {id: 3, nombre: "Amd ryzen 7 4500g", precio: 18000, imgUrl: "img/ryzen5.jpg"}
]

let contenedorProductos = document.getElementById ("contenedorProductos")
renderizarProductos()




let = botones = document.getElementsByClassName('boton')
let = inputBusqueda = document.getElementById('busqueda')

inputBusqueda.oninput = () => {
  let productosFiltrados = productos.filter(producto => producto.nombre.includes (inputBusqueda.value))
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

let totalCarrito= ""
let totalCarritoPrecio= 0

for (const boton of botones) {
  boton.onclick = (e) => {
    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let sumaCarrito = []
    
    sumaCarrito.push(productoBuscado.nombre, ", $" ,productoBuscado.precio, ", ")
    for(let i of sumaCarrito) totalCarrito+=i;
    console.log(totalCarrito)
    
  
  let sumaCarritoPrecio = []
  sumaCarritoPrecio.push(productoBuscado.precio)
  for(let i of sumaCarritoPrecio) totalCarritoPrecio+=i;
    console.log("El precio total es de $", totalCarritoPrecio)
  }
  
}

