const tintColorLight = "#29b6f6"; // Primary blue
const tintColorDark = "#ffd54f"; // Warm yellow for dark mode

export const Colors = {
  light: {
    text: "#1c1c1c",
    background: "#fff",
    tint: tintColorLight, // Main accent (buttons/icons)
    icon: "#616161",
    tabIconDefault: "#bdbdbd",
    tabIconSelected: tintColorLight,
    buttonParent: "#29b6f6", // Light blue
    buttonChild: "#ef5350", // Pink/red
    buttonSave: "#66bb6a", // Green
    buttonSpend: "#ffa726", // Orange
    coinGold: "#fbc02d", // Coin color
  },
  dark: {
    text: "#f1f1f1",
    background: "#121212",
    tint: tintColorDark,
    icon: "#cccccc",
    tabIconDefault: "#777",
    tabIconSelected: tintColorDark,
    buttonParent: "#039be5", // Deep blue
    buttonChild: "#e53935", // Stronger red
    buttonSave: "#43a047", // Green
    buttonSpend: "#fb8c00", // Orange
    coinGold: "#ffeb3b", // Bright gold
  },
};
