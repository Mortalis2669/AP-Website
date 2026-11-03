const grid = document.querySelector("#prime-grid");
const slider = document.querySelector("#grid-size");
const sizeValue = document.querySelector("#grid-size-value");
const countLabel = document.querySelector("#prime-count");
const selectedNumber = document.querySelector("#selected-number");
const selectedNote = document.querySelector("#selected-note");
let selectedCell = null;

function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d <= Math.sqrt(n); d++) if (n % d === 0) return false;
  return true;
}

function describeNumber(n) {
  if (n === 1) return "1 is neither prime nor composite.";
  if (isPrime(n)) return `${n} is prime — its only positive divisors are 1 and itself.`;
  let factor = 2;
  while (n % factor !== 0) factor++;
  return `${n} is composite — for example, ${factor} × ${n / factor} = ${n}.`;
}

function renderGrid(size) {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
  let primeCount = 0;
  const fragment = document.createDocumentFragment();

  for (let n = 1; n <= size * size; n++) {
    const prime = isPrime(n);
    if (prime) primeCount++;
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "prime-cell" + (prime ? " is-prime" : "") + (n === 1 ? " is-one" : "");
    cell.textContent = n;
    cell.setAttribute("aria-label", `${n}${prime ? ", prime" : n === 1 ? ", neither prime nor composite" : ", composite"}`);
    cell.addEventListener("click", () => {
      if (selectedCell) selectedCell.classList.remove("is-selected");
      selectedCell = cell;
      cell.classList.add("is-selected");
      selectedNumber.textContent = `NUMBER ${n}`;
      selectedNote.textContent = describeNumber(n);
    });
    fragment.appendChild(cell);
  }
  grid.appendChild(fragment);
  sizeValue.textContent = `${size} × ${size}`;
  countLabel.textContent = `PRIMES: ${primeCount}`;
  selectedCell = null;
  selectedNumber.textContent = "SELECT A NUMBER";
  selectedNote.textContent = "tap a cell to inspect it ↗";
}

slider.addEventListener("input", event => renderGrid(Number(event.target.value)));
document.querySelector("#year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

renderGrid(Number(slider.value));
