import React, { useContext, useEffect, useRef, useState } from 'react';
import { about } from '../data/content/about';
import Card from './Card';
import TechStack from './TechStack';
import { appContext } from '../util/Context';

const About = () => {
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
	console.log(
		'🚀 ~ file: About.tsx:8 ~ About ~ isIntersecting:',
		isIntersecting
	);
	const { aboutRef } = useContext(appContext);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entries]) => {
				setIsIntersecting(entries.isIntersecting);
				console.log(isIntersecting);
			},
			{
				// root: null,
				rootMargin: '-400px',
				threshold: 0,
			}
		);
		if (aboutRef.current) {
			observer.observe(aboutRef.current);
		}
		return () => {
			observer.disconnect();
		};
	}, []);
	return (
		<div
			ref={aboutRef}
			id='about'
			className='flex flex-col pt-16 md:pt-56 lg:pt-56 items-center justify-center gap-y-20'
		>
			{/* About with cards */}
			<div>
				<p className='uppercase tracking-wider flex items-center justify-center text-center text-5xl  font-Maconda font-bold pb-5'>
					About
				</p>
				<div className='grid grid-rows-3 gap-y-5 text-white px-20 md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 items-center justify-center  bg-opacity-60 md:pl-36 md:pt-20 lg:flex lg:px-20 lg:py-10'>
					{React.Children.toArray(
						about.map((item) => {
							return <Card items={item} />;
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default About;
