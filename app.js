let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PURE CHOCOLATE',
        image: 'ch77.jpg',
        price: 550
    },
    {
        id: 2,
        name: 'TASTY CHOCOLATE',
        image: 'ch6.jpg',
        price: 480
    },
    {
        id: 3,
        name: 'PURE CHOCOLATE',
        image: 'ch44.jpg',
        price: 800
    },
    {
        id: 4,
        name: 'DAIRY MILK',
        image: 'ch1.png',
        price: 250
    },
    {
        id: 5,
        name: 'DAIRY MILK HAMPER',
        image: 'ch2.png',
        price: 1500
    },
    {
        id: 6,
        name: 'INTERNATIONAL CHOCOLATE',
        image: 'ch33.jpg',
        price: 2000
    },
    {
        id: 7,
        name: 'CHOCLATE CAKE',
        image: 'cake1.png',
        price: 1000
    },
    {
        id: 8,
        name: 'VANILA CHOCOLATE CAKE',
        image: 'cake2.png',
        price: 1200 
    },
    {
        id: 9,
        name: 'STRAWBERRY CHOCOLATE CAKE',
        image: 'cake3.png',
        price: 1500
    },
    {
        id: 10,
        name: 'VANILA CUPCAKE',
        image: 'blog-img1.png',
        price: 190
    },
    {
        id: 11,
        name: 'MIX FRUIT CAKE',
        image: 'blog-img2.png',
        price: 1800
    },
    {
        id: 12,
        name: 'VANILA CAKE',
        image: 'blog-img3.png',
        price: 900
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}