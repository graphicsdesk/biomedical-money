import enterView from 'enter-view';
import textBalancer from 'text-balancer';

import { USE_COVER_HED } from '../config.yml';

// Fade in navbar at scroll trigger

const navbar = document.getElementById('navbar');
enterView({
  selector: USE_COVER_HED ? '.headline' : '.step-deck',
  offset: USE_COVER_HED ? 0.85 : 0.957,
  enter: () => navbar.classList.remove('only-logo'),
  exit: () => navbar.classList.add('only-logo'),
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
  console.log(playbackRate)
  let frameNumber = window.pageYOffset;
  if (frameNumber < coverHeight) {
     frameNumber /= playbackRate;
    if (frameNumber !== video.currentTime)
      video.currentTime = frameNumber;
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
