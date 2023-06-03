import Header from './components/Header';
import Hero from './components/Hero';
import Navigation from './components/Navlinks';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Footer from './components/Footer';
import AppProvider, { appContext } from './util/Context';
import React, { useContext } from 'react';
import useToggleClassName from '../hook/useToggle';

function App() {
	return (
		<AppProvider>
			<div className="bg-[url('./assets/images/blur-stain.jpg')] text-white bg-contain w-full">
				<div className='bg-zinc-900 opacity-90 '>
					<div className='2xl:max-w-7xl mx-auto'>
						<Header />
						<Hero />
						<Navigation />
						<About />
						<TechStack />
						<Projects />
						<Footer />
					</div>
				</div>
			</div>
		</AppProvider>
	);
}

export default App;
