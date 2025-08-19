import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/server.ts'],
  outDir: 'dist',
  tsconfig: './tsconfig.build.json', // Use build-specific tsconfig
  sourcemap: true,
  clean: true,
  format: ['esm'], // Ensure you're targeting CommonJS
  dts: false, // Skip DTS generation to avoid external import issues // Ensure you're targeting CommonJS
  external: [
    'dotenv', // Externalize dotenv to prevent bundling
    'fs', // Externalize fs to use Node.js built-in module
    'path', // Externalize other built-ins if necessary
    'https',
    'http',
    'zod',
    'events',
    'express',
    'cors',
    'uuid',
    'crypto',
    'stream',
    'util',
    'url',
    'querystring',
    'buffer',
    'os',
    'child_process',
    'cluster',
    'dgram',
    'dns',
    'net',
    'readline',
    'repl',
    'tls',
    'tty',
    'v8',
    'vm',
    'worker_threads',
    'zlib'
  ],
  noExternal: ['@elizaos/core'],
});
