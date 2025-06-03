// scripts/search.js（完全版：GitHubコピペ対応）

document.addEventListener("DOMContentLoaded", () => {
  fetch("members.json")
    .then((response) => response.json())
    .then((data) => {
      const searchParams = new URLSearchParams(window.location.search);
      const keyword = searchParams.get("keyword") || "";
      const area = searchParams.get("area") || "";
      const age = searchParams.get("age") || "";
      const size = searchParams.get("size") || "";
      const filteredMembers = filterMembers(data, { keyword, area, age, size });
      renderResults(filteredMembers);
    });
});

function filterMembers(members, filters) {
  return members.filter((member) => {
    const matchKeyword =
      !filters.keyword ||
      member.name.includes(filters.keyword) ||
      member.comment.includes(filters.keyword);
    const matchArea = !filters.area || member.area === filters.area;
    const matchAge = !filters.age || member.age.toString() === filters.age;
    const matchSize = !filters.size || member.size === filters.size;
    return matchKeyword && matchArea && matchAge && matchSize;
  });
}

function renderResults(members) {
  const container = document.getElementById("resultsContainer");
  const noResults = document.getElementById("noResults");
  container.innerHTML = "";

  if (!members || members.length === 0) {
    noResults.style.display = "block";
    return;
  } else {
    noResults.style.display = "none";
  }

  members.forEach((member) => {
    const card = document.createElement("div");
    card.className = "card";

    const slideshow = document.createElement("div");
    slideshow.className = "slideshow";
    for (let i = 1; i <= 4; i++) {
      const img = document.createElement("img");
      img.src = `images/photo${member.id}_${i}.jpg`;
      img.alt = `${member.name}の写真${i}`;
      if (i === 1) img.classList.add("active");
      slideshow.appendChild(img);
    }
    card.appendChild(slideshow);

    const textBlock = document.createElement("div");
    textBlock.className = "card-text";
    textBlock.innerHTML = `
      <p><strong>${member.name}</strong></p>
      <p>${member.age}歳／${member.size}／${member.area}</p>
      <p>${member.job}</p>
      <p class="comment">${member.comment}</p>
    `;
    card.appendChild(textBlock);

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "&#10084;";
    heart.addEventListener("click", () => {
      heart.classList.toggle("active");
    });
    card.appendChild(heart);

    container.appendChild(card);
  });
}
