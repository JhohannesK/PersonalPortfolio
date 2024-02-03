import React, { useContext, useEffect, useRef, useState } from 'react';
import ImageOne from '../images/Mask Group 1.png';
import peep from '../assets/images/Open Peeps Flat Assets/Flat Assets/Templates/Bust/peep-8.svg';
import { Link } from 'react-scroll';
import { appContext } from '../util/Context';
import { IconNameType } from './@types';

const Hero = () => {
	const heroRef = useRef<HTMLDivElement>(null);

	const { setHeroState } = useContext(appContext);

	const [isIntersecting, setIsIntersecting] = useState<IconNameType>({
		iconIndex: null,
		isIntersecting: false,
	});

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entries]) => {
				setHeroState(entries.isIntersecting);
			},
			{
				// root: null,
				// rootMargin: '-100px',
				threshold: 1.0,
			}
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
			id='hero'
			ref={heroRef}
			className='flex flex-col items-center pt-24 px-10 md:flex-row md:items-center md:justify-center md:px-[10rem] md:pt-[16rem] md:pb-[16rem] md:gap-x-40 '
		>
			{/* Contains the image */}
			<div className='rounded-xl max-w-[30rem] md:w-96 bg-gradient-to-r from-yellow-300 to-gray-700 border border-red-300'>
				{/* on top of the of the container */}
				<div className='rounded-xl w-full md:w-[100%] rotate-[10deg] hover:rotate-0 transition duration-500 bg-yellow-300'>
					{/* <img src={ImageOne} alt="ImageOne" className='h-80 w-full object-contain ' /> */}
					<img
						src={peep}
						alt='ImageOne'
						className='h-80 w-full object-contain '
					/>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center text-center  gap-y-3 pt-10 sm:pt-5'>
				<p className='text-4xl'>Hello 👋🏾, I am</p>
				<p className='text-5xl lg:text-6xl text-yellow-300 animate-pulse font-Nunito'>
					Domeh John Kelvin
				</p>
				<p className='text-xs sm:text-sm md:text-lg text-gray-400'>
					Creative Software Engineer
				</p>
				<div className='flex items-center justify-center gap-x-4 pt-5'>
					{/* TODO: Add download link
					 */}
					<a href='#' download>
						<button className='btn hover:bg-yellow-300 hover:text-black animate-float '>
							{' '}
							Download CV
						</button>
					</a>

					<Link
						activeClass='active'
						to={'contact'}
						spy={true}
						smooth={true}
						offset={50}
						duration={400}
					>
						<button className='btn bg-yellow-300 hover:text-white hover:bg-inherit text-black'>
							Let's Talk
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Hero;
