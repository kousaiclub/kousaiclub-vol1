// scripts/search.js（完全復旧版）Add commentMore actions
// scripts/search.js（完全修正版・renderResults 含む）

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const resultsContainer = document.getElementById('resultsContainer');
  const noResults = document.getElementById('noResults');
  const pagination = document.getElementById('pagination');

  populateDropdowns();

@@ -128,7 +127,72 @@ document.addEventListener('DOMContentLoaded', () => {
  function renderResults(members) {
    resultsContainer.innerHTML = '';
    noResults.style.display = members.length === 0 ? 'block' : 'none';
    // ページネーションや結果描画は別関数に分離可能
    // 必要であれば追加します

    members.forEach(m => {
      const card = document.createElement('div');
      card.className = 'card';

      const slideshow = document.createElement('div');
      slideshow.className = 'slideshow';

      const memberNo = m['会員No'].padStart(3, '0');

      for (let i = 1; i <= 4; i++) {
        const img = document.createElement('img');
        img.src = `/images/photo${memberNo}_${i}.jpg`;
        img.onerror = () => img.remove();
        if (i === 1) img.classList.add('active');
        slideshow.appendChild(img);
      }

      let index = 0;
      setInterval(() => {
        const imgs = slideshow.querySelectorAll('img');
        const visibleImgs = Array.from(imgs);
        if (visibleImgs.length <= 1) return;
        visibleImgs.forEach(img => img.classList.remove('active'));
        visibleImgs[index = (index + 1) % visibleImgs.length].classList.add('active');
      }, 3000);

      const info = document.createElement('div');
      info.className = 'card-text';

      const no = m['会員No'];
      const name = m['氏名'];
      const age = m['年齢'];
      const height = m['身長'];
      const b = m['スリーサイズ（B）'];
      const w = m['スリーサイズ（W）'];
      const h = m['スリーサイズ（H）'];
      const cup = m['スリーサイズ（Cup）'];
      const comment = m['本人コメント'];

      info.innerHTML = `
        <p>${no} ${name}</p>
        <p>${height}cm (${age}歳）</p>
        <p>${b}/${w}/${h}/${cup}カップ</p>
        <p>${comment}</p>
        <div class="heart" onclick="toggleFavorite(this, '${no}')">♥</div>
      `;

      const link = document.createElement('a');
      link.href = `https://kousaiclub.jp/member${no}.html`;
      link.target = '_blank';
      link.appendChild(slideshow);

      card.appendChild(link);
      card.appendChild(info);
      resultsContainer.appendChild(card);

      if (localStorage.getItem(`fav_${no}`) === '1') {
        info.querySelector('.heart').classList.add('active');
      }
    });
  }
});

function toggleFavorite(el, no) {
  const key = `fav_${no}`;
  const active = el.classList.toggle('active');
  localStorage.setItem(key, active ? '1' : '0');
}
