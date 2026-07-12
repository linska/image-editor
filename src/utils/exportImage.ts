import type { CropOperation } from "../types/cropper";
import { downloadBlob } from "./download.ts";

type ImageEffects = {
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: number;
  sepia: number;
  invert: number;
};

type RenderImageOptions = {
  sourceUrl: string;
  crop: CropOperation | null;
  effects: ImageEffects;
};

function loadImage(sourceUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = sourceUrl;
  });
}

function createFilterString(effects: ImageEffects): string {
  return [
    `brightness(${100 + effects.brightness}%)`,
    `contrast(${100 + effects.contrast}%)`,
    `saturate(${100 + effects.saturation}%)`,
    `grayscale(${effects.grayscale}%)`,
    `sepia(${effects.sepia}%)`,
    `invert(${effects.invert}%)`,
  ].join(" ");
}

export async function renderEditedImage({
  sourceUrl,
  crop,
  effects,
}: RenderImageOptions): Promise<HTMLCanvasElement> {
  const image = await loadImage(sourceUrl);

  const sourceX = crop ? crop.x * image.naturalWidth : 0;
  const sourceY = crop ? crop.y * image.naturalHeight : 0;

  const sourceWidth = crop
    ? crop.width * image.naturalWidth
    : image.naturalWidth;

  const sourceHeight = crop
    ? crop.height * image.naturalHeight
    : image.naturalHeight;

  const canvas = document.createElement("canvas");

  canvas.width = Math.max(1, Math.round(sourceWidth));
  canvas.height = Math.max(1, Math.round(sourceHeight));

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D context is not available");
  }

  context.filter = createFilterString(effects);

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  return canvas;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = "image/png",
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("Failed to create image blob"));
      },
      type,
      quality,
    );
  });
}

export async function downloadEditedImage(
  options: RenderImageOptions,
  filename = "edited-image.png",
): Promise<void> {
  const canvas = await renderEditedImage(options);
  const blob = await canvasToBlob(canvas);

  downloadBlob(blob, filename);
}
