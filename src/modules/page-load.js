import { apiConfig } from "../config/api";
import { updateProfileInfoCard } from "./dashboard/profile-info";
import { updateHistoryCard } from "./dashboard/history";
import { updateFidelityCard } from "./dashboard/fidelity";
import { updateGiftProgressCard } from "./dashboard/gift-progress";

document.addEventListener("DOMContentLoaded", async () => {
  createDashboard();
});

async function createDashboard() {
  const query = document.location.search;

  if (!query) return;

  const cardId = (String(query).match(/card-id=(\d+-\d+-\d+-\d+)/) || [])[1];

  if (query && !cardId) {
    alert("O id do cartão não é válido");
    return;
  }

  const { id, name, picture, clientSince, appointmentHistory, loyaltyCard } =
    await fetchCardIdInfo({ cardId });

  updateProfileInfoCard({ name, picture, clientSince });
  updateHistoryCard({ appointmentHistory });
  updateFidelityCard({ id, loyaltyCard });
  updateGiftProgressCard({ loyaltyCard });
}

async function fetchCardIdInfo({ cardId }) {
  try {
    if (!cardId) throw Error("card_id_not_found");

    const response = await fetch(`${apiConfig.baseURL}/clients/${cardId}`);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    alert("Não foi possível buscar os dados desse usuário.");
  }
}
