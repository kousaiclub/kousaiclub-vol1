// scripts/search.js（完全版：GitHubコピペ対応＋検索フォーム初期化済）

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
  const groups = [ [18,19], [20,24], [25,29], [30,34], [35,39], [40,44], [45,50] ];
  select.innerHTML = '<option value=""></option>';
  groups.forEach(([start, end]) => {
    const option = document.createElement('option');
    option.value = `${start}-${end}`;
    option.textContent = `${start}〜${end}`;
    select.appendChild(option);
  });
}

function populateOptions(id, from, to, step) {
  const select = document.getElementById(id);
  select.innerHTML = '<option value=""></option>';
  for (let i = from; i <= to; i += step) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }
}

function populateCupOptions(id) {
  const select = document.getElementById(id);
  const cups = ['A','B','C','D','E','F','G','H','I','J'];
  select.innerHTML = '<option value=""></option>';
  cups.forEach(c => {
    const option = document.createElement('option');
    option.value = c;
    option.textContent = c;
    select.appendChild(option);
  });
}

function parseAge(value) {
  if (!value) return null;
  const [start, end] = value.split('-').map(Number);
  return { start, end };
}

function getSearchConditions() {
  const ageFrom = parseAge(document.getElementById('ageFrom').value)?.start;
  const ageTo = parseAge(document.getElementById('ageTo').value)?.end;
  return {
    ageFrom,
    ageTo,
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

function parseAgeFromComment(comment) {
  const match = comment.match(/(\d{1,2})歳/);
  return match ? parseInt(match[1]) : null;
}

function getValidAge(member) {
  return parseAgeFromComment(member.comment || '');
}

function filterMembers(members, query) {
  return members.filter(m => {
    const age = getValidAge(m);
    const height = parseInt(m['height'] || '');
    const b = parseInt(m['bust'] || '');
    const w = parseInt(m['waist'] || '');
    const h = parseInt(m['hip'] || '');
    const cup = (m['cup'] || '').trim();
    const hobby = (m['hobby'] || '').trim();

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
  const resultsContainer = document.getElementById('resultsContainer');
  const noResults = document.getElementById('noResults');
  resultsContainer.innerHTML = '';
  noResults.style.display = members.length === 0 ? 'block' : 'none';

  members.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card';

    const slideshow = document.createElement('div');
    slideshow.className = 'slideshow';
    const memberNo = m['memberNo'].padStart(3, '0');

    for (let i = 1; i <= 4; i++) {
      const img = document.createElement('img');
      img.src = `/images/photo${memberNo}_${i}.jpg`;
      img.onerror = () => img.remove();
      if (i === 1) img.classList.add('active');
      slideshow.appendChild(img);
    }

    const link = document.createElement('a');
    link.href = `https://kousaiclub.jp/member${memberNo}.html`;
    link.target = '_blank';
    link.appendChild(slideshow);

    const info = document.createElement('div');
    info.className = 'card-text';
    info.style.fontSize = '13px';
    info.style.fontFamily = "'Cormorant Garamond', serif";
    info.style.paddingBottom = '20px';
    info.style.minHeight = '140px';

    info.innerHTML = `
      <p>${m['memberNo']} ${m['name']}</p>
      <p>${m['height']}cm (${getValidAge(m)}歳）</p>
      <p>${m['bust']}/${m['waist']}/${m['hip']}/${m['cup']}カップ</p>
      <p class="comment">${m['comment']}</p>
    `;

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '♥';
    heart.style.position = 'absolute';
    heart.style.bottom = '5px';
    heart.style.left = '50%';
    heart.style.transform = 'translateX(-50%)';
    heart.style.cursor = 'pointer';

    heart.addEventListener('click', () => {
      const key = `fav_${m['memberNo']}`;
      const isActive = heart.classList.toggle('active');
      localStorage.setItem(key, isActive ? '1' : '0');
    });

    if (localStorage.getItem(`fav_${m['memberNo']}`) === '1') {
      heart.classList.add('active');
    }

    card.appendChild(link);
    card.appendChild(info);
    card.appendChild(heart);
    resultsContainer.appendChild(card);
  });
}
