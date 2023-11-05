import * as React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Special from "../components/Special";
import Work from "../components/Work/Work";
import Footer from "../components/Footer";
import Status from "../components/Status";
import Projects from "../components/Projects/Projects";

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