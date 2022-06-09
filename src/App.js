import Header from "./components/Navlinks"
import Hero from './components/Hero'
import Projects from './components/Projects'
import Others from './components/Contacts'
import Footer from './components/Footer'
import About from "./components/About"


function App() {

  return (
    <div className="bg-[url('./images/blur-stain.jpg')] text-white bg-contain">
      <div className="bg-zinc-900 opacity-90 ">

        <Hero />
        <Header />
        <About />
        <Projects />
        <Others />
        <Footer />
      </div>

    </div>
  );
}

export default App;
