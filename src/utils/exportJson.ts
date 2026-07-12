import { downloadBlob } from "./download.ts";

export function downloadJson(data: unknown, filename = "operations.json") {
  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  downloadBlob(blob, filename);
}
