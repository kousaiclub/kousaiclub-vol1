// 【完成・即使用可】search.js：検索フォームのプルダウン自動生成＋検索実行処理

document.addEventListener("DOMContentLoaded", () => {
  const fillOptions = (selectId, from, to, step = 1, suffix = "") => {
    const select = document.getElementById(selectId);
    if (!select) return;
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "";
    select.appendChild(emptyOption);
    for (let i = from; i <= to; i += step) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${i}${suffix}`;
      select.appendChild(option);
    }
  };

  // 年齢 (20〜49)
  fillOptions("ageFrom", 20, 49, 5);
  fillOptions("ageTo", 20, 49, 5);

  // 身長 (140〜179)
  fillOptions("heightFrom", 140, 179, 5);
  fillOptions("heightTo", 140, 179, 5);

  // B/W/H (70〜99, 50〜90)
  fillOptions("bustFrom", 70, 99, 5);
  fillOptions("bustTo", 70, 99, 5);
  fillOptions("waistFrom", 50, 90, 5);
  fillOptions("waistTo", 50, 90, 5);
  fillOptions("hipFrom", 70, 99, 5);
  fillOptions("hipTo", 70, 99, 5);

  // カップ (A〜J)
  const cups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const fillCupOptions = (selectId) => {
    const select = document.getElementById(selectId);
    if (!select) return;
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "";
    select.appendChild(emptyOption);
    cups.forEach(c => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      select.appendChild(option);
    });
  };

  fillCupOptions("cupFrom");
  fillCupOptions("cupTo");

  // ✅ 検索ボタンの実行処理
  document.getElementById("searchSubmit")?.addEventListener("click", () => {
    const getVal = id => document.getElementById(id)?.value || "";
    const params = new URLSearchParams({
      ageFrom: getVal("ageFrom"),
      ageTo: getVal("ageTo"),
      heightFrom: getVal("heightFrom"),
      heightTo: getVal("heightTo"),
      bustFrom: getVal("bustFrom"),
      bustTo: getVal("bustTo"),
      waistFrom: getVal("waistFrom"),
      waistTo: getVal("waistTo"),
      hipFrom: getVal("hipFrom"),
      hipTo: getVal("hipTo"),
      cupFrom: getVal("cupFrom"),
      cupTo: getVal("cupTo"),
      hobby: getVal("hobby")
    });
    fetch("https://script.google.com/macros/s/AKfycbz_nTAqYbxg1UwkUkO4tpkVnoEdtbTFSbqJDJ10yiuvdtOVh6Z8K0UuM_1L983iXo2QKw/exec?" + params)
      .then(res => res.text())
      .then(html => {
        document.querySelector(".search-results").innerHTML = html;
      })
      .catch(err => {
        document.querySelector(".search-results").innerHTML = `<p style="color:red;">検索に失敗しました。</p>`;
        console.error(err);
      });
  });
});
