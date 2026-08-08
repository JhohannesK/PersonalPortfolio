import Header from './components/layout/Header';
import Hero from './components/hero/Hero';
import Navigation from './components/layout/Navlinks';
import About from './components/about/About';
import Projects from './components/projects/Projects';
import TechStack from './components/tech-stack/TechStack';
import Footer from './components/layout/Footer';
import AppProvider from './util/Context';
import Contact from './components/contact/Contact';
import PageIntro from './components/layout/PageIntro';

function App() {
	return (
		<AppProvider>
			<PageIntro>
				<div className="app-shell relative w-full bg-[url('./assets/images/blur-stain.jpg')] bg-contain bg-no-repeat bg-top font-sans antialiased">
					<div className="app-shell-scrim pointer-events-none absolute inset-0" aria-hidden />
					<div className="relative z-10 mx-auto 2xl:max-w-7xl">
						<Header />
						<Hero />
						<Navigation />

						<div className="content-band relative">
							<div className="content-band-ambient" aria-hidden />
							<div className="content-band-noise" aria-hidden />
							<div className="content-band-grid" aria-hidden />
							<div className="content-band-glow content-band-glow--a" aria-hidden />
							<div className="content-band-glow content-band-glow--b" aria-hidden />

							<div className="content-band-inner relative z-10">
								<About />
								<Projects />
								<TechStack />
								<Contact />
							</div>
						</div>

						<Footer />
					</div>
				</div>
			</PageIntro>
		</AppProvider>
	);
}

export default App;
