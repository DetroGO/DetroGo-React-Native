// m3Colors.ts is the list of options available in the settings for material 3 colors (monet).

export const M3_COLORS = [
  { label: "Wallpaper", value: "system", icon: "palette-swatch" }, // **NECCESSARY**
  { label: "Metro Red", value: "#DA0000" },
  { label: "Metro Blue", value: "#0050A0" },
  { label: "Metro Green", value: "#00873E" },
  { label: "Metro Yellow", value: "#F5A800" },
  { label: "Metro Violet", value: "#7B2D8B" },
  { label: "Metro Pink", value: "#E91E63" },
  { label: "Metro Cyan", value: "#0097A7" },
  { label: "Metro Orange", value: "#E65100" },
] as const;

export type M3ColorValue = (typeof M3_COLORS)[number]["value"];
