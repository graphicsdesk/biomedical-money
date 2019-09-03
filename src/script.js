import enterView from 'enter-view';
import textBalancer from 'text-balancer';

import config from '../config.yml';

// Fade in navbar at scroll trigger

const navbar = document.getElementById('navbar');
navbar.style.opacity = 0;
enterView({
  selector: '.headline',
  offset: config.USE_COVER_HED ? 0.88 : 0.75,
  enter: () => navbar.style.opacity = 1,
  exit: () => navbar.style.opacity = 0,
});

// Mobile navbar hamburger trigger

export function hamburgerTrigger() {
  navbar.classList.toggle('show-nav-links');
}

// Play scroll video

const PLAYBACK = 200;
const vid = document.getElementById('video-cover');

function scrollPlay() {  
  var frameNumber  = window.pageYOffset / PLAYBACK;
  vid.currentTime  = frameNumber;
  window.requestAnimationFrame(scrollPlay);
}

window.requestAnimationFrame(scrollPlay);

// Text balance headline and deck

textBalancer.balanceText('.headline, .deck');