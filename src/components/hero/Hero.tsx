import React, { useContext, useEffect, useRef, useState } from 'react';
import ImageOne from '../../images/Mask Group 1.png';
import peep from '../../assets/images/Open Peeps Flat Assets/Flat Assets/Templates/Bust/peep-8.svg';
import { Link } from 'react-scroll';
import { appContext } from '../../util/Context';
import { IconNameType } from '../shared/@types';
import { Button } from '../ui/button';

const greetings = [
	{ word: 'Hello', lang: 'en' },
	{ word: 'Bonjour', lang: 'fr' },
	{ word: 'Hola', lang: 'es' },
	{ word: 'Olá', lang: 'pt' },
	{ word: 'Ciao', lang: 'it' },
	{ word: 'Hallo', lang: 'de' },
	{ word: 'Merhaba', lang: 'tr' },
	{ word: 'Habari', lang: 'sw' },
	{ word: 'Sawubona', lang: 'zu' },
	{ word: 'こんにちは', lang: 'ja' },
	{ word: '안녕하세요', lang: 'ko' },
	{ word: '你好', lang: 'zh' },
	{ word: 'नमस्ते', lang: 'hi' },
];

const GREETING_INTERVAL_MS = 2600;

const Hero = () => {
	const heroRef = useRef<HTMLDivElement>(null);

	const { setHeroState } = useContext(appContext);

	const [isIntersecting, setIsIntersecting] = useState<IconNameType>({
		iconIndex: null,
		isIntersecting: false,
	});

	const [greetingIndex, setGreetingIndex] = useState(0);
	const [greetingMotion, setGreetingMotion] = useState(
		() =>
			typeof window === 'undefined' ||
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches,
	);

	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		const syncPreference = () => setGreetingMotion(!query.matches);

		query.addEventListener('change', syncPreference);
		return () => query.removeEventListener('change', syncPreference);
	}, []);

	useEffect(() => {
		if (!greetingMotion) {
			setGreetingIndex(0);
			return;
		}

		let interval: number | undefined;

		const stop = () => {
			if (interval !== undefined) {
				window.clearInterval(interval);
				interval = undefined;
			}
		};

		const start = () => {
			stop();
			interval = window.setInterval(() => {
				setGreetingIndex((index) => (index + 1) % greetings.length);
			}, GREETING_INTERVAL_MS);
		};

		const handleVisibility = () => {
			if (document.hidden) {
				stop();
			} else {
				start();
			}
		};

		if (!document.hidden) {
			start();
		}
		document.addEventListener('visibilitychange', handleVisibility);

		return () => {
			stop();
			document.removeEventListener('visibilitychange', handleVisibility);
		};
	}, [greetingMotion]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entries]) => {
				setHeroState(entries.isIntersecting);
			},
			{
				// root: null,
				// rootMargin: '-100px',
				threshold: 1.0,
			},
		);

		if (heroRef.current) {
			observer.observe(heroRef.current);
		}
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div
			id="hero"
			ref={heroRef}
			className="flex flex-col items-center pt-24 px-10 md:flex-row md:items-center md:justify-center md:px-12 md:pt-[16rem] md:pb-[16rem] md:gap-x-40 "
		>
			{/* Contains the image */}
			<div className="rounded-4xl max-w-[30rem] md:w-96 bg-linear-to-tr from-yellow-300 to-gray-700 border border-red-300/10">
				{/* on top of the of the container */}
				<div className="rounded-4xl w-full md:w-[100%] rotate-[10deg] hover:rotate-0 transition duration-500 bg-yellow-300">
					<img
						src={peep}
						alt="ImageOne"
						className="h-80 w-full object-contain "
					/>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center text-center  gap-y-3 pt-10 sm:pt-5">
				<p className="hero-greeting text-3xl sm:text-4xl">
					<span className="sr-only">Hello, I am</span>
					<span className="hero-greeting-sizer" aria-hidden="true">
						Hello 👋🏾, I am
					</span>
					<span className="hero-greeting-stack" aria-hidden="true">
						{greetings.map((greeting, index) => (
							<span
								key={greeting.lang}
								lang={greeting.lang}
								data-state={index === greetingIndex ? 'active' : 'idle'}
								className="hero-greeting-line"
							>
								{greeting.word} 👋🏾, I am
							</span>
						))}
					</span>
				</p>
				<p className="text-5xl lg:text-6xl text-yellow-300 animate-pulse font-bold">
					Domeh John Kelvin
				</p>
				<p className="text-xs sm:text-sm md:text-lg text-gray-400 capitalize">
					Passionately Curious Software Engineer
				</p>
				<div className="flex items-center justify-center gap-x-4 pt-5">
					{/* TODO: Add download link
					 */}

					<Button className=" bg-yellow-300 hover:text-black animate-float ">
						{' '}
						Download CV
					</Button>

					<Link
						activeClass="active"
						to={'contact'}
						spy={true}
						smooth={true}
						offset={50}
						duration={400}
					>
						<Button className=" bg-yellow-300">Let's Talk</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Hero;
