// docusaurus-plugin-openapi-docs writes docs/api/reference/sidebar.ts from
// openapi/payflow.yaml on every `gen-api-docs` run. sidebars.js can't
// `require()` that file directly: CI (deploy.yml, pr-preview.yml) pins
// Node 20, which has no native TypeScript support, so the require would
// crash there even though it happens to work on newer local Node versions.
// This converts the plugin's fixed output template into plain CommonJS so
// sidebars.js can require it on any supported Node version.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'docs', 'api', 'reference', 'sidebar.ts');
const DEST = path.join(__dirname, '..', 'docs', 'api', 'reference', 'sidebar.generated.js');

const IMPORT_LINE = 'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";\n\n';
const TYPE_ANNOTATION = ': SidebarsConfig';
const EXPORT_LINE = 'export default sidebar.apisidebar;';

const src = fs.readFileSync(SRC, 'utf8');

if (!src.includes(IMPORT_LINE) || !src.includes(TYPE_ANNOTATION) || !src.includes(EXPORT_LINE)) {
  throw new Error(
    `${SRC} doesn't match the docusaurus-plugin-openapi-docs template this script expects. ` +
      'The plugin format may have changed — update scripts/build-api-sidebar.js.'
  );
}

const js = src
  .replace(IMPORT_LINE, '')
  .replace(TYPE_ANNOTATION, '')
  .replace(EXPORT_LINE, 'module.exports = sidebar.apisidebar;');

fs.writeFileSync(DEST, js, 'utf8');
console.log(`Wrote ${path.relative(process.cwd(), DEST)}`);
