// scripts/search.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const resultsContainer = document.getElementById('resultsContainer');
  const noResults = document.getElementById('noResults');

  populateDropdowns();

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

  function populateDropdowns() {
    populateGroupedOptions('ageFrom');
    populateGroupedOptions('ageTo');
    populateOptions('heightFrom', 140, 180, 5);
    populateOptions('heightTo', 140, 180, 5);
    populateOptions('bustFrom', 70, 110, 5);
    populateOptions('bustTo', 70, 110, 5);
    populateOptions('waistFrom', 40, 80, 5);
    populateOptions('waistTo', 40, 80, 5);
    populateOptions('hipFrom', 70, 110, 5);
    populateOptions('hipTo', 70, 110, 5);
    populateCupOptions('cupFrom');
    populateCupOptions('cupTo');
  }

  function populateGroupedOptions(id) {
    const select = document.getElementById(id);
    const groups = [
      [18, 19],
      [20, 24],
      [25, 29],
      [30, 34],
      [35, 39],
      [40, 44],
      [45, 50],
    ];
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '';
    select.appendChild(defaultOption);
    groups.forEach(([start, end]) => {
      const option = document.createElement('option');
      option.value = `${start}-${end}`;
      option.textContent = `${start}〜${end}`;
      select.appendChild(option);
    });
  }

  function parseAge(value) {
    if (!value) return null;
    const [start, end] = value.split('-').map(Number);
    return { start, end };
  }

  function populateOptions(id, from, to, step) {
    const select = document.getElementById(id);
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '';
    select.appendChild(defaultOption);
    for (let i = from; i <= to; i += step) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }
  }

  function populateCupOptions(id) {
    const select = document.getElementById(id);
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '';
    select.appendChild(defaultOption);
    const cups = ['A','B','C','D','E','F','G','H','I','J'];
    cups.forEach(c => {
      const option = document.createElement('option');
      option.value = c;
      option.textContent = c;
      select.appendChild(option);
    });
  }

  function getSearchConditions() {
    const ageRangeFrom = parseAge(document.getElementById('ageFrom').value);
    const ageRangeTo = parseAge(document.getElementById('ageTo').value);
    return {
      ageFrom: ageRangeFrom ? ageRangeFrom.start : null,
      ageTo: ageRangeTo ? ageRangeTo.end : null,
      heightFrom: parseInt(document.getElementById('heightFrom').value) || null,
      heightTo: parseInt(document.getElementById('heightTo').value) || null,
      bustFrom: parseInt(document.getElementById('bustFrom').value) || null,
      bustTo: parseInt(document.getElementById('bustTo').value) || null,
      waistFrom: parseInt(document.getElementById('waistFrom').value) || null,
      waistTo: parseInt(document.getElementById('waistTo').value) || null,
      hipFrom: parseInt(document.getElementById('hipFrom').value) || null,
      hipTo: parseInt(document.getElementById('hipTo').value) || null,
      cupFrom: document.getElementById('cupFrom').value.trim(),
      cupTo: document.getElementById('cupTo').value.trim(),
      hobby: document.getElementById('hobby').value.trim(),
    };
  }

  function filterMembers(members, query) {
    return members.filter(m => {
      const age = parseInt((m['年齢'] || '').trim());
      const height = parseInt((m['身長'] || '').trim());
      const b = parseInt((m['スリーサイズ（B）'] || '').trim());
      const w = parseInt((m['スリーサイズ（W）'] || '').trim());
      const h = parseInt((m['スリーサイズ（H）'] || '').trim());
      const cup = (m['スリーサイズ（Cup）'] || '').trim();
      const hobby = (m['趣味'] || '').trim();

      return (
        (!query.ageFrom || age >= query.ageFrom) &&
        (!query.ageTo || age <= query.ageTo) &&
        (!query.heightFrom || height >= query.heightFrom) &&
        (!query.heightTo || height <= query.heightTo) &&
        (!query.bustFrom || b >= query.bustFrom) &&
        (!query.bustTo || b <= query.bustTo) &&
        (!query.waistFrom || w >= query.waistFrom) &&
        (!query.waistTo || w <= query.waistTo) &&
        (!query.hipFrom || h >= query.hipFrom) &&
        (!query.hipTo || h <= query.hipTo) &&
        (!query.cupFrom || cup >= query.cupFrom) &&
        (!query.cupTo || cup <= query.cupTo) &&
        (!query.hobby || hobby.includes(query.hobby))
      );
    });
  }

  function renderResults(members) {
    resultsContainer.innerHTML = '';
    noResults.style.display = members.length === 0 ? 'block' : 'none';

    const uniqueMembers = Array.from(
      new Map(members.map(m => [m['会員No'], m])).values()
    );

    uniqueMembers.forEach(m => {
      const card = document.createElement('div');
      card.className = 'card';

      const slideshow = document.createElement('div');
      slideshow.className = 'slideshow';
      const memberNo = m['会員No'].padStart(3, '0');

      for (let i = 1; i <= 4; i++) {
        const img = document.createElement('img');
        img.src = `/images/photo${memberNo}_${i}.jpg`;
        img.onerror = () => img.style.display = 'none';
        if (i === 1) img.classList.add('active');
        slideshow.appendChild(img);
      }

      let index = 0;
      setInterval(() => {
        const imgs = slideshow.querySelectorAll('img');
        const visibleImgs = Array.from(imgs).filter(img => img.style.display !== 'none');
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
