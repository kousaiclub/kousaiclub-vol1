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

  function filterMembers(members, query) {
    return members.filter(m => {
      const age = parseInt(m['年齢'] || '');
      const height = parseInt(m['身長'] || '');
      const b = parseInt(m['スリーサイズ（B）'] || '');
      const w = parseInt(m['スリーサイズ（W）'] || '');
      const h = parseInt(m['スリーサイズ（H）'] || '');
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

    members.forEach(m => {
      const card = document.createElement('div');
      card.className = 'card';

      const imageDiv = document.createElement('div');
      imageDiv.className = 'card-image';
      imageDiv.onclick = () => window.open(`member${m['会員No']}.html`, '_blank');

      const memberNo = m['会員No'].padStart(3, '0');
      for (let i = 1; i <= 4; i++) {
        const slide = document.createElement('div');
        slide.className = 'slide' + (i === 1 ? ' active' : '');
        const img = document.createElement('img');
        img.src = `images/photo${memberNo}_${i}.jpg`;
        img.onerror = () => slide.remove();
        img.alt = `photo${memberNo}_${i}`;
        slide.appendChild(img);
        imageDiv.appendChild(slide);
      }

      const textDiv = document.createElement('div');
      textDiv.className = 'card-text';

      const name = m['氏名'];
      const age = m['年齢'];
      const height = m['身長'];
      const b = m['スリーサイズ（B）'];
      const w = m['スリーサイズ（W）'];
      const h = m['スリーサイズ（H）'];
      const cup = m['スリーサイズ（Cup）'];
      const comment = m['本人コメント'] || '';
      const commentHTML = `<p class="comment">${comment}</p>`;

      textDiv.innerHTML = `
        <p><strong>No.</strong> ${m['会員No']} ${name}</p>
        <p>${height}cm (${age}歳)</p>
        <p>${b}cm, ${w}cm, ${h}cm, ${cup}カップ</p>
        ${commentHTML}
        <p><span class="favorite-btn" data-id="${m['会員No']}">♡</span></p>
      `;

      card.appendChild(imageDiv);
      card.appendChild(textDiv);
      resultsContainer.appendChild(card);

      // スライド自動切替
      const slides = imageDiv.querySelectorAll('.slide');
      let index = 0;
      if (slides.length > 1) {
        setInterval(() => {
          slides[index].classList.remove('active');
          index = (index + 1) % slides.length;
          slides[index].classList.add('active');
        }, 3000);
      }

      // お気に入り表示
      const favBtn = textDiv.querySelector('.favorite-btn');
      const favKey = `fav-${m['会員No']}`;
      if (localStorage.getItem(favKey)) favBtn.textContent = '❤️';
      favBtn.addEventListener('click', () => {
        if (localStorage.getItem(favKey)) {
          localStorage.removeItem(favKey);
          favBtn.textContent = '♡';
        } else {
          localStorage.setItem(favKey, '1');
          favBtn.textContent = '❤️';
        }
      });
    });
  }
});
