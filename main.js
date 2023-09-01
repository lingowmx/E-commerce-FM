//HEADER MENU HAMBURGUESA
const menuHamburguer = document.querySelector('.header__menu');
const modalMenuBackground = document.querySelector('.modal-navbar__background');
const modalNavbar = document.querySelector('.modal-navbar');
const modalNavbarCloseIcon = document.querySelector('.modal-navbar__close-icon');
menuHamburguer.addEventListener('click', () => {
    modalMenuBackground.style.display = 'block';
    modalNavbar.style.display = 'block';
})
modalNavbarCloseIcon.addEventListener('click', () => {
    modalMenuBackground.style.display = 'none';
    modalNavbar.style.display = 'none'
})


//Cambio de cantidad de articulos//
const minusButton = document.querySelector('.input__minus');
const plusButton = document.querySelector('.input__plus');
const userInput = document.querySelector('.input__number')

let userInputNumber = 0;

plusButton.addEventListener('click', () => {
    userInputNumber++
    userInput.value = userInputNumber

})

minusButton.addEventListener('click', () => {
    userInputNumber--;
    if (userInputNumber <= 0) {
        userInputNumber = 0
    }
    userInput.value = userInputNumber

});

//Agregar total de productos al presionar el boton add cart//
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', () => {
    lastValue = lastValue + userInputNumber
    cartNotification.innerText = lastValue
    cartNotification.style.display = 'block';
    userInput.value = 0;
    drawProductInModal();

})

//mostrar el modal de detalle de compras//
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
// let priceModal = document.querySelector('.cart-modal__price');

const productContainer = document.querySelector('.cart-modal__checkout-container');

cartIconBtn.addEventListener('click', () => {
    // cartModal.style.display = 'block';
    cartModal.classList.toggle('show');
    if (lastValue == 0) {
        productContainer.innerHTML = '<p class= "cart-empty">Your cart is empty</p>';
    } else {
        drawProductInModal();
    }
    // priceModal.innerHTML = `$125 x ${lastValue} <span>$${lastValue * 125}.00</span`

})

//borrrar el contenido del carrito//
function deleteProduct() {
    const tachoBasura = document.querySelector('.cart-modal__delete');
    tachoBasura.addEventListener('click', () => {

        productContainer.innerHTML = '<p class= "cart-empty">Your cart is empty</p>';
        lastValue = 0;
        // productContainer.innerText = 'Your cart is empty'
        cartNotification.innerText = lastValue;
    })
}
//modificar imagenes al presionar botones flecha//
const imageContainer = document.querySelector('.gallery__image-container');
const previousGalleryBtn = document.querySelector('.gallery__previous');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;
// const imagesUrls = [
//     '../images/image-product-1.jpg',
//     '../images/image-product-2.jpg',
//     '../images/image-product-3.jpg',
//     '../images/image-product-4.jpg',
// ]
/////// No se uso el array, solo cambiamos las variables de numeros en lugar del array////

nextGalleryBtn.addEventListener('click', () => {
    changeNextImage(imageContainer)
})
previousGalleryBtn.addEventListener('click', () => {
    changePreviousImage(imageContainer)
})


//DESKTOP => MODAL DE IMAGEN DE FONDO AL DARLE CLICK
const imageModalBackground = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', () => {
    if (isMobile()) {
        ''
    } else {
        imageModalBackground.style.display = 'grid';
    }
})
closeModalBtn.addEventListener('click', () => {
    imageModalBackground.style.display = 'none';
})

//DESKTOP ==> CAMBIAR IMAGEN DE gallery AL DARLE CLICK a los THUMBNAILS
// const galleryThumbnails = document.querySelector('.modal-gallery__thumbnails');
let thumbnails = document.querySelectorAll('.gallery__thumbnail');
thumbnails = [...thumbnails];
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (event) => {
        imageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id}.jpg')`

    })
});

//DESKTOP => cambiar imagen modal al darle click a los thumbnails/.///
let modalThumbnails = document.querySelectorAll('.modal-gallery__thumbnail');
modalThumbnails = [...modalThumbnails]
let modalImageContainer = document.querySelector('.modal-gallery__image-container');
// modalThumbnails = [...modalThumbnails];
modalThumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener('click', (event) => {
        console.log(event.target.id.slice(-1))
        modalImageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id.slice(-1)}.jpg')`
    })
})

// DESKTOP => CAMBIAR IMAGEN PRINCIPAL DE MODAL CON FLECHAS DESDE MODAL
const modalPreviousGalleryBtn = document.querySelector('.modal-gallery__previous');
const modalNextGalleryBtn = document.querySelector('.modal-gallery__next');

modalPreviousGalleryBtn.addEventListener('click', () => {
    changePreviousImage(modalImageContainer);
})

modalNextGalleryBtn.addEventListener('click', () => {
    changeNextImage(modalImageContainer);
})




//FUNCIONES
function drawProductInModal() {
    productContainer.innerHTML = `     
    <div class="cart-modal__details">
         <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail-1">
         <div>
        <p class="cart-modal__product">
        Autumn Limited Edition
        </p>
        <p class="cart-modal__price">
        $125 x 3 <span>$375.00</span>
        </p>
        </div>
        <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
     </div>
    <button class="cart-modal__checkout">Checkout</button>`
    deleteProduct()
    let priceModal = document.querySelector('.cart-modal__price');
    priceModal.innerHTML = `$125 x ${lastValue} <span>$${lastValue * 125}.00</span`

}

function changeNextImage(imageContainer) {
    if (imgIndex == 4) {
        imgIndex = 1;
    } else {
        imgIndex++;
    }
    imageContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`

}
function changePreviousImage(imageContainer) {
    if (imgIndex == 1) {
        imgIndex = 4;
    } else {
        imgIndex--;
    }
    imageContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`

}

function isMobile() {
    return window.innerWidth <= 768;
}