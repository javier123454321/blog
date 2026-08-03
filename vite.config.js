import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

const { resolve } = require('path');
const fs = require('fs');

function addSection(input, section) {
  input[section] = resolve(__dirname, '_site', section, 'index.html');
  const paths = fs
    .readdirSync('src/' + section, { withFileTypes: false })
    .filter(function isNotAFileType(dir) {
      return dir.search('.html') === -1;
    });
  paths.forEach((element) => {
    element = element.split('.')[0];
    input[section + '/' + element] = resolve(
      __dirname,
      '_site',
      section,
      element,
      'index.html',
    );
  });
}

function generateInputOption() {
  let input = {
    404: resolve(__dirname, '_site', '404.html'),
    links: resolve(__dirname, '_site', 'links', 'index.html'),
    main: resolve(__dirname, '_site', 'index.html'),
  };
  addSection(input, 'blog');
  addSection(input, 'projects');
  console.log(input)
  return input;
}
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    root: '_site',
    server: {
      host: true,
      port: 5178,
      strictPort: true,
    },
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: generateInputOption(),
      },
      emptyOutDir: true,
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'well-known/nostr.json',
            dest: '.well-known'
          },
        ]
      })
    ]
  }
});
