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
  if (peopleValue >= 1 && billValue > 0) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + (billValue * tipValue)) / peopleValue;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalDisplay.textContent = `$${total.toFixed(2)}`;
  } else {
    tipAmountDisplay.textContent = "$0.00";
    totalDisplay.textContent = "$0.00";
  }
};

billInput.addEventListener("input", () => {
  billValue = parseFloat(billInput.value) || 0;
  calculateTip();
});

tipButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipButtons.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");

    tipValue = parseFloat(e.target.textContent) / 100;
    customTip.value = "";

    calculateTip();
  });
});

customTip.addEventListener("input", () => {
  tipValue = parseFloat(customTip.value) / 100 || 0;
  tipButtons.forEach((b) => b.classList.remove("active"));

  calculateTip();
});

peopleInput.addEventListener("input", () => {
  peopleValue = parseFloat(peopleInput.value);

  if (peopleValue <= 0 || isNaN(peopleValue)) {
    peopleInput.style.border = "2px solid orange";
    tipAmountDisplay.textContent = "$0.00";
    totalDisplay.textContent = "$0.00";
  } else {
    peopleInput.style.border = "";
    calculateTip();
  }
});

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTip.value = "";

  tipAmountDisplay.textContent = "$0.00";
  totalDisplay.textContent = "$0.00";

  tipButtons.forEach((b) => b.classList.remove("active"));

  billValue = 0;
  tipValue = 0;
  peopleValue = 1;

  peopleInput.style.border = "";
});
