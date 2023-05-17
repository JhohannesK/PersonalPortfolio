import React, { useContext, useEffect, useRef, useState } from 'react';
import { appContext } from '../util/Context';

// TODO: Make nice cards for projects

const Projects = () => {
	const projectRef = useRef<HTMLDivElement>(null);
	const { setProjectState } = useContext(appContext);

	const [isIntersecting, setIsIntersecting] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entries]) => {
				setProjectState(entries.isIntersecting);
			},
			{
				// root: null,
				rootMargin: '-200px',
				// threshold: 1.0,
			}
		);

		if (projectRef.current) {
			observer.observe(projectRef.current);
		}
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div id='projects' className='h-[90rem] mt-[10rem] ' ref={projectRef}>
			Projects: adding soon
		</div>
	);
};

export default Projects;
