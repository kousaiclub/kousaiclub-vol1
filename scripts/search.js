document.addEventListener("DOMContentLoaded", () => {
  const fillOptions = (id, from, to, step = 1, suffix = "") => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = "<option value=''></option>";
    for (let i = from; i <= to; i += step) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${i}${suffix}`;
      select.appendChild(opt);
    }
  };

  fillOptions("ageFrom", 20, 49, 5);
  fillOptions("ageTo", 20, 49, 5);
  fillOptions("heightFrom", 140, 179, 5);
  fillOptions("heightTo", 140, 179, 5);
  fillOptions("bustFrom", 70, 99, 5);
  fillOptions("bustTo", 70, 99, 5);
  fillOptions("waistFrom", 50, 90, 5);
  fillOptions("waistTo", 50, 90, 5);
  fillOptions("hipFrom", 70, 99, 5);
  fillOptions("hipTo", 70, 99, 5);

  const fillCup = (id) => {
    const select = document.getElementById(id);
    if (!select) return;
    const cups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    select.innerHTML = "<option value=''></option>";
    cups.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      select.appendChild(opt);
    });
  };

  fillCup("cupFrom");
  fillCup("cupTo");

  document.getElementById("searchSubmit")?.addEventListener("click", () => {
    const val = id => document.getElementById(id)?.value.trim();

    fetch("/data/members.json")
      .then(res => res.json())
      .then(data => {
        const results = data.filter(member => {
          const age = Number(member["年齢"]);
          const height = Number(member["身長"]);
          const bust = Number(member["スリーサイズ（B）"]);
          const waist = Number(member["スリーサイズ（W）"]);
          const hip = Number(member["スリーサイズ（H）"]);
          const cup = member["スリーサイズ（Cup）"];
          const hobby = member["趣味"] || "";

          const inRange = (val, min, max) => !min || !max || (val >= min && val <= max);
          const inCups = (val, min, max) => {
            const cupOrder = ["A","B","C","D","E","F","G","H","I","J"];
            const idx = cupOrder.indexOf(val);
            return (!min && !max) || 
                   (idx >= cupOrder.indexOf(min) && idx <= cupOrder.indexOf(max));
          };
          const hobbyMatch = val("hobby") === "" || hobby.includes(val("hobby"));

          return (
            inRange(age, Number(val("ageFrom")), Number(val("ageTo"))) &&
            inRange(height, Number(val("heightFrom")), Number(val("heightTo"))) &&
            inRange(bust, Number(val("bustFrom")), Number(val("bustTo"))) &&
            inRange(waist, Number(val("waistFrom")), Number(val("waistTo"))) &&
            inRange(hip, Number(val("hipFrom")), Number(val("hipTo"))) &&
            inCups(cup, val("cupFrom"), val("cupTo")) &&
            hobbyMatch
          );
        });

        const html = results.length > 0
          ? results.map(m => `<p>✅ ${m["氏名"]}（${m["年齢"]}歳 / ${m["スリーサイズ（Cup）"]}カップ）</p>`).join("")
          : `<p style="color:red;">※該当する会員が見つかりません</p>`;

        document.querySelector(".search-results").innerHTML = html;
      })
      .catch(err => {
        document.querySelector(".search-results").innerHTML = `<p style="color:red;">検索に失敗しました。</p>`;
        console.error(err);
      });
  });
});
