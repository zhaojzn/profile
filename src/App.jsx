import { useEffect } from "react";
import Home from "./pages/Home";
import ReactGa from 'react-ga';
function App() {

  useEffect(() => {
    ReactGa.initialize('G-7TSEF9YM8E')
    ReactGa.pageview('/')
  }, [])

  return (
    <Home/>
  );
}
export default App
