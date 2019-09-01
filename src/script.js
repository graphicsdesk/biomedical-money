import enterView from 'enter-view';
import textBalancer from 'text-balancer';

const navbar = document.getElementById('navbar');

enterView({
  selector: '.headline',
  enter: () => navbar.style.opacity = 1,
  exit: () => navbar.style.opacity = 0,
  offset: 0.85,
});

textBalancer.balanceText('.headline, .deck');
