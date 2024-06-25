const historyCard = document.querySelector(".history");
const historyCutCount = historyCard.querySelector("header span");
const appointmentsList = document.getElementById("appointments");

export async function updateHistoryCard({ appointmentHistory }) {
  historyCutCount.textContent = `${appointmentHistory.length} cortes`;

  appointmentsList.innerHTML = "";

  appointmentHistory.forEach((appointment) => {
    const item = document.createElement("li");
    const dateTime = document.createElement("div");
    const date = document.createElement("strong");
    const time = document.createElement("span");

    date.textContent = appointment.date;
    time.textContent = appointment.time;

    const checkIcon = document.createElement("img");
    checkIcon.classList.add("check-icon");
    checkIcon.setAttribute("src", "./src/assets/icons/SealCheck.svg");
    checkIcon.setAttribute("alt", "Check");

    const checkWrapper = document.createElement("div");
    checkWrapper.classList.add("check-icon-wrapper");
    checkWrapper.append(checkIcon);

    dateTime.append(date, time);
    item.append(dateTime, checkWrapper);
    appointmentsList.appendChild(item);
  });
}
