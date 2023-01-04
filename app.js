// Array de productos
const stockProductos = [
  {
    id: 1,
    nombre: "Letter Graphic Sweatshirt",
    cantidad: 1,
    desc: "Juego plataformero, niveles dificiles",
    precio: 13.00,
    img: "imgFRAN/producto1.jpg",
  },
  {
    id: 2,
    nombre: "Ripped Frayed Flap Pocket",
    cantidad: 1,
    desc: "Luchas con los mejores graficos",
    precio: 40.00,
    img: "imgFRAN/producto2.jpg",
  },
  {
    id: 3,
    nombre: "Single Button Blazer",
    cantidad: 1,
    desc: "Juego plataformero, niveles basicos",
    precio: 61.00,
    img: "imgFRAN/producto3.jpg",
  },
  {
    id: 4,
    nombre: "Letter Embroidery",
    cantidad: 1,
    desc: "Vive la experiencia dragon ball",
    precio: 19.00,
    img: "imgFRAN/producto4.jpg",
  },
  {
    id: 5,
    nombre: "Letter Graphic Flap Pocket",
    cantidad: 1,
    desc: "La historia de Naruto",
    precio: 24.00,
    img: "imgFRAN/producto5.jpg",
  },
  {
    id: 6,
    nombre: "Zip Up PU Moto Jacket",
    cantidad: 1,
    desc: "Eren Jeager vuelve en formato gamer...",
    precio: 43.00,
    img: "imgFRAN/producto6.jpg",
  },
  {
    id: 7,
    nombre: "Patch Detail Sweater",
    cantidad: 1,
    desc: "No compres esto por tu bien",
    precio: 20.00,
    img: "imgFRAN/producto7.jpg",
  },
  {
    id: 8,
    nombre: "Slant Pocket Drawstring",
    cantidad: 1,
    desc: "Dispara como nunca",
    precio: 22.00,
    img: "imgFRAN/producto8.jpg",
  },
  {
    id: 9,
    nombre: "Slant Pocket Skinny Jeans",
    cantidad: 1,
    desc: "Juego de futbol",
    precio: 32.00,
    img: "imgFRAN/producto9.jpg",
  },
  {
    id: 10,
    nombre: "Contrast Trim Polo Shirt",
    cantidad: 1,
    desc: "Battle Royale",
    precio: 31.00,
    img: "imgFRAN/producto10.jpg",
  },
];

let carrito = [];

// Selectores
const contenedor = document.querySelector('#contenedor');
const carritoContenedor = document.querySelector('#carritoContenedor'); //Contador de productos en el carrito
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const precioTotal = document.querySelector('#precioTotal');
const procesarCompra = document.querySelector('#procesarCompra');
const activarFuncion = document.querySelector('#activarFuncion');
const totalProceso = document.querySelector('#totalProceso');
const formulario = document.querySelector('#procesar-pago');

if (activarFuncion) {
  activarFuncion.addEventListener('click', procesarPedido); 
}

if (formulario) {
  formulario.addEventListener('submit', enviarPedido);  
}

//Almacenando productos en localStorage
document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  mostrarCarrito();

  if (activarFuncion) {
    document.querySelector('#activarFuncion').click(procesarCompra);    
  }


});

if (contenedor) {
  stockProductos.forEach((prod) => {
    const {id, nombre, precio, desc, img, cantidad} = prod //Hacemos desestructuracion
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text"><b>Price:</b> $${precio}</p>
        <p class="card-text"><b>Description:</b> ${desc}</p>
        <p class="card-text"><b>Quantity:</b> ${cantidad}</p>
        <button onclick="agregarProducto(${id})" class="btn btn-primary">Add to cart</button>
      </div>
    </div>  
    `
  });
  
}


if (procesarCompra) {
  procesarCompra.addEventListener('click', () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "Your cart is empty!",
        text: "Please, add some product to your cart to continue payment.",
        icon: "error",
        confirmButtonText: "Accept",
      })
    } else {
      location.href = "compra.html"
      procesarPedido();
    }
  });  
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener('click', () => {
    carrito.length = [];
    mostrarCarrito();
  });  
}

function agregarProducto(id) {

  const existe = carrito.some(prod => prod.id === id);

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item);
  }

  mostrarCarrito();
}

const mostrarCarrito = () => {
  const modalBody = document.querySelector('.modal .modal-body');
  
  if (modalBody) {
    modalBody.innerHTML = ''
    carrito.forEach((prod) => {
      const {id, nombre, precio, desc, img, cantidad} = prod //Hacemos desestructuracion
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
          <img class="img-fluid img-carrito" src="${img}"/> 
        </div>
  
        <div>
          <p><b>Product:</b> ${nombre}</p>
          <p><b>Price:</b> $${precio}</p>
          <p><b>Quantity:</b> ${cantidad}</p>
  
          <button onclick="eliminarProducto(${id})" class="btn btn-danger">Remove product</button>
        </div>
      </div>
      `
    });    
  }

  if (carrito.length === 0) {
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">You haven't added anything yet!</p>
    `
  }

  // Contador de productos en el carrito
  carritoContenedor.textContent = carrito.length;

  //Precio total dentro del carrito
  if (precioTotal) {
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
  }

  guardarStorage();
}

function eliminarProducto(id) {
  const productoId = id;
  carrito = carrito.filter((producto) => producto.id !== productoId);
  mostrarCarrito();
}

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function procesarPedido() {
  
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector('#lista-compra tbody');
    const {id, nombre, precio, desc, img, cantidad} = prod //Hacemos desestructuracion

    const row = document.createElement('tr');
    row.innerHTML += `
    <td>
      <img class="img-carrito" src="${img}"/>
    </td>
    <td>${nombre}</td>
    <td>$${precio}</td>
    <td>${cantidad}</td>
    <td>$${precio * cantidad}</td>
    
    `
    listaCompra.appendChild(row);
  });

  totalProceso.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
}

function enviarPedido(e) {
e.preventDefault();
const persona = document.querySelector('#persona').value;
const correo = document.querySelector('#correo').value;

if (persona === '' || correo === '') {
  swal.fire({
    title: "You have to put your name and e-mail to make the payment",
    text: "Please, fill the form out.",
    icon: "error",
    confirmButtonText: "Accept",
  });
  
} else {

  const btn = document.getElementById('button');

    // document.getElementById('form').addEventListener('submit', function (event) {
    //   event.preventDefault();

      btn.value = 'Sending...';

      const serviceID = 'default_service';
      const templateID = 'template_kbtkjgl';

      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          btn.value = 'Make the payment';
          alert('Sent!');
        }, (err) => {
          btn.value = 'Make the payment';
          alert(JSON.stringify(err));
        });
    }

  const spinner = document.querySelector('#spinner');
  spinner.classList.add('d-flex');
  spinner.classList.remove('d-none');

  setTimeout(() =>{
    spinner.classList.remove('d-flex');
    spinner.classList.add('d-none');
    formulario.reset()
  }, 2000);

  const alertExito = document.createElement('p');
  alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-md-12', 'mt-2', 'alert-success');
  alertExito.textContent = "Purchase made correctly.";
  formulario.appendChild(alertExito);

  setTimeout(() =>{
    alertExito.remove()
  }, 3000);

  localStorage.clear();
}
