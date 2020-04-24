import enterView from 'enter-view';
import textBalancer from 'text-balancer';

import { USE_COVER_HED } from '../config.yml';

// Fade in navbar at scroll trigger

const navbar = document.getElementById('navbar');
enterView({
  selector: USE_COVER_HED ? '.headline' : '.step-deck',
  offset: USE_COVER_HED ? 0.85 : 0.957,
  enter: () => {
    navbar.classList.remove('only-logo');
  },
  exit: () => {    
    navbar.classList.remove('show-nav-links');
    navbar.classList.add('only-logo');
  },
});

enterView({
  selector: '#overlay',
  offset: 0.98,
  enter: () => document.getElementById('overlay').style.opacity = 1,
  exit: () => document.getElementById('overlay').style.opacity = 0,
  // once: true,
});

// Mobile navbar hamburger trigger

export function hamburgerTrigger() {
  navbar.classList.toggle('show-nav-links');
}

// Play scroll video

const deckOverlay = document.getElementById('step-deck');
const deckSteps = document.getElementsByClassName('video-step');
const deckStep = deckSteps[ deckSteps.length - 1 ];
const video = document.getElementById('video-cover');

let playbackRate = 500; // set a default
video.addEventListener('loadedmetadata', () => playbackRate = (deckOverlay.getBoundingClientRect().height - deckStep.getBoundingClientRect().height / 2) / video.duration);

let coverHeight = null;

function scrollPlay() {
  let frameNumber = window.pageYOffset;
  if (frameNumber < coverHeight) {
     frameNumber /= playbackRate;
    if (frameNumber !== video.currentTime && frameNumber <= video.duration) {
      video.currentTime = frameNumber;
    }
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

textBalancer.balanceText('.headline, .deck, .image-overlay .image-caption');

/* SVG icon stuff

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.29 12.3"><defs><style>.cls-1{fill:none;stroke:#999;stroke-miterlimit:10;}</style></defs><title>icon-close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line class="cls-1" x1="0.39" y1="0.32" x2="9.9" y2="11.99"/><line class="cls-1" x1="0.39" y1="11.99" x2="9.9" y2="0.32"/></g></g></svg>`;
const svg64 = window.btoa(svg);
console.log(`url('data:image/svg+xml;base64,${svg64}')`);

*/
