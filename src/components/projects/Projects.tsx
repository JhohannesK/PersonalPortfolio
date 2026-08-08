import React, { useContext, useEffect, useRef } from 'react';
import { projects, type ProjectRepoLink } from '../../data/content/projects';
import { appContext } from '../../util/Context';

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
			},
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
			id="projects"
			ref={projectsRef}
			className="relative z-10 mt-16 flex flex-col items-center px-5 md:mt-24 md:px-10 lg:px-16"
		>
			<p className="text-center text-5xl font-bold uppercase tracking-wider">
				<span className="contact-headline-shimmer">Projects</span>
			</p>
			<p className="max-w-3xl pt-4 text-center text-muted">
				In code and cloud, my visions cast, From playful sites to systems vast.
				Interactive tales and tools refined, Art and logic intertwined.
				Frameworks learn, designs unfold, Every project—new stories told.
			</p>

			<div className="project-stage pt-10 w-full max-w-6xl grid gap-8 md:grid-cols-2 xl:grid-cols-3">
				{projects.map((project, index) => {
					const rotation = (index - 1) * 7;
					const style: ProjectCardStyle = {
						'--project-rotate': `${rotation}deg`,
						'--project-accent': project.accent,
					};

					return (
						<article
							key={project.title}
							className="project-card-3d"
							style={style}
						>
							<div className="project-grid" />
							<div className="relative z-10">
								<div className="flex items-start justify-between gap-4">
									<div>
										<p className="text-xs uppercase tracking-[0.2em] text-muted">
											{project.kind}
										</p>
										<h3 className="pt-1 text-2xl font-bold text-fg">
											{project.title}
										</h3>
									</div>
									<span className="rounded-full border border-border px-2 py-1 text-[0.65rem] uppercase tracking-wider text-fg-secondary">
										{project.status}
									</span>
								</div>

								<p className="pt-4 text-sm leading-relaxed text-muted">
									{project.summary}
								</p>

								<ul className="space-y-2 pt-4 text-sm text-fg-secondary">
									{project.highlights.map((highlight) => {
										return (
											<li
												key={highlight}
												className="project-list-item"
											>
												{highlight}
											</li>
										);
									})}
								</ul>

								<div className="pt-5 flex flex-wrap gap-2">
									{project.stack.map((item) => {
										return (
											<span
												key={item}
												className="rounded-full border border-border px-3 py-1 text-xs text-fg-secondary"
											>
												{item}
											</span>
										);
									})}
								</div>

								{(project.liveUrl ||
									(project.repoLinks && project.repoLinks.length > 0)) && (
									<div className="pt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
										{project.liveUrl && (
											<a
												href={project.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="font-medium text-(--project-accent) underline decoration-zinc-500 underline-offset-4 transition hover:decoration-(--project-accent)"
											>
												Live demo
											</a>
										)}
										{project.repoLinks?.map((link: ProjectRepoLink) => {
											return (
												<a
													key={`${link.label}-${link.href}`}
													href={link.href}
													target="_blank"
													rel="noopener noreferrer"
													className="text-muted underline decoration-border underline-offset-4 transition hover:text-fg-secondary"
												>
													{link.label}
												</a>
											);
										})}
									</div>
								)}
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
};

export default Projects;
