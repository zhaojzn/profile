import { useEffect } from "react";
import Home from "./pages/Home";
import ReactGA from 'react-ga4';
function App() {

  useEffect(() => {
    ReactGA.initialize('G-7TSEF9YM8E')
    ReactGA.send({ hitType: "pageview", page: "/", title: "Welcome page" });
  }, [])

  return (
    <Home/>
  );
}
export default App
