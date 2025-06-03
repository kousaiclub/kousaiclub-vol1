function generateMemberListPages_ver1_3_20250519_1245() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("会員データ");
  const data = sheet.getDataRange().getValues();

  const folder = DriveApp.getFolderById("1-gUaf8cYe5PV90LY4XdMiDK-8oh0d19E");
  const members = data.slice(1).filter(row => row[3] !== "");  // 会員No（D列）ありの行

  const cardsPerPage = 32;
  const totalPages = Math.ceil(members.length / cardsPerPage);

  for (let p = 0; p < totalPages; p++) {
    const pageMembers = members.slice(p * cardsPerPage, (p + 1) * cardsPerPage);
    let html = <!DOCTYPE html><html lang="ja"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>members_list - Page ${p + 1}</title>
<link rel="icon" href="images/logo_1.png" type="image/png">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap" rel="stylesheet">
<style>
body { margin:0;padding:0;background:#1c1c1c;color:#f9f9f9;font-family:'Cormorant Garamond',serif;font-size:14px;line-height:1.8; }
.nav-container { display:flex;align-items:center;justify-content:space-between;background:#0009;padding:5px 20px; }
.nav-logo img { height:50px;filter:brightness(90%) drop-shadow(0 1px 1px #ccc); }
.nav-links { display:flex;gap:20px; }
.nav-links a { color:#f0f0f0;text-decoration:none; }
.hamburger { display:none;flex-direction:column;cursor:pointer; }
.hamburger span { height:3px;width:25px;background:#f9f9f9;margin:4px 0; }
@media (max-width:768px) {
  .nav-links { display:none;flex-direction:column;width:100%;position:absolute;top:60px;left:0;background:#000;padding:15px; }
  .nav-links.active { display:flex; }
  .hamburger { display:flex; }
}
.banner { background:url('images/banner_3.png') no-repeat center center;background-size:cover;height:340px; }
.search-link-wrapper { text-align:center;margin:20px 0; }
.search-button { padding:10px 20px;background:#f9f9f9;color:#1c1c1c;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px; }
.card-container { display:flex;flex-wrap:wrap;justify-content:flex-start;gap:1%;padding:20px; }
.card { width:22%;background:#1c1c1c;border:1px solid #f9f9f9;border-radius:12px;margin-bottom:20px;overflow:hidden; }
.card-image { position:relative;aspect-ratio:3/4;overflow:hidden;cursor:pointer; }
.slide { position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity 0.6s ease-in-out; }
.slide.active { opacity:1; }
.slide img { width:100%;height:100%;object-fit:cover; }
.card-text { padding:8px;text-align:center; }
.favorite-btn { font-size:18px;color:#FF69B4;cursor:pointer; }
.comment { display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis; }
.pagination { text-align:center;margin:20px; }
.pagination a { color:#f9f9f9;padding:6px 12px;border:1px solid #f9f9f9;border-radius:6px;margin:0 5px;text-decoration:none; }
.pagination a.current { background:#f9f9f9;color:#1c1c1c;font-weight:bold; }
@media (max-width:768px) { .card { width:48%; } }
</style></head><body>
<header class="nav-container">
  <div class="nav-logo"><a href="top.html"><img src="images/logo_1.png" alt="PRIVATE SHIROKANE"></a></div>
  <nav class="nav-links" id="navLinks">
    <a href="index.html">Home</a><a href="top.html">Top</a>
    <a href="guidance_men.html">男性会員入会</a><a href="guidance_women.html">女性会員入会</a>
    <a href="system.html">料金・システム</a><a href="pickup_member.html">注目会員様情報</a>
    <a href="members_only.html">会員専用Page</a><a href="contact.html">お問合せ</a>
  </nav>
  <div class="hamburger" onclick="document.getElementById('navLinks').classList.toggle('active')"><span></span><span></span><span></span></div>
</header>
<div class="banner"></div>
<div class="search-link-wrapper"><a href="search_result.html" class="search-button">会員検索はこちら</a></div>
<div class="card-container">
;

    for (const row of pageMembers) {
      const no = row[3];
      const name = row[4];
      const age = row[19];
      const height = row[9];
      const bust = row[5], cup = row[6], waist = row[7], hip = row[8];
      const comment = row[16] || "";

      let slides = "";
      for (let i = 1; i <= 4; i++) {
        const imagePath = images/photo${no}_${i}.jpg;
        slides += <div class='slide${i === 1 ? " active" : ""}'><img src='${imagePath}'></div>;
      }

      html += 
<div class="card">
  <div class="card-image" onclick="window.open('member${no}.html', '_blank')">
    ${slides}
  </div>
  <div class="card-text">
    <p><strong>No.</strong> ${no} ${name}</p>
    <p>${height}cm (${age}歳)</p>
    <p>${bust}cm, ${waist}cm, ${hip}cm, ${cup}カップ</p>
    <p class="comment">${comment}</p>
<p><span class="favorite-btn" data-id="${no}">♡</span></p>
  </div>
</div>;
    }


    html += </div><div class="pagination">;
    for (let i = 0; i < totalPages; i++) {
      const pageName = i === 0 ? "member_list.html" : member_list_page${i + 1}.html;
      const activeClass = i === p ? "current" : "";
      html += <a href="${pageName}" class="${activeClass}">${i + 1}</a>;
    }

    html += </div><script>
document.querySelectorAll('.card-image').forEach(container => {
  const slides = Array.from(container.querySelectorAll('.slide'));
  if (slides.length <= 1) return;
  let idx = 0;
  slides[0].classList.add('active');
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 3000);
});
document.querySelectorAll('.favorite-btn').forEach(btn => {
  const id = btn.dataset.id;
  if (localStorage.getItem('fav-' + id)) btn.textContent = '❤️';
  btn.addEventListener('click', () => {
    if (localStorage.getItem('fav-' + id)) {
      localStorage.removeItem('fav-' + id);
      btn.textContent = '♡';
    } else {
      localStorage.setItem('fav-' + id, '1');
      btn.textContent = '❤️';
    }
  });
});
</script></body></html>;

    const fileName = p === 0 ? "member_list.html" : member_list_page${p + 1}.html;
    folder.createFile(fileName, html, MimeType.HTML);
  }
}
