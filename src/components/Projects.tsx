import { useContext, useEffect, useRef, useState } from 'react';
import { projects, type Project } from '../data/content/projects';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { appContext } from '../util/Context';

function ProjectCard({ project, index }: { project: Project; index: number }) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState('');
	const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		const card = cardRef.current;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = ((y - centerY) / centerY) * -15;
		const rotateY = ((x - centerX) / centerX) * 15;
		setTransform(
			`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
		);
		setGlare({
			x: (x / rect.width) * 100,
			y: (y / rect.height) * 100,
			opacity: 0.15,
		});
	}

	function handleMouseLeave() {
		setTransform('');
		setGlare({ x: 50, y: 50, opacity: 0 });
	}

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className='project-card group relative rounded-xl border border-white/10 bg-zinc-900/80 p-6 transition-all duration-200 ease-out cursor-pointer overflow-hidden backdrop-blur-sm'
			style={{
				transform: transform || undefined,
				animationDelay: `${index * 100}ms`,
			}}
		>
			{/* Glare effect */}
			<div
				className='pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300'
				style={{
					background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
				}}
			/>

			{/* Colored accent line */}
			<div
				className='absolute top-0 left-0 h-1 w-full rounded-t-xl'
				style={{ backgroundColor: project.color }}
			/>

			{/* Floating index badge */}
			<div
				className='absolute -top-0 -right-0 w-12 h-12 flex items-end justify-start pl-2 pb-1 text-xs font-bold opacity-20 group-hover:opacity-40 transition-opacity'
				style={{
					background: `linear-gradient(135deg, transparent 50%, ${project.color}30 50%)`,
				}}
			>
				{String(project.id).padStart(2, '0')}
			</div>

			{/* Content */}
			<div className='relative z-10'>
				<h3
					className='text-xl font-bold mb-2 transition-colors duration-300'
					style={{ color: project.color }}
				>
					{project.title}
				</h3>
				<p className='text-gray-400 text-sm leading-relaxed mb-4'>
					{project.description}
				</p>

				{/* Tech tags */}
				<div className='flex flex-wrap gap-2 mb-5'>
					{project.tech.map((t) => (
						<span
							key={t}
							className='text-xs px-2 py-1 rounded-full border font-Source-code'
							style={{
								borderColor: `${project.color}40`,
								color: project.color,
								backgroundColor: `${project.color}10`,
							}}
						>
							{t}
						</span>
					))}
				</div>

				{/* Links */}
				<div className='flex gap-4'>
					{project.github && (
						<a
							href={project.github}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors'
						>
							<FaGithub /> Code
						</a>
					)}
					{project.live && (
						<a
							href={project.live}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-1.5 text-sm transition-colors'
							style={{ color: project.color }}
						>
							<FaExternalLinkAlt size={12} /> Live
						</a>
					)}
				</div>
			</div>

			{/* Background glow on hover */}
			<div
				className='absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl'
				style={{ backgroundColor: project.color }}
			/>
		</div>
	);
}

const Projects = () => {
	const projectsRef = useRef<HTMLDivElement>(null);
	const { setProjectsState } = useContext(appContext);
	const [activeFilter, setActiveFilter] = useState<string>('all');

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entries]) => {
				setProjectsState(entries.isIntersecting);
			},
			{ threshold: 0.2 }
		);
		if (projectsRef.current) observer.observe(projectsRef.current);
		return () => observer.disconnect();
	}, []);

	const allTech = Array.from(
		new Set(projects.flatMap((p) => p.tech))
	).sort();

	const filtered =
		activeFilter === 'all'
			? projects
			: projects.filter((p) => p.tech.includes(activeFilter));

	return (
		<div id='projects' ref={projectsRef} className='mt-12 p-5'>
			<p className='text-5xl text-center font-bold font-Maconda uppercase tracking-wider mb-4'>
				Projects
			</p>
			<p className='text-center text-gray-400 text-sm mb-8 font-Source-code'>
				&lt; hover to interact /&gt;
			</p>

			{/* Filter bar */}
			<div className='flex flex-wrap justify-center gap-2 mb-10'>
				<button
					onClick={() => setActiveFilter('all')}
					className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 font-Source-code ${
						activeFilter === 'all'
							? 'bg-yellow-300 text-black border-yellow-300'
							: 'border-white/20 text-gray-400 hover:border-yellow-300/50 hover:text-yellow-300'
					}`}
				>
					All
				</button>
				{allTech.map((tech) => (
					<button
						key={tech}
						onClick={() => setActiveFilter(tech)}
						className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 font-Source-code ${
							activeFilter === tech
								? 'bg-yellow-300 text-black border-yellow-300'
								: 'border-white/20 text-gray-400 hover:border-yellow-300/50 hover:text-yellow-300'
						}`}
					>
						{tech}
					</button>
				))}
			</div>

			{/* 3D Grid */}
			<div
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'
				style={{ perspective: '1200px' }}
			>
				{filtered.map((project, index) => (
					<ProjectCard
						key={project.id}
						project={project}
						index={index}
					/>
				))}
			</div>

			{filtered.length === 0 && (
				<p className='text-center text-gray-500 mt-10 font-Source-code'>
					No projects match that filter.
				</p>
			)}
		</div>
	);
};

export default Projects;
