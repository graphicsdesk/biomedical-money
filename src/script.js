import enterView from 'enter-view';

const navbar = document.getElementById('navbar');

enterView({
  selector: '.headline',
  enter: () => navbar.style.opacity = 1,
  exit: () => navbar.style.opacity = 0,
  offset: 0.9,
});