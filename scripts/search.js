// 会員カードを生成する関数
function createMemberCard(member) {
  let card = document.createElement('div');
  card.classList.add('card');
  
  // リンクにして個別ページへ遷移
  card.innerHTML = `
    <div class="card-image">
      <a href="member${member.id}.html" target="_blank">
        <div class='slide active'><img src='images/photo${member.id}_1.jpg'></div>
        <div class='slide'><img src='images/photo${member.id}_2.jpg'></div>
        <div class='slide'><img src='images/photo${member.id}_3.jpg'></div>
        <div class='slide'><img src='images/photo${member.id}_4.jpg'></div>
      </a>
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
