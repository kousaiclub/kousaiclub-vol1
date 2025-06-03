document.addEventListener('DOMContentLoaded', () => {
  const resultsContainer = document.getElementById('resultsContainer');
  const noResults = document.getElementById('noResults');

  fetch('/data/members.json')
    .then(response => response.json())
    .then(data => {
      const params = new URLSearchParams(window.location.search);
      const filters = {
        age: params.get('age'),
        height: params.get('height'),
        cup: params.get('cup'),
        area: params.get('area'),
        smoking: params.get('smoking'),
        drinking: params.get('drinking'),
      };

      const filteredMembers = data.filter(member => {
        return (!filters.age || member.age === filters.age) &&
               (!filters.height || member.height === filters.height) &&
               (!filters.cup || member.cup === filters.cup) &&
               (!filters.area || member.area === filters.area) &&
               (!filters.smoking || member.smoking === filters.smoking) &&
               (!filters.drinking || member.drinking === filters.drinking);
      });

      if (filteredMembers.length === 0) {
        noResults.style.display = 'block';
        return;
      }

      filteredMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';

        const img = document.createElement('img');
        img.src = `images/${member.photo}`;
        img.alt = member.name;
        img.className = 'member-photo';

        const name = document.createElement('div');
        name.className = 'member-name';
        name.textContent = member.name;

        const info = document.createElement('div');
        info.className = 'member-info';
        info.textContent = `${member.age}歳 / ${member.height}cm / ${member.cup}カップ`;

        const comment = document.createElement('div');
        comment.className = 'member-comment';
        comment.textContent = member.comment;

        const fav = document.createElement('div');
        fav.className = 'favorite';
        fav.innerHTML = '❤️';

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(info);
        card.appendChild(comment);
        card.appendChild(fav);
        resultsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('検索結果の読み込みに失敗しました:', error);
      noResults.style.display = 'block';
    });
});
