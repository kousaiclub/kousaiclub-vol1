document.addEventListener("DOMContentLoaded", () => {
  const fillOptions = (id, from, to, step = 1) => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value=""></option>';
    for (let i = from; i <= to; i += step) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }
  };

  fillOptions("ageFrom", 18, 45, 1);
  fillOptions("ageTo", 18, 45, 1);
  fillOptions("heightFrom", 140, 180, 5);
  fillOptions("heightTo", 140, 180, 5);
  fillOptions("bustFrom", 70, 100, 5);
  fillOptions("bustTo", 70, 100, 5);
  fillOptions("waistFrom", 50, 70, 2);
  fillOptions("waistTo", 50, 70, 2);
  fillOptions("hipFrom", 80, 100, 5);
  fillOptions("hipTo", 80, 100, 5);

  const cups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const fillCupOptions = (id) => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value=""></option>';
    cups.forEach(c => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      select.appendChild(option);
    });
  };
  fillCupOptions("cupFrom");
  fillCupOptions("cupTo");

  const getVal = id => document.getElementById(id)?.value || "";

  document.getElementById("searchSubmit").addEventListener("click", () => {
    fetch("/data/members.json")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(member => {
          const age = Number(member["年齢"]);
          const height = Number(member["身長"]);
          const b = Number(member["スリーサイズ（B）"]);
          const w = Number(member["スリーサイズ（W）"]);
          const h = Number(member["スリーサイズ（H）"]);
          const cup = member["スリーサイズ（Cup）"]?.trim().toUpperCase() || "";
          const hobby = member["趣味"] || "";

          const ageFrom = Number(getVal("ageFrom")) || 0;
          const ageTo = Number(getVal("ageTo")) || 100;
          const heightFrom = Number(getVal("heightFrom")) || 0;
          const heightTo = Number(getVal("heightTo")) || 300;
          const bustFrom = Number(getVal("bustFrom")) || 0;
          const bustTo = Number(getVal("bustTo")) || 200;
          const waistFrom = Number(getVal("waistFrom")) || 0;
          const waistTo = Number(getVal("waistTo")) || 200;
          const hipFrom = Number(getVal("hipFrom")) || 0;
          const hipTo = Number(getVal("hipTo")) || 200;
          const cupFrom = getVal("cupFrom");
          const cupTo = getVal("cupTo");
          const hobbyInput = getVal("hobby");

          const cupRange = cups.slice(
            cups.indexOf(cupFrom || "A"),
            cups.indexOf(cupTo || "J") + 1
          );

          return (
            age >= ageFrom && age <= ageTo &&
            height >= heightFrom && height <= heightTo &&
            b >= bustFrom && b <= bustTo &&
            w >= waistFrom && w <= waistTo &&
            h >= hipFrom && h <= hipTo &&
            (!cupFrom || !cupTo || cupRange.includes(cup)) &&
            (!hobbyInput || hobby.includes(hobbyInput))
          );
        });

        const resultArea = document.querySelector(".search-results");
        if (filtered.length === 0) {
          resultArea.innerHTML = `<p style="color:red;">該当する会員が見つかりませんでした。</p>`;
        } else {
          resultArea.innerHTML = filtered.map(m =>
            `<p style="color:lime;">✅ 検索ヒット: ${m["氏名"]}（No.${m["会員No"]}）</p>`
          ).join("");
        }
      })
      .catch(err => {
        document.querySelector(".search-results").innerHTML =
          `<p style="color:red;">検索に失敗しました。</p>`;
        console.error(err);
      });
  });
});
