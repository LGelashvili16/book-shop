'use strict';
// ------------------- Header -------------------

const header = document.createElement('header');
const hdrDiv = document.createElement('div');
const hdrTitle = document.createElement('h1');
const hdrButton = document.createElement('button');

header.setAttribute('id', 'header');
hdrTitle.innerText = 'WELCOME TO BOOK SHOP';
hdrButton.classList.add('hdr-button');
hdrButton.innerText = 'Book Catalog';

hdrDiv.appendChild(hdrTitle);
hdrDiv.appendChild(hdrButton);
header.appendChild(hdrDiv);

const fragment = new DocumentFragment();

fragment.appendChild(header);

document.body.appendChild(fragment);

hdrButton.addEventListener('click', function () {
  location.href = '#catalog';
});

// ------------------- Main -------------------

let totalPrice = 0;
let listCounter = 0;

const main = document.createElement('main');
document.body.appendChild(main);
const mainCards = document.createElement('div');

// --------------- Main Heading ---------------

const mainHeadingDiv = document.createElement('div');
const headingH2 = document.createElement('h2');

const headingInnerDiv = document.createElement('div');
const headingH3 = document.createElement('h3');
const headingImg = document.createElement('img');
const prodCounter = document.createElement('p');

headingH2.innerText = 'Book Catalog';
headingH2.id = 'catalog';
mainHeadingDiv.appendChild(headingH2);
mainHeadingDiv.classList.add('main-heading');

headingInnerDiv.classList.add('cart');
mainHeadingDiv.appendChild(headingInnerDiv);

headingH3.innerText = 'Shopping List';
headingInnerDiv.appendChild(headingH3);

headingImg.src = '../../assets/icon/bag.svg';
headingImg.alt = 'bag icon';
headingInnerDiv.appendChild(headingImg);

prodCounter.innerText = listCounter;
headingInnerDiv.appendChild(prodCounter);

// ------------ Drop down list ------------

const dropDown = document.createElement('div');
dropDown.classList.add('drop-down');

const dropDownTextArea = document.createElement('div');
dropDownTextArea.classList.add('drop-down-text-area');

const total = document.createElement('p');
total.classList.add('drop-down-total');
total.innerText = `Total: $${totalPrice}`;

const checkoutBtn = document.createElement('button');
checkoutBtn.innerText = 'Checkout';
checkoutBtn.addEventListener('click', function () {
  window.open('../checkout form/index.html');
})

dropDownTextArea.appendChild(total);
dropDownTextArea.appendChild(checkoutBtn);

const cartBooksList = document.createElement('div');
cartBooksList.classList.add('cart-books-list');

dropDown.appendChild(cartBooksList);
dropDown.appendChild(dropDownTextArea);

headingInnerDiv.appendChild(dropDown);

// ------------------------------

main.appendChild(mainHeadingDiv);

const headerHeight = document.getElementById('header').offsetHeight;

const bookCatalogClick = headingH2.addEventListener('click', function () {
  document.documentElement.scrollTo(0, headerHeight);
});

// --------------- Description ---------------

const description = document.createElement('div');
const descriptionText = document.createElement('p');
descriptionText.innerText = '';

description.appendChild(descriptionText);

description.classList.add('description');
main.appendChild(description);

description.addEventListener('click', function () {
  description.classList.toggle('visible');
});

// --------------- Cards ---------------

fetch('./books.json')
  .then(response => response.json())
  .then(data => data.map(aboutBook => buildCard(aboutBook)));

const buildCard = aboutBook => {
  const bookAuthor = document.createElement('h3');
  bookAuthor.innerText = aboutBook.author;
  // console.log(bookAuthor);

  const bookImageLink = document.createElement('img');
  bookImageLink.src = aboutBook.imageLink;
  bookImageLink.alt = aboutBook.title;

  const bookTitle = document.createElement('h2');
  bookTitle.innerText = aboutBook.title;

  const bookPrice = document.createElement('p');
  bookPrice.innerText = `Price: $${aboutBook.price}`;

  const bookDescription = document.createElement('p');
  bookDescription.innerText = 'Show more';
  bookDescription.classList.add('card-description');

  bookDescription.addEventListener('click', function () {
    descriptionText.innerText = aboutBook.description;
    description.classList.toggle('visible');
  });

  mainCards.classList.add('cards-list');
  main.appendChild(mainCards);
  main.appendChild(footer);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  cardInfo.appendChild(bookAuthor);
  cardInfo.appendChild(bookTitle);
  cardInfo.appendChild(bookPrice);
  cardInfo.appendChild(bookDescription);

  const addToList = document.createElement('button');
  addToList.innerText = 'Add to list';

  const card = document.createElement('div');
  card.classList.add('card-arrange');

  const imageDiv = document.createElement('div');
  imageDiv.appendChild(bookImageLink);
  imageDiv.classList.add('card-img-div');

  card.appendChild(imageDiv);
  card.appendChild(cardInfo);
  card.appendChild(addToList);

  mainCards.appendChild(card);

  addToList.addEventListener('click', function () {
    addInList(aboutBook);
    totalPrice = totalPrice + aboutBook.price;
    total.innerText = `Total: $${totalPrice}`;
    prodCounter.innerText = ++listCounter;
  });
};

// ---------------Add in shopping list---------------

const addInList = function (aboutBook) {
  const bookImg = document.createElement('img');
  bookImg.src = aboutBook.imageLink;
  bookImg.alt = aboutBook.title;

  const cartBookImg = document.createElement('div');
  cartBookImg.classList.add('cart-book-img');
  cartBookImg.appendChild(bookImg);

  const cartBookTitle = document.createElement('h5');
  cartBookTitle.innerText = aboutBook.title;

  const cartBookPrice = document.createElement('p');
  cartBookPrice.innerText = `Price: $${aboutBook.price}`;

  const remover = document.createElement('p');
  remover.classList.add('book-remover');
  remover.innerText = 'Remove';

  const cartBookInfo = document.createElement('div');
  cartBookInfo.classList.add('cart-book-info');
  cartBookInfo.appendChild(cartBookTitle);
  cartBookInfo.appendChild(cartBookPrice);
  cartBookInfo.appendChild(remover);

  remover.addEventListener('click', function () {
    remover.parentElement.parentElement.remove();
    totalPrice = totalPrice - aboutBook.price;
    total.innerText = `Total: $${totalPrice}`;
    prodCounter.innerText = --listCounter;
  });

  const inListBook = document.createElement('div');
  inListBook.classList.add('listed-book');
  inListBook.appendChild(cartBookImg);
  inListBook.appendChild(cartBookInfo);

  cartBooksList.appendChild(inListBook);
};

// --------------- Footer ---------------

const footer = document.createElement('footer');
footer.classList.add('footer');

const footerDiv = document.createElement('div');
const footerText = document.createElement('h2');
footerText.innerText = 'Our Book Shop';
const footerInfo = document.createElement('p');
footerInfo.innerText = 'Designed & Made By LGellson';

footerDiv.appendChild(footerText);
footerDiv.appendChild(footerInfo);

footer.appendChild(footerDiv);

footerText.addEventListener('click', () =>
  document.documentElement.scrollTo(0, 0)
);
