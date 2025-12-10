import { Buffer } from 'buffer';

// Explicitly polyfill global object for libraries that expect it (like some Solana deps)
if (typeof global === 'undefined') {
  window.global = window;
}

// Explicitly polyfill Buffer
if (typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer;
}
