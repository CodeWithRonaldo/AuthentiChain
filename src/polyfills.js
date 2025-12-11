import { Buffer } from 'buffer';

// Explicitly polyfill global object
if (typeof global === 'undefined') {
  window.global = window;
}

// Explicitly polyfill Buffer
if (typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer;
}

// Basic process polyfill for some libs
if (typeof window.process === 'undefined') {
  window.process = { env: {} };
}
