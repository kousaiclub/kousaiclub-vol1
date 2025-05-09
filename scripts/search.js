document.addEventListener("DOMContentLoaded", () => {
  const fillOptions = (id, from, to, step = 1, suffix = "") => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = "<option value=''></option>";
    for (let i = from; i <= to; i += step) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${i}${suffix}`;
      select.appendChild(opt);
    }
  };

  fillOptions("ageFrom", 20, 49, 5);
  fillOptions("ageTo", 20, 49, 5);
  fillOptions("heightFrom", 140, 179, 5);
  fillOptions("heightTo", 140, 179, 5);
  fillOptions("bustFrom", 70, 99, 5);
  fillOptions("bustTo", 70, 99, 5);
  fillOptions("waistFrom", 50, 90, 5);
  fillOptions("waistTo", 50, 90, 5);
  fillOptions("hipFrom", 70, 99, 5);
  fillOptions("hipTo", 70, 99, 5);

  const fillCup = (id) => {
    const select = document.getElementById(id);
    if (!select) return;
    const cups =
