const fs = require('fs');
const path = require('path');
const YAML = require('YAML');
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

const processData = data => {
  const SPACING = '    ';
  const { byline, credits } = data;
  data.bylineAndCredits = byline + SPACING + credits.split('\n').join(SPACING);
  return data;
};

(async function() {

  // Initialize bundler
  const bundler = new Bundler(path.join(__dirname, './src/index.html'));

  // Every time bundler starts, update doc content
  bundler.on('buildStart', () => {
    const { DOC_URL, USE_COVER_HED } = YAML.parse(fs.readFileSync(process.cwd() + '/config.yml').toString());

    const doc = processData({
      ...JSON.parse(fs.readFileSync('./data/doc.json', 'utf8')),
      DOC_URL,
      USE_COVER_HED,
    });
    const oldConfig = fs.readFileSync('.posthtmlrc').toString();

    // Generate new posthtml config from doc.json; update the old one if necessary
    const phConfig = PH_CONFIG.replace(LOCALS_FILLER_STR, JSON.stringify(doc));
    if (phConfig !== oldConfig)
      fs.writeFileSync('.posthtmlrc', phConfig);
  });

  // Run the bundler and start the server
  bundler.serve();
})();
