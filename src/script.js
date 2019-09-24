import enterView from 'enter-view';
import textBalancer from 'text-balancer';

import { USE_COVER_HED } from '../config.yml';

// Fade in navbar at scroll trigger

const navbar = document.getElementById('navbar');
navbar.classList.add('only-logo');
enterView({
  selector: USE_COVER_HED ? '.headline' : '.step-deck',
  offset: USE_COVER_HED ? 0.85 : 0.9,
  enter: () => navbar.classList.remove('only-logo'),
  exit: () => navbar.classList.add('only-logo'),
});

// Mobile navbar hamburger trigger

export function hamburgerTrigger() {
  navbar.classList.toggle('show-nav-links');
}

// Play scroll video

const PLAYBACK = 400;
const vid = document.getElementById('video-cover');

let coverHeight = null;

function scrollPlay() {
  let frameNumber = window.pageYOffset;
  if (frameNumber < coverHeight) {
     frameNumber /= PLAYBACK;
    if (frameNumber !== vid.currentTime)
      vid.currentTime = frameNumber;
  }
  window.requestAnimationFrame(scrollPlay);
}

function updateCoverHeight() {
  coverHeight = document.getElementById('deck-overlay').getBoundingClientRect().height;
}

window.requestAnimationFrame(scrollPlay);

if (!USE_COVER_HED) {
  updateCoverHeight();
  window.addEventListener('resize', updateCoverHeight);
}

// Text balance headline and deck

textBalancer.balanceText('.headline, .deck');