const tienda = async () => {
  const response = await fetch('./productos.json')
  const productos = await response.json()

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
    for (const { nombre, precio, imgUrl, id } of productosARenderizar) {

      let tarjetaProducto = document.createElement('div')
      tarjetaProducto.className = 'producto'
      tarjetaProducto.innerHTML = `
    <h3>${nombre}</h3>
    <h4>${precio}</h4>
    <img src=${imgUrl} id="img">
    <button class="boton" id=${id}>Agregar al carrito</button>
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

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Producto agregado al carrito'
      })

      for (let i of carritoGuardado) totalCarrito += i
      localStorage.setItem('carrito', JSON.stringify(carritoGuardado))


      let carritoGuardadoPrecio = []
      carritoGuardadoPrecio.push(productoBuscado.precio)
      for (let i of carritoGuardadoPrecio) totalCarritoPrecio += i

      carritoHtml()
    }

  }

  function carritoHtml() {
    if (Object.keys(carritoGuardado).length === 0) {
      carrito.innerHTML = `
      " "
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
          <button class='botones' id='botonVaciar'>Vaciar Carrito</button>
          <button class='botones' id='botonComprar'>Comprar</button>
      </div>
    `
    const btnComprar = document.getElementById('botonComprar')
    const btnVaciar = document.getElementById('botonVaciar')

    btnComprar.addEventListener('click', () => {
      carritoGuardado = []
      localStorage.clear()
      carritoHtml()
    })

    btnVaciar.addEventListener('click', () => {
      carritoGuardado = []
      localStorage.clear()
      carritoHtml()
    })

    function compra() {
      btnComprar.onclick = (e) => {
        Swal.fire('Gracias por su compra');
        setTimeout(() => {
          location.reload()
          localStorage.clear()
        }, 1500)


      }
    }
    compra()

  }

}
tienda()