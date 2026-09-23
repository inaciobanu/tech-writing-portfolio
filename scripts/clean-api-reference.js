// docusaurus-plugin-openapi-docs only writes docs/api/reference/sidebar.ts
// when that file doesn't already exist, so re-running `gen-api-docs` on top
// of a previous run silently keeps a stale sidebar (and leaves orphaned
// pages behind for any endpoint removed from openapi/payflow.yaml). Wiping
// the output directory first, every time, is what makes every generated
// page and the sidebar guaranteed to match the current spec.
const fs = require('fs');
const path = require('path');

fs.rmSync(path.join(__dirname, '..', 'docs', 'api', 'reference'), {
  recursive: true,
  force: true,
});
