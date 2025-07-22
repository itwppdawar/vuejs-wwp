const swRegister = async () => {
  if ("serviceWorker" in navigator) {
    try {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register(new URL("../../sw.js", import.meta.url));
      });
      console.log("Service worker registration successful");
    } catch (e) {
      console.log("Service worker registration failed", e);
    }
  } else {
    console.log("Service worker not supported in this browser");
  }
};

export default swRegister;
