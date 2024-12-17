// Check WebGL support
export const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Error handling
export const handleError = (message, error = null) => {
  console.error(message, error || '');
};

// Wait for dependencies to be loaded
export const waitForDependencies = () => {
  return new Promise((resolve, reject) => {
    const maxAttempts = 50;
    let attempts = 0;

    const checkDependencies = () => {
      attempts++;
      
      if (typeof THREE !== 'undefined' && typeof VANTA !== 'undefined') {
        resolve();
        return;
      }

      if (attempts >= maxAttempts) {
        reject(new Error('Dependencies failed to load'));
        return;
      }

      setTimeout(checkDependencies, 100);
    };

    checkDependencies();
  });
};

// Check if required libraries are loaded
export const checkDependencies = () => {
  const dependencies = {
    three: typeof THREE !== 'undefined',
    vanta: typeof VANTA !== 'undefined'
  };
  
  return {
    success: Object.values(dependencies).every(Boolean),
    missing: Object.entries(dependencies)
      .filter(([, loaded]) => !loaded)
      .map(([name]) => name)
  };
};