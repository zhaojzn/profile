import * as React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Work from "../components/Work/Work";
import Footer from "../components/Footer";
import Status from "../components/Status";
import Projects from "../components/Projects/Projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-white antialiased">
      <Navbar />
      <main>
        <About />
        <Projects />
        <Work />
        <Status />
      </main>
      <Footer />
    </div>
  );
}
