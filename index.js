const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const Bundler = require('parcel-bundler');

const LOCALS_FILLER_STR = 'BODY_LOCALS';
const PH_CONFIG = `{
  "plugins": {
    "posthtml-include": {
      "root": "./src"
    },
    "posthtml-expressions": {
      "root": "./src/partials",
      "locals": ${LOCALS_FILLER_STR}
    }
  }
}`;

const entryFiles = path.join(__dirname, './src/index.html');
const options = {
  global: 'script',
};

(async function() {

  // Initialize bundler
  const bundler = new Bundler(entryFiles, options);

  // Every time bundler starts, update doc content
  bundler.on('buildStart', () => {
    const { DOC_URL, USE_COVER_HED } = YAML.parse(fs.readFileSync('./config.yml').toString());

    const oldConfig = fs.readFileSync('.posthtmlrc').toString();

    // Generate new posthtml config from doc.json; update the old one if necessary
    const phConfig = PH_CONFIG.replace(
      LOCALS_FILLER_STR,
      JSON.stringify({
        ...JSON.parse(fs.readFileSync('./data/doc.json', 'utf8')),
        DOC_URL,
        USE_COVER_HED,
      })
    );
    if (phConfig !== oldConfig)
      fs.writeFileSync('.posthtmlrc', phConfig);
  });

  // Run the bundler and start the server
  bundler.serve();
})();
