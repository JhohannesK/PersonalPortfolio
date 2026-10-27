import {
	useContext,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type KeyboardEvent,
} from 'react';
import {
	FiExternalLink,
	FiGithub,
	FiGlobe,
	FiGrid,
	FiLayers,
	FiSmartphone,
} from 'react-icons/fi';
import { projects, type ProjectItem } from '../../data/content/projects';
import { appContext } from '../../util/Context';
import { ParallaxHeroImages } from '../ui/parallax-hero-images';

type SegmentId = 'all' | 'web' | 'full-stack' | 'mobile';

type ProjectCardStyle = CSSProperties & {
	'--project-accent': string;
	'--i': number;
};

type SegmentStyle = CSSProperties & {
	'--seg-count': number;
	'--seg-index': number;
};

const SEGMENT_ORDER: SegmentId[] = ['all', 'web', 'full-stack', 'mobile'];

const SEGMENT_LABELS: Record<SegmentId, string> = {
	all: 'All',
	web: 'Web',
	'full-stack': 'Full-stack',
	mobile: 'Mobile',
};

const SEGMENT_ICONS = {
	all: FiGrid,
	web: FiGlobe,
	'full-stack': FiLayers,
	mobile: FiSmartphone,
} satisfies Record<SegmentId, typeof FiGrid>;

function isFullStack(project: ProjectItem) {
	return project.fullStack === true;
}

function matchesSegment(project: ProjectItem, segment: SegmentId) {
	if (segment === 'all') {
		return true;
	}

	if (segment === 'mobile') {
		return project.platform === 'mobile' || project.platform === 'hybrid';
	}

	if (segment === 'full-stack') {
		return isFullStack(project);
	}

	return project.platform !== 'mobile' && !isFullStack(project);
}

const segmentCounts = SEGMENT_ORDER.reduce<Record<SegmentId, number>>(
	(counts, segment) => {
		counts[segment] = projects.filter((project) =>
			matchesSegment(project, segment),
		).length;
		return counts;
	},
	{ all: 0, web: 0, 'full-stack': 0, mobile: 0 },
);

const segments = SEGMENT_ORDER.map((id) => ({
	id,
	label: SEGMENT_LABELS[id],
	count: segmentCounts[id],
})).filter((segment) => segment.count > 0);

const parallaxImages = projects
	.map((project) => project.preview?.src)
	.filter((src): src is string => Boolean(src));

function initials(title: string) {
	return title
		.split(/\s+/)
		.filter((word) => /[A-Za-z0-9]/.test(word))
		.slice(0, 2)
		.map((word) => word[0]?.toUpperCase())
		.join('');
}

