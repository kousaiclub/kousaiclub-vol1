<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>members_list - PRIVATE SHIROKANE</title>
  <link rel="icon" href="images/logo_1.png" type="image/png" />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap" rel="stylesheet" />
  <script src="scripts/search.js" defer></script>
  <style>
    body { background-color: #1c1c1c; color: #f9f9f9; font-family: 'Cormorant Garamond', serif; margin: 0; padding: 0; font-size: 14px; }
    .card-container, .search-results { display: flex; flex-wrap: wrap; justify-content: flex-start; gap: 1%; padding: 20px; }
    .card { width: 22%; background-color: #1c1c1c; border: 1px solid #f9f9f9; border-radius: 12px; margin-bottom: 20px; overflow: hidden; }
    .card-image { position: relative; aspect-ratio: 3 / 4; overflow: hidden; cursor: pointer; }
    .card-image img { width: 100%; height: 100%; object-fit: cover; }
    .card-text { padding: 8px; text-align: center; line-height: 1.5; }
    .card-text .line1 { font-weight: bold; }
    .card-text .line2 { font-size: 13px; }
    .card-text .line3 { font-size: 12px; }
    .card-text .line4 { font-size: 12px; color: #ccc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .favorite-btn { font-size: 18px; color: #FF69B4; cursor: pointer; display: block; text-align: center; margin-top: 5px; }
    @media (max-width: 768px) { .card { width: 48%; } }
    .search-button { margin: 20px; padding: 10px 20px; font-size: 16px; background-color: #182a69; color: #fff; border: none; cursor: pointer; border-radius: 8px; }
    .modal { display: none; position: fixed; z-index: 99; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.8); }
    .modal-content { background-color: #2c2c2c; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 90%; max-width: 600px; color: #fff; border-radius: 10px; }
    .close { color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; }
    .search-form label { display: block; margin-top: 10px; }
    .search-form select, .search-form input[type="text"] { width: 100%; padding: 5px; margin-top: 5px; border-radius: 5px; border: none; }
  </style>
</head>
<body>
<header class="nav-container">
  <div class="nav-logo"><a href="top.html"><img src="images/logo_1.png" alt="PRIVATE SHIROKANE Logo" /></a></div>
  <nav class="nav-links" id="navLinks">
    <a href="index.html">Home</a><a href="top.html">Top</a><a href="guidance_men.html">男性会員入会</a><a href="guidance_women.html">女性会員入会</a><a href="system.html">料金・システム</a><a href="pickup_member.html">注目会員様情報</a><a href="members_only.html">会員専用Page</a><a href="contact.html">お問合せ</a>
  </nav>
  <div class="hamburger" onclick="toggleMenu()"><span></span><span></span><span></span></div>
</header>
<div class="banner"></div>
<button class="search-button" onclick="document.getElementById('searchModal').style.display='block'">Search</button>
<div id="searchModal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="document.getElementById('searchModal').style.display='none'">&times;</span>
    <h2>会員検索</h2>
    <form class="search-form">
      <label>年齢（From / To）<br><select id="ageFrom"></select> ～ <select id="ageTo"></select></label>
      <label>身長（From / To）<br><select id="heightFrom"></select> ～ <select id="heightTo"></select></label>
      <label>B（From / To）<br><select id="bustFrom"></select> ～ <select id="bustTo"></select></label>
      <label>W（From / To）<br><select id="waistFrom"></select> ～ <select id="waistTo"></select></label>
      <label>H（From / To）<br><select id="hipFrom"></select> ～ <select id="hipTo"></select></label>
      <label>Cup（From / To）<br><select id="cupFrom"></select> ～ <select id="cupTo"></select></label>
      <label>趣味（部分一致）<br><input type="text" id="hobby"></label>
    </form>
    <button type="button" id="searchSubmit" class="search-button">検索実行</button>
    <div class="search-results">※ここに結果が表示されます</div>
  </div>
</div>
<div class="card-container">
<!-- 会員カードはここに続きます -->
</div>
<script>
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}
window.onclick = function(event) {
  const modal = document.getElementById("searchModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
</script>
</body>
</html>
