import { useEffect } from "react";
import Home from "./pages/Home";
import ReactGA from 'react-ga4';
function App() {

  ReactGA.initialize('G-F8HG5RX9J6')
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname
  })
  return (
    <Home/>
  );
}
export default App
