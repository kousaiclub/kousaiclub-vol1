// GitHubからデータを取得
fetch('https://raw.githubusercontent.com/username/repository/main/data/members.json')
  .then(response => response.json())
  .then(data => {
    // 検索条件を取得
    let searchAgeFrom = document.getElementById('ageFrom').value;
    let searchAgeTo = document.getElementById('ageTo').value;
    let searchHeightFrom = document.getElementById('heightFrom').value;
    let searchHeightTo = document.getElementById('heightTo').value;
    let searchHobby = document.getElementById('hobby').value;

    // 条件に該当する会員をフィルタリング
    let filteredMembers = data.filter(member => {
      return (member.age >= searchAgeFrom && member.age <= searchAgeTo) &&
             (member.height >= searchHeightFrom && member.height <= searchHeightTo) &&
             (searchHobby === "" || member.hobby.includes(searchHobby));  // hobbyが空の場合は条件を無視
    });

    // 検索結果を表示
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ""; // 既存の結果をクリア
    filteredMembers.forEach(member => {
      let memberCard = createMemberCard(member); // 会員カードを生成する関数
      resultsContainer.appendChild(memberCard);
    });
  });

// 会員カードを生成する関数
function createMemberCard(member) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-image" onclick="window.open('member${member.id}.html', '_blank')">
      <div class='slide active'><img src='images/photo${member.id}_1.jpg'></div>
      <div class='slide'><img src='images/photo${member.id}_2.jpg'></div>
      <div class='slide'><img src='images/photo${member.id}_3.jpg'></div>
      <div class='slide'><img src='images/photo${member.id}_4.jpg'></div>
    </div>
    <div class="card-text">
      <p><strong>No.</strong> ${member.id} ${member.name}</p>
      <p>${member.height}cm (${member.age}歳)</p>
      <p>${member.bust}, ${member.waist}, ${member.hip}, ${member.cup}カップ</p>
      <p class="comment">${member.comment}</p>
      <p><span class="favorite-btn" data-id="${member.id}">♡</span></p>
    </div>
  `;
  return card;
}
