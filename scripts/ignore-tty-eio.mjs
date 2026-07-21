#!/usr/bin/env node
/**
 * Prevents Vite/readline from crashing when the TTY goes away
 * (EIO / EPIPE — common in macOS terminals + Node 22/24).
 */
import readline from 'node:readline';

const swallow = (err) => {
  const code = err && err.code;
  return code === 'EIO' || code === 'EPIPE' || code === 'ERR_STREAM_DESTROYED';
};

for (const stream of [process.stdin, process.stdout, process.stderr]) {
  if (stream && typeof stream.on === 'function') {
    stream.on('error', (err) => {
      if (!swallow(err)) throw err;
    });
  }
}

const originalCreateInterface = readline.createInterface.bind(readline);
readline.createInterface = (...args) => {
  const rl = originalCreateInterface(...args);
  rl.on('error', (err) => {
    if (!swallow(err)) throw err;
  });
  return rl;
};
