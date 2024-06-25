const giftModal = document.getElementById("gift-achieved-modal");
const modalCloseButton = document.querySelector(
  "#gift-achieved-modal .close-x"
);

modalCloseButton.onclick = () => {
  giftModal.style.display = "none";
};

export const showGiftModal = () => {
  giftModal.style.display = "flex";
};
