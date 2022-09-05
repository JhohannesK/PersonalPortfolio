import Hero from './components/Hero';
import Projects from './components/Projects';
import Others from './components/Contacts';
import Footer from './components/Footer';
import About from './components/About';
import TechStack from './components/TechStack';
import Navigation from './components/Navlinks';
import Header from './components/Header';

function App() {
	return (
		<div className="bg-[url('./images/blur-stain.jpg')] text-white bg-contain">
			<div className='bg-zinc-900 opacity-90 '>
				<main className='w-full flex items-center justify-center'>
					<div className='max-w-screen-2xl'>
						<Header />
						<Hero />
						<Navigation />
						<About />
						<TechStack />
						<Projects />
						<Others />
						<Footer />
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
