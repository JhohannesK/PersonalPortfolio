import { useEffect, useRef, useState } from 'react';
import { FaCalendarAlt, FaGithub, FaTwitter } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import GhanaTimeZone from './GhanaTimeZone';

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
	{
		href: 'https://calendly.com/jdomeh77',
		label: 'Book a call',
		hint: 'Calendly',
		icon: FaCalendarAlt,
		accent: 'from-yellow-300/30 to-amber-600/10',
	},
] as const;

const Contact = () => {
	const contactRef = useRef<HTMLDivElement>(null);
	const [revealed, setRevealed] = useState(false);

	useEffect(() => {
		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) setRevealed(true);

		const observer = new IntersectionObserver(
			([entry]) => {
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
			className={`contact-section relative z-10 px-5 pb-28 pt-20 md:pb-36 md:pt-28 ${revealed ? 'contact-section--visible' : ''}`}
		>
			<div className='relative z-10 mx-auto max-w-5xl'>
				<div className='text-center'>
					<p className='contact-kicker text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft/90'>
						Connect
					</p>
					<h2 className='contact-headline mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl md:tracking-tighter'>
						<span className='contact-headline-shimmer'>Let&apos;s build</span>
					</h2>
					<p className='contact-intro mx-auto mt-4 max-w-xl text-sm text-muted md:text-base'>
						Products, prototypes, shaders, infra — if it ships in a browser or
						on the edge, I&apos;m interested.
					</p>
				</div>

				<div className='contact-preface mx-auto mt-10 max-w-3xl'>
					<div className='contact-preface-inner'>
						<p className='text-left text-xs uppercase tracking-widest text-muted-strong'>
							Availability
						</p>
						<p className='mt-2 text-left text-base font-medium text-fg-secondary md:text-lg'>
							Taking select collaborations &amp; full-stack builds. Prefer async
							first — or book a quick call.
						</p>
						<div className='mt-4 flex flex-wrap gap-2'>
							<span className='contact-chip'>TypeScript</span>
							<span className='contact-chip'>React</span>
							<span className='contact-chip'>Node</span>
							<span className='contact-chip'>WebGL curious</span>
						</div>
					</div>
				</div>

				<div className='contact-preface mx-auto max-w-md'>
					<GhanaTimeZone />
				</div>

				<div className='mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5'>
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
								<Icon className='text-2xl text-fg transition-transform duration-300 group-hover:scale-110' />
							</div>
							<div className='min-w-0 flex-1 text-left'>
								<p className='text-base font-semibold text-fg'>{label}</p>
								<p className='mt-0.5 text-xs text-muted-strong'>{hint}</p>
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
