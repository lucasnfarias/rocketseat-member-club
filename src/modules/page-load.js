import { apiConfig } from "../config/api";
import { updateProfileInfoCard } from "./dashboard/profile-info";
import { updateHistoryCard } from "./dashboard/history";
import { updateFidelityCard } from "./dashboard/fidelity";
import { updateGiftProgressCard } from "./dashboard/gift-progress";
import { showGiftModal } from "./modal";

// TODO maybe add a overlay on dashboard asking for id input instead of this empty user
// TODO don't reload the page use an event handler to get id on input and clean it (we can still check the path if the id is in it)

document.addEventListener("DOMContentLoaded", async () => {
  createDashboard();
});

export async function createDashboard({ cardId } = {}) {
  if (!cardId) {
    generateEmptyUser();
    return;
  }

  const userData = await fetchCardIdInfo({ cardId });

  if (!userData) return;

  const { id, name, picture, clientSince, appointmentHistory, loyaltyCard } =
    userData;

  updateProfileInfoCard({ name, picture, clientSince });
  updateHistoryCard({ appointmentHistory });
  updateFidelityCard({ id, loyaltyCard });
  updateGiftProgressCard({ loyaltyCard });

  if (loyaltyCard.totalCuts === loyaltyCard.cutsNeeded) showGiftModal();
}

function generateEmptyUser() {
  const { id, name, picture, clientSince, appointmentHistory, loyaltyCard } = {
    id: "000-000-000-000",
    name: "Usuário padrão",
    picture: "src/assets/profile-pics/default.png",
    clientSince: "09/11/1989",
    appointmentHistory: [{ date: "09/11/1989", time: "10:00" }],
    loyaltyCard: {
      totalCuts: 1,
      cutsNeeded: 10,
      cutsRemaining: 9,
    },
  };

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
    alert(`Usuário com id ${cardId} não foi encontrado.`);
  }
}
