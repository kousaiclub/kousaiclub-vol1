document.addEventListener("DOMContentLoaded", () => {
  const fillOptions = (selectId, from, to, step = 1, suffix = "") => {
    const select = document.getElementById(selectId);
    if (select) {
      for (let i = from; i <= to; i += step) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${i}${suffix}`;
        select.appendChild(option);
      }
    }
  };

  fillOptions("ageFrom", 20, 49, 5);
  fillOptions("ageTo", 20, 49, 5);
  fillOptions("heightFrom", 140, 179, 5);
  fillOptions("heightTo", 140, 179, 5);
  fillOptions("bustFrom", 70, 99, 5);
  fillOptions("bustTo", 70, 99, 5);
  fillOptions("waistFrom", 40, 69, 5);
  fillOptions("waistTo", 40, 69, 5);
  fillOptions("hipFrom", 70, 99, 5);
  fillOptions("hipTo", 70, 99, 5);

  const cups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const fillCupOptions = (selectId) => {
    const select = document.getElementById(selectId);
    if (select) {
      cups.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        select.appendChild(option);
      });
    }
  };
  fillCupOptions("cupFrom");
  fillCupOptions("cupTo");

  // 🔍 Searchボタン処理
  const searchButton = document.querySelector(".search-button");
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const params = new URLSearchParams({
        ageFrom: document.getElementById("ageFrom").value || "",
        ageTo: document.getElementById("ageTo").value || "",
        heightFrom: document.getElementById("heightFrom").value || "",
        heightTo: document.getElementById("heightTo").value || "",
        bustFrom: document.getElementById("bustFrom").value || "",
        bustTo: document.getElementById("bustTo").value || "",
        waistFrom: document.getElementById("waistFrom").value || "",
        waistTo: document.getElementById("waistTo").value || "",
        hipFrom: document.getElementById("hipFrom").value || "",
        hipTo: document.getElementById("hipTo").value || "",
        cupFrom: document.getElementById("cupFrom").value || "",
        cupTo: document.getElementById("cupTo").value || "",
        hobby: document.getElementById("hobby").value || "",
      });

      fetch("https://script.google.com/macros/s/AKfycbwnMJ3PAIMA9JrnTOfd9qY5_cN1Yc0lIgNIBN_6Z3dASZzO9-QV5qcsQ1W-vD41HTsh6A/exec?" + params.toString())
        .then(response => response.text())
        .then(html => {
          document.querySelector(".search-results").innerHTML = html;
        })
        .catch(error => {
          console.error("検索エラー:", error);
          document.querySelector(".search-results").innerHTML = "<p style='color:red;'>検索に失敗しました。</p>";
        });
    });
  }
});