const Projects = () => {
	const projectsRef = useRef<HTMLElement>(null);
	const segmentRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const { setProjectsState } = useContext(appContext);
	const [activeSegment, setActiveSegment] = useState<SegmentId>('all');
	const [revealed, setRevealed] = useState(false);

	useEffect(() => {
		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) setRevealed(true);

		const revealObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setRevealed(true);
			},
			{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
		);

		// Keep the floating nav's active-section timing independent of the
		// reveal threshold above.
		const stateObserver = new IntersectionObserver(
			([entry]) => {
				setProjectsState(entry.isIntersecting);
			},
			{ threshold: 0.3 },
		);

		if (projectsRef.current) {
			revealObserver.observe(projectsRef.current);
			stateObserver.observe(projectsRef.current);
		}

		return () => {
			revealObserver.disconnect();
			stateObserver.disconnect();
		};
	}, []);

	function selectSegment(segment: SegmentId) {
		if (segment === activeSegment) {
			return;
		}

		setActiveSegment(segment);

		const section = projectsRef.current;
		if (section && section.getBoundingClientRect().top < 0) {
			const reduce = window.matchMedia(
				'(prefers-reduced-motion: reduce)',
			).matches;
			section.scrollIntoView({
				behavior: reduce ? 'auto' : 'smooth',
				block: 'start',
			});
		}
	}

	const filteredProjects = projects.filter((project) =>
		matchesSegment(project, activeSegment),
	);

	const activeIndex = Math.max(
		0,
		segments.findIndex((segment) => segment.id === activeSegment),
	);

	const segmentStyle: SegmentStyle = {
		'--seg-count': segments.length,
		'--seg-index': activeIndex,
	};

	function handleSegmentKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		if (
			event.key !== 'ArrowLeft' &&
			event.key !== 'ArrowRight' &&
			event.key !== 'Home' &&
			event.key !== 'End'
		) {
			return;
		}

		const buttons = Array.from(
			event.currentTarget.querySelectorAll<HTMLButtonElement>(
				'.project-seg-button',
			),
		);
		const currentIndex = buttons.indexOf(
			document.activeElement as HTMLButtonElement,
		);

		if (currentIndex === -1) {
			return;
		}

		event.preventDefault();

		let nextIndex = currentIndex;

		if (event.key === 'ArrowLeft') {
			nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
		} else if (event.key === 'ArrowRight') {
			nextIndex = (currentIndex + 1) % buttons.length;
		} else if (event.key === 'Home') {
			nextIndex = 0;
		} else if (event.key === 'End') {
			nextIndex = buttons.length - 1;
		}

		buttons[nextIndex]?.focus();
	}

	function resetFilter() {
		setActiveSegment('all');
		requestAnimationFrame(() => segmentRefs.current[0]?.focus());
	}

	return (
		<section
			id="projects"
			ref={projectsRef}
			className={`project-section relative z-10 mt-16 flex flex-col items-center px-4 pb-2 sm:px-5 md:mt-24 md:px-8 lg:px-10${
				revealed ? ' project-section--visible' : ''
			}`}
			onFocus={() => setRevealed(true)}
		>
			<div className="project-parallax relative flex min-h-[390px] w-full flex-col items-center justify-center overflow-hidden py-8 sm:min-h-[480px] sm:py-12">
				<div
					className="pointer-events-none absolute inset-0"
					aria-hidden="true"
				>
					<ParallaxHeroImages
						images={parallaxImages}
						className="opacity-45 [mask-image:radial-gradient(ellipse_at_center,transparent_52%,black_94%)] dark:opacity-40 xl:opacity-55 xl:[mask-image:radial-gradient(ellipse_at_center,transparent_18%,black_62%)] dark:xl:opacity-45"
					/>
				</div>
				<header className="relative z-10 flex w-full flex-col items-center text-center">
					<h2 className="project-head text-4xl font-bold uppercase tracking-[0.11em] sm:text-5xl">
						<span className="contact-headline-shimmer">Projects</span>
					</h2>
					<p className="project-intro max-w-[56ch] pt-4 text-[15px] leading-relaxed text-muted">
						In code and cloud, my visions cast, from playful sites
						to systems vast. Interactive tales and tools refined,
						art and logic intertwined.
					</p>
				</header>
			</div>

			<div className="project-seg-wrap">
				<div
					className="project-seg"
					role="group"
					aria-label="Filter projects by platform"
					style={segmentStyle}
					onKeyDown={handleSegmentKeyDown}
				>
					<span
						className="project-seg-indicator"
						aria-hidden="true"
					/>
					{segments.map((segment, index) => {
						const SegmentIcon = SEGMENT_ICONS[segment.id];

						return (
							<button
								key={segment.id}
								ref={(element) => {
									segmentRefs.current[index] = element;
								}}
								type="button"
								className="project-seg-button"
								aria-pressed={activeSegment === segment.id}
								onClick={() => selectSegment(segment.id)}
							>
								<SegmentIcon aria-hidden="true" />
								{segment.label}
								<span className="project-seg-count">
									{segment.count}
								</span>
							</button>
						);
					})}
				</div>
				<p className="sr-only" aria-live="polite">
					{filteredProjects.length}{' '}
					{filteredProjects.length === 1 ? 'project' : 'projects'}
				</p>
			</div>

			{filteredProjects.length === 0 ? (
				<div className="project-empty">
					<p>
						No {SEGMENT_LABELS[activeSegment].toLowerCase()} projects
						yet.
					</p>
					<button type="button" onClick={resetFilter}>
						See all {projects.length}
					</button>
				</div>
			) : (
				<div
					key={activeSegment}
					className="project-gallery"
				>
					{filteredProjects.map((project, index) => {
						const primaryHref =
							project.liveUrl ?? project.repoLinks?.[0]?.href;
						const primaryRepo = project.liveUrl
							? undefined
							: project.repoLinks?.[0];
						const secondaryLinks = (project.repoLinks ?? [])
							.filter((link) => link.href !== primaryHref)
							.slice(0, 1);
						const cardStyle: ProjectCardStyle = {
							'--project-accent': project.accent,
							'--i': Math.min(index, 5),
						};

						return (
							<article
								key={project.title}
								className="project-card"
								style={cardStyle}
							>
								{primaryHref ? (
									<a
										className="project-media"
										href={primaryHref}
										target="_blank"
										rel="noopener noreferrer"
										tabIndex={-1}
										aria-hidden="true"
									>
										<ProjectMedia
											project={project}
											decorative={Boolean(primaryHref)}
										/>
									</a>
								) : (
									<div className="project-media">
										<ProjectMedia
											project={project}
											decorative={Boolean(primaryHref)}
										/>
									</div>
								)}

								<div className="project-card-body">
									<div className="project-title-row">
										<h3 className="project-title">
											{primaryHref ? (
												<a
													href={primaryHref}
													target="_blank"
													rel="noopener noreferrer"
													aria-label={
														primaryRepo
															? `${project.title} on ${primaryRepo.label}`
															: undefined
													}
												>
													{project.title}
													<FiExternalLink
														className="project-title-arrow"
														aria-hidden="true"
													/>
												</a>
											) : (
												project.title
											)}
										</h3>

										{secondaryLinks.length > 0 && (
											<div className="project-links">
												{secondaryLinks.map((link) => (
													<a
														key={`${link.label}-${link.href}`}
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														className={
															link.label ===
															'GitHub'
																? 'project-link project-link-icon'
																: 'project-link'
														}
														aria-label={`${project.title} on ${link.label}`}
														title={link.label}
													>
														{link.label ===
														'GitHub' ? (
															<FiGithub aria-hidden="true" />
														) : (
															link.label
														)}
													</a>
												))}
											</div>
										)}
									</div>

									<p className="project-summary">
										{project.summary}
									</p>

									<p className="project-meta">
										<span
											className="project-status-dot"
											data-status={project.status}
											aria-hidden="true"
										/>
										<span>{project.status}</span>
										<span aria-hidden="true">·</span>
										<span className="project-kind">
											{project.kind}
										</span>
									</p>
								</div>
							</article>
						);
					})}
				</div>
			)}
		</section>
	);
};

function ProjectMedia({
	project,
	decorative = true,
}: {
	project: ProjectItem;
	decorative?: boolean;
}) {
	const [failed, setFailed] = useState(false);

	if (!project.preview || failed) {
		return (
			<span className="project-plate" aria-hidden="true">
				<span className="project-plate-mono">
					{initials(project.title)}
				</span>
				<span className="project-plate-rule" />
				<span className="project-plate-caption">
					{project.stack.slice(0, 3).join(' · ')}
				</span>
			</span>
		);
	}

	const alt = decorative ? '' : project.preview.alt;
	const hidden = decorative ? true : undefined;
	const onError = () => setFailed(true);

	if (project.preview.kind === 'phone') {
		return (
			<span className="project-phone">
				<img
					src={project.preview.src}
					alt={alt}
					aria-hidden={hidden}
					width={780}
					height={1690}
					loading="lazy"
					decoding="async"
					onError={onError}
					className="project-shot"
				/>
			</span>
		);
	}

	return (
		<img
			src={project.preview.src}
			alt={alt}
			aria-hidden={hidden}
			width={1400}
			height={1120}
			loading="lazy"
			decoding="async"
			onError={onError}
			className="project-shot"
		/>
	);
}

export default Projects;
