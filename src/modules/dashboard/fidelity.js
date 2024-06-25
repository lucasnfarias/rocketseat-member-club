const fidelityCard = document.querySelector(".fidelity");
const fidelityCardId = fidelityCard.querySelector("header .user-id-tag h4");
const fidelityStamps = fidelityCard.querySelector(".stamps");

export async function updateFidelityCard({ id, loyaltyCard }) {
  fidelityCardId.textContent = `ID: ${id}`;

  const { totalCuts, cutsRemaining } = loyaltyCard;

  fidelityStamps.innerHTML = "";

  for (let i = 0; i < totalCuts; i++) {
    const item = document.createElement("div");
    item.classList.add("box", "stamp-checked");

    const checkIcon = document.createElement("img");
    checkIcon.setAttribute("src", "src/assets/PinCheck.png");
    checkIcon.setAttribute("alt", "Check");

    item.append(checkIcon);
    fidelityStamps.appendChild(item);
  }

  for (let i = 0; i < cutsRemaining; i++) {
    if (i === cutsRemaining - 1) {
      const item = document.createElement("div");
      item.classList.add("box", "stamp-gift");

      const giftIcon = document.createElement("img");
      giftIcon.setAttribute("src", "src/assets/icons/Gift-Solid.svg");
      giftIcon.setAttribute("alt", "Gift");

      item.append(giftIcon);
      fidelityStamps.appendChild(item);
      continue;
    }

    const item = document.createElement("div");
    item.classList.add("box", "stamp-empty");
    fidelityStamps.appendChild(item);
  }
}
