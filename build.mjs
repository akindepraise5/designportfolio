// Build the site.
//
//   npm run build:site      one-off build
//   npm run watch:site      rebuild on change
//
// Produces two files, both committed so the deploy stays a plain static one:
//   assets/app.js        React + the app, bundled and minified
//   assets/tailwind.css  only the classes this project actually uses
//
// This replaced an in-browser toolchain: Babel Standalone compiled ~350KB of
// JSX on every visit, and the Tailwind Play CDN generated the stylesheet at
// runtime after React had already rendered. Both are build-time concerns.
import { build, context } from 'esbuild';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import process from 'node:process';

const run = promisify(execFile);
const watch = process.argv.includes('--watch');
// fileURLToPath, not manual parsing: this directory name contains a space,
// which import.meta.url percent-encodes.
const root = path.dirname(fileURLToPath(import.meta.url));

const kb = async (file) => Math.round((await stat(path.join(root, file))).size / 1024);

const jsOptions = {
  entryPoints: [path.join(root, 'src/app.jsx')],
  outfile: path.join(root, 'assets/app.js'),
  bundle: true,
  format: 'esm',
  target: ['es2020'],
  jsx: 'automatic',
  minify: !watch,
  sourcemap: watch,
  legalComments: 'none',
  define: { 'process.env.NODE_ENV': watch ? '"development"' : '"production"' },
  logLevel: 'info'
};

const buildCss = async () => {
  // Run the CLI's JS entry through node rather than the .bin shim: on Windows
  // that shim is a .cmd, and spawning it without a shell fails with EINVAL.
  const cli = path.join(root, 'node_modules', 'tailwindcss', 'lib', 'cli.js');
  await run(process.execPath, [
    cli,
    '-c', path.join(root, 'tailwind.config.js'),
    '-i', path.join(root, 'src/tailwind.css'),
    '-o', path.join(root, 'assets/tailwind.css'),
    ...(watch ? [] : ['--minify'])
  ], { cwd: root });
};

if (watch) {
  const ctx = await context(jsOptions);
  await ctx.watch();
  await buildCss();
  console.log('watching src/app.jsx — rerun the css step manually after adding new classes');
} else {
  await build(jsOptions);
  await buildCss();
  console.log(`\n  assets/app.js        ${await kb('assets/app.js')} KB`);
  console.log(`  assets/tailwind.css  ${await kb('assets/tailwind.css')} KB`);
}
