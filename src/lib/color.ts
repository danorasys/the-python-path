function luminance(hex: string): number {
  const channels = [1, 3, 5].map((offset) => {
    const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const [r = 0, g = 0, b = 0] = channels;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function readableTextColor(background: string): "#000000" | "#ffffff" {
  const bg = luminance(background);
  const contrastWithBlack = (bg + 0.05) / 0.05;
  const contrastWithWhite = 1.05 / (bg + 0.05);
  return contrastWithBlack >= contrastWithWhite ? "#000000" : "#ffffff";
}
