import React, { useContext, useEffect, useRef } from 'react';
import { projects } from '../data/content/projects';
import { appContext } from '../util/Context';

type ProjectCardStyle = React.CSSProperties & {
	'--project-rotate': string;
	'--project-accent': string;
};

const Projects = () => {
	const projectsRef = useRef<HTMLDivElement>(null);
	const { setProjectsState } = useContext(appContext);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setProjectsState(entry.isIntersecting);
			},
			{
				threshold: 0.3,
			}
		);

		if (projectsRef.current) {
			observer.observe(projectsRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<section
			id='projects'
			ref={projectsRef}
			className='mt-24 px-5 md:px-10 lg:px-16 flex flex-col items-center'
		>
			<p className='text-5xl text-center font-bold font-Maconda uppercase tracking-wider'>
				Projects
			</p>
			<p className='text-center text-zinc-300 pt-4 max-w-3xl'>
				A cinematic, 3D-style stage for selected builds.
			</p>

			<div className='project-stage pt-10 w-full max-w-6xl grid gap-8 md:grid-cols-2 xl:grid-cols-3'>
				{projects.map((project, index) => {
					const rotation = (index - 1) * 7;
					const style: ProjectCardStyle = {
						'--project-rotate': `${rotation}deg`,
						'--project-accent': project.accent,
					};

					return (
						<article key={project.title} className='project-card-3d' style={style}>
							<div className='project-grid' />
							<div className='relative z-10'>
								<div className='flex items-start justify-between gap-4'>
									<div>
										<p className='text-xs uppercase tracking-[0.2em] text-zinc-400'>
											{project.kind}
										</p>
										<h3 className='text-2xl font-bold text-zinc-50 pt-1'>
											{project.title}
										</h3>
									</div>
									<span className='text-[0.65rem] uppercase tracking-wider rounded-full border border-zinc-600 px-2 py-1 text-zinc-300'>
										{project.status}
									</span>
								</div>

								<p className='text-sm text-zinc-300 leading-relaxed pt-4'>
									{project.summary}
								</p>

								<ul className='pt-4 space-y-2 text-sm text-zinc-200'>
									{project.highlights.map((highlight) => {
										return (
											<li key={highlight} className='project-list-item'>
												{highlight}
											</li>
										);
									})}
								</ul>

								<div className='pt-5 flex flex-wrap gap-2'>
									{project.stack.map((item) => {
										return (
											<span
												key={item}
												className='rounded-full border border-zinc-600 px-3 py-1 text-xs text-zinc-300'
											>
												{item}
											</span>
										);
									})}
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
};

export default Projects;
