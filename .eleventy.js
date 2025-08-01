const fs = require('fs');

module.exports = function (eleventyConfig) {

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  // Static assets to pass through
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/public');
  eleventyConfig.addPassthroughCopy('./src/styles');
  eleventyConfig.addPassthroughCopy('./src/well-known');
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addCollection("filteredBySociety", function (collectionApi) {
    const collection = collectionApi.getAll().filter(function filterNonSociety(item) {
      return item.data.topics.includes('society')
    })
    return collection
  });
  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    passthroughFileCopy: true,
    templateFormats: ['html', 'md', 'liquid'],
    htmlTemplateEngine: 'liquid',
    dataTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};
