// すべての検索処理とカード生成を1つのscriptにまとめる

// GitHubからJSONデータを取得
fetch('https://raw.githubusercontent.com/kousaiclub-vol1/data/main/members.json')
  .then(response => response.json())
  .then(data => {
    // 検索条件を取得
    let searchAgeFrom = document.getElementById('ageFrom').value;
    let searchAgeTo = document.getElementById('ageTo').value;
    let searchHeightFrom = document.getElementById('heightFrom').value;
    let searchHeightTo = document.getElementById('heightTo').value;
    let searchMemberNo = document.getElementById('memberNo').value;  // 会員Noを取得

    // 条件に該当する会員をフィルタリング
    let filteredMembers = data.filter(member => {
      // 会員Noの検索条件が空でない場合、それを条件に追加
      let memberNoMatches = searchMemberNo ? member.id == searchMemberNo : true;

      return (member.age >= searchAgeFrom && member.age <= searchAgeTo) &&
             (member.height >= searchHeightFrom && member.height <= searchHeightTo) &&
             memberNoMatches;  // 会員Noに一致するか
    });

    // 検索結果を表示
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ""; // 既存の結果をクリア

    if (filteredMembers.length === 0) {
      resultsContainer.innerHTML = "<p>検索結果がありませんでした。</p>";
    } else {
      filteredMembers.forEach(member => {
        let memberCard = createMemberCard(member); // 会員カードを生成する関数
        resultsContainer.appendChild(memberCard);
      });
    }
  });

// 会員カードを生成する関数
function createMemberCard(member) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-image" onclick="window.open('member_${member.id}.html', '_blank')">
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

// プルダウンメニューに項目を追加する関数
function populateSelect(id, from, to, step = 5, suffix = '') {
  const select = document.getElementById(id);
  if (!select) return;
  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.textContent = '--';
  select.appendChild(defaultOption);
  for (let i = from; i <= to; i += step) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i + suffix;
    select.appendChild(option);
  }
}

// カップサイズ用のオプションを追加
function populateCups(id) {
  const cups = 'A B C D E F G H I J'.split(' ');
  const select = document.getElementById(id);
  if (!select) return;
  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.textContent = '--';
  select.appendChild(defaultOption);
  cups.forEach(cup => {
    const option = document.createElement('option');
    option.value = cup;
    option.textContent = cup;
    select.appendChild(option);
  });
}

// ページ読み込み時にプルダウンを埋める
window.onload = () => {
  populateSelect('ageFrom', 18, 50, 5);
  populateSelect('ageTo', 18, 50, 5);
  populateSelect('heightFrom', 140, 180, 5, 'cm');
  populateSelect('heightTo', 140, 180, 5, 'cm');
  populateSelect('bustFrom', 70, 100, 5, 'cm');
  populateSelect('bustTo', 70, 100, 5, 'cm');
  populateSelect('waistFrom', 45, 75, 5, 'cm');
  populateSelect('waistTo', 45, 75, 5, 'cm');
  populateSelect('hipFrom', 70, 100, 5, 'cm');
  populateSelect('hipTo', 70, 100, 5, 'cm');
  populateCups('cupFrom');
  populateCups('cupTo');
};
