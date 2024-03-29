import React, { useContext, useEffect, useRef, useState } from 'react';
import { appContext } from '../util/Context';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

// TODO: Make nice cards for projects

const Contact = () => {
	const contactRef = useRef<HTMLDivElement>(null);
	const { setContactState } = useContext(appContext);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entries]) => {
				setContactState(entries.isIntersecting);
			},
			{
				// root: null,
				// rootMargin: '-200px',
				threshold: 1.0,
			}
		);

		if (contactRef.current) {
			observer.observe(contactRef.current);
		}
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div id='contact' className='h-[20rem] mt-[10rem] ' ref={contactRef}>
			<div>
				<p className='uppercase tracking-wider flex items-center justify-center text-center text-5xl  font-Maconda font-bold pb-5'>
					Contact
				</p>
			</div>
			<div className='w-full items-center justify-center'>
				<p className='text-center text-2xl'>
					Want to reach out? Contact me on:
				</p>
			</div>
			<div className='mt-7 flex gap-10 w-full items-center max-w-[800px] mx-auto px-5 justify-between'>
				<div className='hover:text-blue-500 duration-300 transition-all cursor-pointer'>
					<a href='http://www.twitter.com/_jhohannes'>
						<FaTwitter size={50} />
					</a>
				</div>
				<div className='hover:text-zinc-500 duration-300 transition-all cursor-pointer'>
					<a href='http://www.github.com/jhohannesK'>
						<FaGithub size={50} />
					</a>
				</div>
				<div className='hover:text-red-500 duration-300 transition-all cursor-pointer'>
					<a href='mailto:jdomeh77@gmail.com'>
						<SiGmail size={50} />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Contact;
