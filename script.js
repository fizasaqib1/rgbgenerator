const colorDisplay = document.getElementById("colorDisplay");
const rgbValue = document.getElementById("rgbValue");
const hexValue = document.getElementById("hexValue");
const hslValue = document.getElementById("hslValue");
const copyBtn = document.getElementById("copyBtn");
const mainBody = document.getElementById("mainBody");

const pickr = Pickr.create({
  el: '#colorPicker',
  theme: 'classic',
  default: '#ffffff',
  components: {
    preview: true,
    opacity: false,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      input: true
    }
  }
});

pickr.on('change', (color) => {
  const hex = color.toHEXA().toString();
  const rgba = color.toRGBA();
  const r = Math.round(rgba[0]);
  const g = Math.round(rgba[1]);
  const b = Math.round(rgba[2]);

  colorDisplay.style.backgroundColor = hex;
  mainBody.style.backgroundColor = hex;

  const hsl = rgbToHsl(r, g, b);

  rgbValue.textContent = `RGB: rgb(${r}, ${g}, ${b})`;
  hexValue.textContent = `HEX: ${hex}`;
  hslValue.textContent = `HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  copyBtn.textContent = "Copy RGB";
});

// Copy button
copyBtn.addEventListener("click", () => {
  const textToCopy = rgbValue.textContent.split(": ")[1];
  navigator.clipboard.writeText(textToCopy);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy RGB"), 1500);
});

// RGB to HSL conversion
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if(max === min){
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h = Math.round(h * 60);
  }
  return { h, s: Math.round(s*100), l: Math.round(l*100) };
}
