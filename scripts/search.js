const html = results.length > 0
  ? results.map(m => {
      const photo = m["写真"].split(",")[0].trim();
      const memberNo = m["会員No"];
      const name = m["氏名"];
      const age = m["年齢"];
      const height = m["身長"];
      const bust = m["スリーサイズ（B）"];
      const waist = m["スリーサイズ（W）"];
      const hip = m["スリーサイズ（H）"];
      const cup = m["スリーサイズ（Cup）"];
      const comment = m["本人コメント"] || "";

      return `
        <div class="card">
          <div class="card-image" onclick="location.href='member_${memberNo}.html'">
            <img src="${photo}" alt="${name}">
          </div>
          <div class="card-text">
            <div class="line1">${memberNo} ${name}</div>
            <div class="line2">${height}cm（${age}歳）</div>
            <div class="line3">${bust}/${waist}/${hip}（${cup}カップ）</div>
            <div class="line4">${comment}</div>
            <span class="favorite-btn" onclick="toggleFavorite(${memberNo}, this)">♡</span>
          </div>
        </div>
      `;
    }).join("")
  : `<p style="color:red;">※該当する会員が見つかりません</p>`;

document.querySelector(".search-results").innerHTML = html;
