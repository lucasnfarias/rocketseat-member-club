import { apiConfig } from "../config/api";
import { updateHistoryCard } from "./dashboard/history";
import { updateProfileInfoCard } from "./dashboard/profile-info";

document.addEventListener("DOMContentLoaded", async () => {
  createDashboard();
});

async function createDashboard() {
  const query = document.location.search;

  const cardId = (String(query).match(/card-id=(\d+-\d+-\d+-\d+)/) || [])[1];

  const { id, name, picture, clientSince, appointmentHistory, loyaltyCard } =
    await fetchCardIdInfo({ cardId });

  updateProfileInfoCard({ name, picture, clientSince });
  updateHistoryCard({ appointmentHistory });
}

async function fetchCardIdInfo({ cardId }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/clients/${cardId}`);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    alert("Não foi possível buscar os dados desse usuário.");
  }
}
