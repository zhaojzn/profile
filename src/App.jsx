import { useEffect } from "react";
import Home from "./pages/Home";
import * as ReactGA4 from "react-ga4";

// react-ga4 ships CommonJS; its default export resolves differently under
// Vite's dev server (esbuild) vs the production build (Rollup). Resolve it
// defensively so `.initialize` exists in both.
const ReactGA = ReactGA4.default ?? ReactGA4;

function App() {
  // Analytics is non-critical — run it after mount and never let a failure
  // take down the page (it previously threw during render and crashed <App>).
  useEffect(() => {
    try {
      ReactGA.initialize("G-F8HG5RX9J6");
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    } catch (e) {
      console.warn("GA init skipped:", e);
    }

    const { hash } = window.location;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
    }
  }, []);

  return <Home />;
}

export default App;
