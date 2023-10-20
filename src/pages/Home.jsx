import * as React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Special from "../components/Special";
import Projects from "../components/Projects";
import Work from "../components/Work";
import Footer from "../components/Footer";
import Status from "../components/Status";

export default function Home() {
  return (
    <div className="bg-bg flex flex-col">
      <Navbar/>
      <About/>
      <Special/>
      <Projects/>
      <Work/>
      <Status/>
      <Footer/>

    </div>
  );
}