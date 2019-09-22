import enterView from 'enter-view';
import textBalancer from 'text-balancer';

import config from '../config.yml';

// Fade in navbar at scroll trigger

const navbar = document.getElementById('navbar');
navbar.style.opacity = 0;
enterView({
  selector: config.USE_COVER_HED ? '.headline' : '.step-deck',
  offset: config.USE_COVER_HED ? 0.88 : 0.9,
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

let coverHeight = null;

function scrollPlay() {
  let frameNumber = window.pageYOffset;
  if (frameNumber < coverHeight) {
     frameNumber /= PLAYBACK;
    if (frameNumber !== vid.currentTime) {
      vid.currentTime = frameNumber;
      console.log(window.pageYOffset)
    }
  }
  window.requestAnimationFrame(scrollPlay);
}

function updateCoverHeight() {
  coverHeight = document.getElementById('deck-overlay').getBoundingClientRect().height;
}

window.requestAnimationFrame(scrollPlay);

updateCoverHeight();
window.addEventListener('resize', updateCoverHeight);

// Text balance headline and deck

textBalancer.balanceText('.headline, .deck');