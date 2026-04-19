import { useContext, useEffect, useRef, useState } from 'react';
import { appContext } from '../util/Context';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const links = [
	{
		href: 'https://www.twitter.com/_jhohannes',
		label: 'Twitter / X',
		hint: 'Updates & threads',
		icon: FaTwitter,
		accent: 'from-sky-400/30 to-sky-600/10',
	},
	{
		href: 'https://www.github.com/jhohannesK',
		label: 'GitHub',
		hint: 'Code & experiments',
		icon: FaGithub,
		accent: 'from-zinc-300/25 to-zinc-600/10',
	},
	{
		href: 'mailto:jdomeh77@gmail.com',
		label: 'Email',
		hint: 'Direct line',
		icon: SiGmail,
		accent: 'from-red-400/25 to-amber-500/10',
	},
] as const;

const Contact = () => {
	const contactRef = useRef<HTMLDivElement>(null);
	const [revealed, setRevealed] = useState(false);
	const { setContactState } = useContext(appContext);

	useEffect(() => {
		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) setRevealed(true);

		const observer = new IntersectionObserver(
			([entry]) => {
				setContactState(entry.isIntersecting);
				if (entry.isIntersecting) setRevealed(true);
			},
			{ threshold: 0.22, rootMargin: '0px 0px -10% 0px' }
		);

		const node = contactRef.current;
		if (node) observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<section
			id='contact'
			ref={contactRef}
			className={`contact-section relative px-5 pb-28 pt-20 md:pb-36 md:pt-28 ${revealed ? 'contact-section--visible' : ''}`}
		>
			<div className='contact-ambient' aria-hidden />
			<div className='contact-noise' aria-hidden />
			<div className='contact-grid-radial' aria-hidden />
			<div className='contact-glow-orb' aria-hidden />

			<div className='relative z-10 mx-auto max-w-5xl'>
				<div className='text-center'>
					<p className='contact-kicker font-mono text-xs font-semibold uppercase tracking-[0.35em] text-yellow-300/90'>
						Connect
					</p>
					<h2 className='contact-headline font-Maconda mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl md:tracking-tighter'>
						<span className='contact-headline-shimmer'>Let&apos;s build</span>
					</h2>
					<p className='contact-intro mx-auto mt-4 max-w-xl text-sm text-zinc-400 md:text-base'>
						Products, prototypes, shaders, infra — if it ships in a browser or
						on the edge, I&apos;m interested.
					</p>
				</div>

				<div className='contact-preface mx-auto mt-10 max-w-3xl'>
					<div className='contact-preface-inner'>
						<p className='text-left text-xs font-mono uppercase tracking-widest text-zinc-500'>
							Availability
						</p>
						<p className='mt-2 text-left text-base font-medium text-zinc-200 md:text-lg'>
							Taking select collaborations &amp; full-stack builds. Prefer async
							first — email gets the fastest thread.
						</p>
						<div className='mt-4 flex flex-wrap gap-2'>
							<span className='contact-chip'>TypeScript</span>
							<span className='contact-chip'>React</span>
							<span className='contact-chip'>Node</span>
							<span className='contact-chip'>WebGL curious</span>
						</div>
					</div>
				</div>

				<div className='mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5'>
					{links.map(({ href, label, hint, icon: Icon, accent }, i) => (
						<a
							key={label}
							href={href}
							target={href.startsWith('http') ? '_blank' : undefined}
							rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
							className='contact-link-card group'
							style={{ '--contact-stagger': i } as React.CSSProperties}
						>
							<div className='contact-link-card-glow' aria-hidden />
							<div
								className={`contact-link-icon bg-gradient-to-br ${accent}`}
								aria-hidden
							>
								<Icon className='text-2xl text-zinc-100 transition-transform duration-300 group-hover:scale-110' />
							</div>
							<div className='min-w-0 flex-1 text-left'>
								<p className='text-base font-semibold text-zinc-100'>{label}</p>
								<p className='mt-0.5 text-xs text-zinc-500'>{hint}</p>
							</div>
							<span className='contact-link-chevron' aria-hidden>
								→
							</span>
						</a>
					))}
				</div>
			</div>
		</section>
	);
};

export default Contact;
