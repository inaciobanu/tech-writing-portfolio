// Regenerates static/img/favicon.png and static/img/og-image.png from their
// editable SVG sources in assets/social/. Run after editing either source:
//
//   npm run gen-social-images

const sharp = require('sharp');
const path = require('path');

const jobs = [
  { src: 'assets/social/favicon.svg', out: 'static/img/favicon.png', size: [48, 48] },
  { src: 'assets/social/og-image.svg', out: 'static/img/og-image.png', size: [1200, 630] },
];

(async () => {
  for (const job of jobs) {
    await sharp(path.resolve(job.src))
      .resize(...job.size)
      .png()
      .toFile(path.resolve(job.out));
    console.log(`Generated ${job.out}`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
