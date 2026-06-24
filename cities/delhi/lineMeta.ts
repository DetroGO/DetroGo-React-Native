// lineMeta.ts is a collection of line display names (ex: "Blue line main" -> "Blue Line (towards Dwarka)") and terminus points (start and end points of a line) for Delhi NCR.
// LINE_DISPLAY_NAMES contains any unique line which we need to display for example blue line has 2 branches one from yamuna bank other form vaishali and they are labelled in the dataset as blue line main and blue line branch which is not helpful for display hence these simplified display names are used.
// LINE_TERMINUS contains the start and end points of a line which are used to display the line on the map and stations list.
// LINE_COLORS contains the color of all the lines in the system.

export const LINE_DISPLAY_NAMES: Record<string, string> = {
  "Blue line main": "Blue Line (towards Dwarka)",
  "Blue line branch": "Blue Line (towards Vaishali)",
  "Pink loop": "Pink Line (Loop)",
  "Pink branch": "Pink Line (towards Shiv Vihar)",
};

export const LINE_TERMINUS: Record<string, [string, string]> = {
  "Blue line main": ["Dwarka Sector 21", "Noida Electronic City"],
  "Blue line branch": ["Yamuna Bank", "Vaishali"],
  "Yellow line": ["HUDA City Centre", "Samaypur Badli"],
  "Red line": ["Rithala", "Shaheed Sthal"],
  "Green line": ["Inderlok / Brigadier Hoshiyar Singh", "Brig. Hoshiyar Singh"],
  "Violet line": ["Kashmere Gate", "Raja Nahar Singh (Ballabhgarh)"],
  "Orange line": ["New Delhi", "Dwarka Sector 21"],
  "Magenta line": ["Janakpuri West", "Botanical Garden"],
  "Pink line": ["Maujpur ", "Shiv Vihar"],
  "Aqua line": ["Noida Sector 51", "Depot Station"],
  "Grey line": ["Dwarka", "Dhansa Bus Stand"],
  "Rapid Metro": ["Sikanderpur", "Sector 55-56"],
};

export const LINE_COLORS: Record<string, string> = {
  "Yellow Line": "#FFD700",
  "Blue Line": "#0047AB",
  "Red Line": "#CC0000",
  "Green Line": "#008000",
  "Violet Line": "#7F00FF",
  "Orange Line": "#FF6600",
  "Magenta Line": "#FF00FF",
  "Pink Line": "#FF69B4",
  "Aqua Line": "#00FFFF",
  "Grey Line": "#808080",
  "Rapid Metro": "#00CED1",
};
