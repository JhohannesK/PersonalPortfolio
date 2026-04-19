import Header from './components/Header';
import Hero from './components/Hero';
import Navigation from './components/Navlinks';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import AppProvider from './util/Context';
import Contact from './components/Contact';
import PageIntro from './components/PageIntro';

function App() {
	return (
		<AppProvider>
			<PageIntro>
				<div className="relative w-full bg-zinc-950 bg-[url('./assets/images/blur-stain.jpg')] bg-contain bg-no-repeat bg-top text-white font-sans antialiased">
					<div
						className="pointer-events-none absolute inset-0 bg-zinc-950/86"
						aria-hidden
					/>
					<div className="relative z-10 mx-auto 2xl:max-w-7xl">
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
			</PageIntro>
		</AppProvider>
	);
}

export default App;
