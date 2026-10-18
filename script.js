const header = document.getElementById('header');
const toggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.nav a')];
const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.card')];
const search = document.getElementById('search');
const status = document.getElementById('status');
let category = 'all';
function closeNav() {
  if (!header || !toggle) return;
  header.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
}
if (header && toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navLinks.forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNav(); });
  window.addEventListener('resize', () => { if (window.matchMedia('(min-width: 761px)').matches) closeNav(); });
}
function updateMenu() {
  const query = (search?.value || '').trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matches = (category === 'all' || card.dataset.category === category) &&
      (!query || (card.dataset.name + ' ' + card.textContent).toLowerCase().includes(query));
    card.hidden = !matches;
    if (matches) visible++;
  });
  if (status) status.textContent = visible
    ? (query ? 'Found ' + visible + ' menu item' + (visible === 1 ? '' : 's') : 'Showing ' + visible + ' menu favourites')
    : 'No bites found. Try another search or category.';
}
filters.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.filter;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  updateMenu();
}));
if (search) search.addEventListener('input', updateMenu);
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
