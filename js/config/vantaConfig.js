// Import THREE from the global scope
const getBlendingMode = () => {
  if (typeof THREE !== 'undefined') {
    return THREE.AdditiveBlending;
  }
  return 2; // Fallback to AdditiveBlending constant
};

// Color configuration
const colors = {
  background: 0x1a1a1a,    // Dark grey background
  primary: 0x82365C,       // Rose Bud Cherry
  highlight: 0xff8ac1,     // Light pink
  midtone: 0xff4d94,       // Darker pink
  base: 0xff69b4          // Hot pink
};

// Animation settings
const animation = {
  speed: 1,
  chaos: 5,
  size: 1.5
};

// Responsive settings
const responsive = {
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00
};

// Network settings
const network = {
  points: 20.00,
  maxDistance: 15.00,
  spacing: 15.00, // Default spacing
  showDots: true
};

// Controls configuration
const controls = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false
};

// Adjust spacing dynamically for mobile devices
const isMobile = window.innerWidth <= 768; // Mobile breakpoint
const mobileSpacing = 25.00; // Increased spacing for mobile devices

// Export the complete configuration
export const vantaConfig = {
  ...controls,
  ...responsive,
  ...network,
  ...(isMobile && { spacing: mobileSpacing }), // Override spacing for mobile
  ...animation,
  backgroundColor: colors.background,
  color: colors.primary,
  highlightColor: colors.highlight,
  midtoneColor: colors.midtone,
  baseColor: colors.base,
  blending: getBlendingMode(),
  transparency: 0.9
};
