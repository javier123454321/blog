import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

const { resolve } = require('path');
const fs = require('fs');

function generateInputOption() {
  let input = {
    404: resolve(__dirname, '_site', '404.html'),
    links: resolve(__dirname, '_site', 'links', 'index.html'),
    main: resolve(__dirname, '_site', 'index.html'),
    blog: resolve(__dirname, '_site', 'blog', 'index.html'),
  };
  const paths = fs
    .readdirSync('src/blog', { withFileTypes: false })
    .filter(function isNotAFileType(dir) {
      return dir.search('.html') === -1;
    });
  paths.forEach((element) => {
    element = element.split('.')[0];
    input['blog/' + element] = resolve(
      __dirname,
      '_site',
      'blog',
      element,
      'index.html',
    );
  });
  console.log(input)
  return input;
}
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    root: '_site',
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
