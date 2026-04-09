import Header from './components/Header';
import Hero from './components/Hero';
import Navigation from './components/Navlinks';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import AppProvider from './util/Context';
import Contact from './components/Contact';

function App() {
	return (
		<AppProvider>
			<div className="bg-[url('./assets/images/blur-stain.jpg')] text-white bg-contain w-full font-sans antialiased">
				<div className='bg-zinc-900 opacity-90 '>
					<div className='2xl:max-w-7xl mx-auto'>
						<Header />
						<Hero />
						<Navigation />
						<About />
						<Projects />
						<TechStack />
						<Contact />
						<Footer />
					</div>
				</div>
			</div>
		</AppProvider>
	);
}

export default App;
