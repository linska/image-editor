# Image Editor

A simple browser-based image editor built with Vue 3.

## Features

- Upload image
- Crop image
- Live adjustments
    - Brightness
    - Contrast
    - Saturation
- Filters
    - Grayscale
    - Sepia
    - Invert
- Non-destructive editing
- Reset to original
- Export edited image
- Export editing operations as JSON

## Tech Stack

- Vue 3
- TypeScript
- Pinia
- Vuetify 3
- Cropper.js

## Getting started

```bash
yarn
yarn dev
```

or

```bash
npm install
npm run dev
```

## Design decisions

The editor keeps the original image unchanged. All edits are stored as operations (crop, adjustments and filters), while the preview is derived from the original image.

Crop coordinates are stored in normalized form (0–1) so they can be applied to the original image regardless of its displayed size.

The exported JSON contains only editing operations. Replaying those operations on the original image reproduces the same result.

## Trade-offs

During crop mode, color adjustments are temporarily not applied to the Cropper.js preview. This keeps the crop interaction simple and avoids coupling editor filters with Cropper.js internal rendering. Once cropping is applied, all adjustments are shown again in the preview.