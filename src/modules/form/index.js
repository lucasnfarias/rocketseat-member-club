import { createDashboard } from "../page-load";

const cardIdInput = document.getElementById("card-id");
const buttonInput = document.querySelector("form button");
const form = document.querySelector("form");

cardIdInput.oninput = (e) => {
  let value = cardIdInput.value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1-$2-$3-$4");

  cardIdInput.value = value;
};

form.onsubmit = (event) => {
  event.preventDefault();

  const isValid = /(\d{3})-(\d{3})-(\d{3})-(\d{3})/.test(cardIdInput.value);

  if (!isValid) {
    alert("Id inválido. Formato aceito: 000-000-000-000");
    return;
  }

  const cardId = cardIdInput.value;

  createDashboard({ cardId });

  cardIdInput.value = "";
  cardIdInput.blur();
  buttonInput.blur();
};
