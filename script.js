const colorPicker = document.getElementById("colorPicker");
const colorDisplay = document.getElementById("colorDisplay");
const rgbValue = document.getElementById("rgbValue");
const hexValue = document.getElementById("hexValue");
const hslValue = document.getElementById("hslValue");
const copyBtn = document.getElementById("copyBtn");
const mainBody = document.getElementById("mainBody");

colorPicker.addEventListener("input", (e) => {
  const hex = e.target.value;

  colorDisplay.style.backgroundColor = hex;
  mainBody.style.backgroundColor = hex;
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  rgbValue.textContent = `RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  hexValue.textContent = `HEX: ${hex}`;
  hslValue.textContent = `HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  copyBtn.textContent = "Copy RGB";
});

copyBtn.addEventListener("click", () => {
  const textToCopy = rgbValue.textContent.split(": ")[1];
  navigator.clipboard.writeText(textToCopy);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy RGB"), 1500);
});

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }
  return {
    h,
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
