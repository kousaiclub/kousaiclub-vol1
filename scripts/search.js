// scripts/search.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const resultsContainer = document.getElementById('resultsContainer');
  const noResults = document.getElementById('noResults');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = getSearchConditions();
    const members = await fetchMembers();
    const filtered = filterMembers(members, query);
    renderResults(filtered);
  });

  async function fetchMembers() {
  const response = await fetch('/data/members.json');
  return await response.json();
}


  function getSearchConditions() {
    return {
      ageFrom: parseInt(document.getElementById('ageFrom').value) || null,
      ageTo: parseInt(document.getElementById('ageTo').value) || null,
      heightFrom: parseInt(document.getElementById('heightFrom').value) || null,
      heightTo: parseInt(document.getElementById('heightTo').value) || null,
      bust: document.getElementById('bust').value.trim(),
      waist: document.getElementById('waist').value.trim(),
      hip: document.getElementById('hip').value.trim(),
      cup: document.getElementById('cup').value.trim(),
      hobby: document.getElementById('hobby').value.trim(),
    };
  }

  function filterMembers(members, query) {
    return members.filter(m => {
      const age = parseInt((m['年齢'] || '').trim());
      const height = parseInt((m['身長'] || '').trim());
      const b = (m['スリーサイズ（B）'] || '').trim();
      const w = (m['スリーサイズ（W）'] || '').trim();
      const h = (m['スリーサイズ（H）'] || '').trim();
      const cup = (m['スリーサイズ（Cup）'] || '').trim();
      const hobby = (m['趣味'] || '').trim();

      return (
        (!query.ageFrom || age >= query.ageFrom) &&
        (!query.ageTo || age <= query.ageTo) &&
        (!query.heightFrom || height >= query.heightFrom) &&
        (!query.heightTo || height <= query.heightTo) &&
        (!query.bust || b === query.bust) &&
        (!query.waist || w === query.waist) &&
        (!query.hip || h === query.hip) &&
        (!query.cup || cup === query.cup) &&
        (!query.hobby || hobby.includes(query.hobby))
      );
    });
  }

  function renderResults(members) {
    resultsContainer.innerHTML = '';
    noResults.style.display = members.length === 0 ? 'block' : 'none';

    members.forEach(m => {
      const card = document.createElement('div');
      card.className = 'card';

      // スライド画像作成
      const slideshow = document.createElement('div');
      slideshow.className = 'slideshow';
      const photos = (m['写真'] || '').split(',').slice(0, 4);

      photos.forEach((url, idx) => {
        const img = document.createElement('img');
        img.src = url.trim();
        if (idx === 0) img.classList.add('active');
        slideshow.appendChild(img);
      });

      if (photos.length > 1) {
        let index = 0;
        setInterval(() => {
          const imgs = slideshow.querySelectorAll('img');
          imgs.forEach(img => img.classList.remove('active'));
          imgs[index = (index + 1) % imgs.length].classList.add('active');
        }, 3000);
      }

      // テキスト部
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

      // リンク処理（全体）
      const link = document.createElement('a');
      link.href = `https://kousaiclub.jp/member${no}.html`;
      link.target = '_blank';
      link.appendChild(slideshow);

      card.appendChild(link);
      card.appendChild(info);
      resultsContainer.appendChild(card);

      // お気に入り状態反映
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
