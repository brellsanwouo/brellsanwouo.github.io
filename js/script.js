document.addEventListener('DOMContentLoaded', () => {
  /* ===============================
     Gestion des onglets
  =============================== */
  const tabs = document.querySelectorAll('.profile-tabs li');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

   /* ===============================
     Affichage de la boîte de description
  =============================== */
  const descriptionBox = document.querySelector('.profile-description-box');
  if (descriptionBox) {
    descriptionBox.style.display = 'block';
  }

  /* ===============================
     Mode sombre (Toggle contraste)
  =============================== */
  const toggleButton = document.getElementById('toggle-contrast');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      // Changer l'icône selon le mode
      if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '☀️';
      } else {
        toggleButton.textContent = '🌙';
      }
    });
  }
});
