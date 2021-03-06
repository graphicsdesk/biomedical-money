import enterView from 'enter-view';
import textBalancer from 'text-balancer';
import './scripts/page';

import { spectate as spectateConfig } from '../package.json';
const { USE_NEWS_NAV, USE_EYE_NAV, USE_COVER_HED } = spectateConfig;

// Fade in navbar at scroll trigger

const navbar = document.getElementById('navbar');

if (USE_NEWS_NAV || USE_EYE_NAV || USE_COVER_HED) {
  enterView({
    selector: '.headline',
    offset: 1,
    enter: () => {
      navbar.classList.remove('only-eye-logo');
      navbar.classList.remove('hide-news-navbar');
    },
    exit: () => {
      navbar.classList.remove('show-nav-links');
      navbar.classList.add('only-eye-logo');
      navbar.classList.add('hide-news-navbar');
    },
  });
}

enterView({
  selector: '#overlay',
  offset: 0.98,
  enter: () => document.getElementById('overlay').style.opacity = 1,
  exit: () => document.getElementById('overlay').style.opacity = 0,
  // once: true,
});

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

// Mobile navbar hamburger trigger

export function hamburgerTrigger() {
  navbar.classList.toggle('show-nav-links');
}

// Text balance headline, deck, and image captions

if (window.innerWidth <= 460) {
  textBalancer.balanceText('.headline, .deck, .image-caption-text');
}
