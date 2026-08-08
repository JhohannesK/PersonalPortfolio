import { useContext, useEffect, useRef, useState } from 'react';
import { about } from '../../data/content/about';
import AboutBentoCard from './AboutBentoCard';
import AboutScrollReveal from './AboutScrollReveal';
import { appContext } from '../../util/Context';

const About = () => {
	const aboutRef = useRef<HTMLDivElement>(null);
	const [revealed, setRevealed] = useState(false);
	const { setAboutState } = useContext(appContext);

	useEffect(() => {
		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) setRevealed(true);

		const observer = new IntersectionObserver(
			([entry]) => {
				setAboutState(entry.isIntersecting);
				if (entry.isIntersecting) setRevealed(true);
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
		);

		const node = aboutRef.current;
		if (node) observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={aboutRef}
			id="about"
			className={`about-section relative px-5 pb-24 pt-10 md:pb-32 md:pt-14 ${revealed ? 'about-section--visible' : ''}`}
		>
			<div className="relative z-10 mx-auto max-w-6xl">
				<AboutScrollReveal />
			</div>
		</div>
	);
};

export default About;
