document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 6; // Liczba obrazów na stronę
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const totalItems = portfolioItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  let currentPage = 1;

  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  // Funkcja pokazująca elementy tylko z aktywnej strony
  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    portfolioItems.forEach((item, index) => {
      if (index >= start && index < end) {
        item.classList.add("visible"); // Pokazujemy elementy
      } else {
        item.classList.remove("visible"); // Ukrywamy elementy
      }
    });

    // Zarządzaj stanem przycisków
    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;
  }

  // Obsługa kliknięcia "Następna"
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  // Obsługa kliknięcia "Poprzednia"
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  // Wyświetl pierwszą stronę na starcie
  showPage(currentPage);
});
