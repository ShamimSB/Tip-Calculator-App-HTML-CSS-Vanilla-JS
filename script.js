const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTip = document.querySelector(".custom-tip");
const tipAmountDisplay = document.querySelectorAll(".amount")[0];
const totalDisplay = document.querySelectorAll(".amount")[1];
const resetButton = document.getElementById("reset");

let billValue = 0;
let tipValue = 0;
let peopleValue = 1;

const calculateTip = () => {
  if (peopleValue >= 1 && !isNaN(billValue) && billValue > 0) { 
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + (billValue * tipValue)) / peopleValue;
    tipAmountDisplay.innerHTML = `$${tipAmount.toFixed(2)}`;
    totalDisplay.innerHTML = `$${total.toFixed(2)}`;
  }
};

billInput.addEventListener("input", () => {
  billValue = parseFloat(billInput.value) || 0; 
  calculateTip();
});

tipButtons.forEach(btn => {
  btn.addEventListener("click", (event) => {
    tipButtons.forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");
    tipValue = parseFloat(event.target.innerHTML) / 100;
    customTip.value = "";
    calculateTip();
  });
});

customTip.addEventListener("input", () => {
  tipValue = parseFloat(customTip.value) / 100;
  tipButtons.forEach(b => b.classList.remove("active"));
  if (!isNaN(tipValue)) {
    calculateTip();
  }
});


peopleInput.addEventListener("input", () => {
  peopleValue = parseFloat(peopleInput.value);
  if (peopleValue <= 0 || isNaN(peopleValue)) { 
    peopleInput.style.border = "2px solid orange";
  } else {
    peopleInput.style.border = "none";
    calculateTip();
  }
});

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTip.value = "";
  tipAmountDisplay.innerHTML = "$0.00";
  totalDisplay.innerHTML = "$0.00";
  tipButtons.forEach(b => b.classList.remove("active"));

 
  billValue = 0;
  tipValue = 0;
  peopleValue = 1;
  peopleInput.style.border = "none";
});
