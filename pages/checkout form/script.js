// Identify error

let failsCounter = 0;
let disableButton = () => document.getElementById('button-submit').disabled = true;


const send = function (ev) {
  ev.preventDefault();
  
  let fails = validate();

  if (fails.length === 0) {
    document.getElementById('button-submit').disabled = false;
    // document.getElementById("form-user").submit();
  } else {
    fails.forEach((obj) => {
      
      let obtainElement = document.getElementById(obj.id);
      obtainElement.parentElement.classList.add("error");
      obtainElement.parentElement.setAttribute("data-errormsg", obj.msg);
    });
  }
};


//! Validate function adds errors on submit  -----------


const validate = function (ev) {
  
  let failures = [];

  // Payment method

  let cash = document.getElementById("cash");
  let card = document.getElementById("card");
  if (!cash.checked && !card.checked) {
    failures.push({ id: "cash", msg: `The field is invalid` });
  }

  // Remove error message on radio buttons

  function removeErr() {
    const radioCash = document.getElementById("cash");
    radioCash.addEventListener("click", function () {
      cash.parentElement.setAttribute("data-errormsg", "");
    });

    const radioCard = document.getElementById("card");
    radioCard.addEventListener("click", function () {
      card.parentElement.setAttribute("data-errormsg", "");
    });
  }
  removeErr();

  // Flat number error

  const inputFlat = document.getElementById("input-flat");
  
  if (
    inputFlat.value == "" || inputFlat.validity.patternMismatch
  ) {
    failures.push({ id: "input-flat", msg: `The field is invalid` });
  }

  // House number error

  const inputHouse = document.getElementById('input-house');

  if (inputHouse.validity.patternMismatch || inputHouse.value == "") {
    failures.push({id: 'input-house', msg: `The field is invalid`});
  }

  // Street

  const streetAddrs = document.getElementById('input-street');

  if (streetAddrs.value.length < 5) {
    failures.push({id: 'input-street', msg: `The field is invalid`})
  }

  // Date

  const date = document.getElementById('input-date');

  if (date.validity.patternMismatch || date.value == '') {
    failures.push({id: 'input-date', msg: `The field is invalid`});
  }

  // Surname

  const surname = document.getElementById('input-surname');

  if (surname.validity.patternMismatch || surname.value == '' || surname.value.length < 5) {
    failures.push({id: 'input-surname', msg: `The field is invalid`});
  }

  // Name
  
  const firstName = document.getElementById('input-first');

  if (firstName.validity.patternMismatch || firstName.value == '' || firstName.value.length < 4) {
    failures.push({id: 'input-first', msg: `The field is invalid`});
  }

  return failures;
};


//! --------------------------------------------

 // Flat number error remove on input -----------------

const inputFlat = document.getElementById("input-flat");
  
inputFlat.addEventListener('input', function () {
  if (
    inputFlat.value == "" || inputFlat.validity.patternMismatch
  ) {
    inputFlat.parentElement.classList.add('error');
    inputFlat.parentElement.setAttribute("data-errormsg", `The field is invalid`);
    disableButton();
  } else {
    inputFlat.parentElement.setAttribute("data-errormsg", "");
  }
});

// --------------------------------------------

 // Remove house number error on input -----------------

const inputHouse = document.getElementById('input-house');

inputHouse.addEventListener('input', function() {
  if (inputHouse.validity.patternMismatch || inputHouse.value == "") {
    inputHouse.parentElement.classList.add('error');
    inputHouse.parentElement.setAttribute('data-errormsg', `The field is invalid`);
    disableButton();
  } else {
    inputHouse.parentElement.setAttribute('data-errormsg', '');
  }
});

// --------------------------------------------

// Remove street number error on input -----------------

const streetAddrs = document.getElementById('input-street');

streetAddrs.addEventListener('input', function() {
  if (streetAddrs.value.length < 5) {
    streetAddrs.parentElement.classList.add('error');
    streetAddrs.parentElement.setAttribute('data-errormsg', `The field is invalid`)
    disableButton();
  } else {
    streetAddrs.parentElement.setAttribute('data-errormsg', '');
  }
})

// --------------------------------------------

// Get appropriate date ---------------------------

const date = new Date();
const day = date.getDate() + 1;
const month = date.getMonth() + 1;
const year = date.getFullYear();
const tomorrow = `${year}-${month}-${day}`;

const inputDate = document.getElementById('input-date');
inputDate.setAttribute('min', tomorrow);
// console.log(tomorrow);

inputDate.addEventListener('input', function () {
  if (inputDate.validity.patternMismatch) {
    inputDate.parentElement.classList.add('error');
    inputDate.parentElement.setAttribute('data-errormsg',`The field is invalid`);
    disableButton();
  } else {
    inputDate.parentElement.setAttribute('data-errormsg', '');
  }
})
 
// --------------------------------------------

// Surname  ---------------------------

const surname = document.getElementById('input-surname');

surname.addEventListener('input', function () {
  if (surname.validity.patternMismatch || surname.value == '' || surname.value.length < 5) {
    surname.parentElement.classList.add('error');
    surname.parentElement.setAttribute('data-errormsg', `The field is invalid`);
    disableButton();
  } else {
    surname.parentElement.setAttribute('data-errormsg', ``);
  }
});

// --------------------------------------------

// Name  ---------------------------

const firstName = document.getElementById('input-first');

firstName.addEventListener('input', function () {
  if (firstName.validity.patternMismatch || firstName.value == '' || firstName.value.length < 4) {
    firstName.parentElement.classList.add('error');
    firstName.parentElement.setAttribute('data-errormsg', `The field is invalid`);
    disableButton();
  } else {
    firstName.parentElement.setAttribute('data-errormsg', '');
  }
});

  
// --------------------------------------------

// Submit button ---------------------------

window.addEventListener('change', send);
document.getElementById("button-submit").addEventListener("click", send);
document.getElementById("button-submit").addEventListener("click", function () {
  const confirmed = document.querySelector('.confirmed');
  confirmed.classList.add('visible');
  const deliveryInfo = document.querySelector('.delivery-info');
deliveryInfo.textContent = `${streetAddrs.value}, House: ${inputHouse.value}, Flat: ${inputFlat.value}, Customer: ${firstName.value} ${surname.value}`;
});

// limit checkboxes ---------------------------

function limitCheckbox() {
  let allCheckbox = document.getElementsByName("chk");
  let selected = 0;

  for (let i = 0; i < allCheckbox.length; i++) {
    if (allCheckbox[i].checked == true) {
      selected += 1;
    }
  }

  if (selected > 2) {
    return false;
  }
}

// --------------------------------------------

// add scroll to the container on resize --------------

const container = document.querySelector(".container");
visualViewport.addEventListener("resize", addScroll);

function addScroll() {
  if (visualViewport.height < 836) {
    container.classList.add("scroll");
  } else if (visualViewport.height >= 836) {
    container.classList.remove("scroll");
  }
}

// --------------------------------------------