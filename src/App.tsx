import Header from './components/Header';
import Hero from './components/Hero';
import Navigation from './components/Navlinks';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Footer from './components/Footer';
import AppProvider, { appContext } from './util/Context';
import React from 'react';
import useToggleClassName from '../hook/useToggle';

function App() {
	const { iconState, setIconState } = React.useContext(appContext);
	const { toggleActiveIcon, toggleActiveName } = useToggleClassName();

	const refs = React.useRef<(HTMLDivElement | null)[]>([]);
	console.log('🚀 ~ file: Navlinks.tsx:60 ~ Navigation ~ ref:', refs);

	const [test, setTest] = React.useState<number | undefined>(undefined);
	console.log('🚀 ~ file: Navlinks.tsx:20 ~ Navigation ~ test:', test);
	React.useEffect(() => {
		const observer = new IntersectionObserver(
			() => {
				(entries: IntersectionObserverEntry[]) => {
					entries.forEach((entry, index) => {
						const divId = Number(entry.target.getAttribute('data-id'));
						if (entry.isIntersecting) {
							setIconState({ ...iconState, activeObject: index });
							toggleActiveIcon(index);
							toggleActiveName(index);
							setTest(index);
						}
					});
				};
			},
			{
				root: null,
				rootMargin: '-300px',
				threshold: 0.5,
			}
		);

		refs.current.forEach((ref) => {
			if (ref) {
				observer.observe(ref);
			}
		});

		return () => {
			observer.disconnect();
		};
	}, [refs]);
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
