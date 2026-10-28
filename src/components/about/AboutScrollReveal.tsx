import { useEffect, useRef, useState } from 'react';
import {
	ABOUT_INTRO_ACCENT,
	ABOUT_INTRO_FULL,
} from '../../data/content/aboutStatement';

type WordToken = { text: string; accent: boolean };

function tokenize(full: string, accentPhrase: string): WordToken[] {
	const accentStart = full.indexOf(accentPhrase);
	const accentEnd = accentStart >= 0 ? accentStart + accentPhrase.length : -1;
	const raw = full.match(/\S+/g) ?? [];
	let searchFrom = 0;
	return raw.map((text) => {
		const start = full.indexOf(text, searchFrom);
		searchFrom = start + text.length;
		const accent =
			accentStart >= 0 &&
			start >= accentStart &&
			start + text.length <= accentEnd;
		return { text, accent };
	});
}

function clamp(n: number, a: number, b: number) {
	return Math.min(b, Math.max(a, n));
}

function scrollProgressThrough(el: HTMLElement | null) {
	if (!el) return 0;
	const rect = el.getBoundingClientRect();
	const h = el.offsetHeight;
	const winH = window.innerHeight;
	const denom = h - winH;
	if (denom <= 0) return 1;
	return clamp(-rect.top / denom, 0, 1);
}

// On mobile the sentence reveals by phrase instead of per word so each pixel
// of scroll moves something and nothing reads as lag.
const PHRASES: WordToken[] = [
	{ text: "I'm a selectively skilled", accent: false },
	{ text: 'software engineer', accent: true },
	{
		text: 'with strong focus on producing high quality & impactful software solutions.',
		accent: false,
	},
];

const CORAL = 'var(--accent)';
const FINISH_AT = 0.85; // reveal completes as the pin releases

export default function AboutScrollReveal() {
	const trackRef = useRef<HTMLDivElement>(null);
	const copyRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef(0);
	const [progress, setProgress] = useState(0);
	const [reducedMotion, setReducedMotion] = useState(false);
	const [isHoveringText, setIsHoveringText] = useState(false);
	const [mobile, setMobile] = useState<boolean>(
		typeof window !== 'undefined' && window.innerWidth < 768,
	);

	const words = useRef(tokenize(ABOUT_INTRO_FULL, ABOUT_INTRO_ACCENT)).current;
	const items = mobile ? PHRASES : words;
	const n = items.length;
	// Stagger items across 0 → FINISH_AT so the last one lands at 85%. Mobile
	// reveals by phrase (3 items) so each pixel of scroll moves something.
	const spread = mobile ? n / FINISH_AT : n + 4;
	const fadeWindow = mobile ? 1 : 2.2;

	const spotlightSize = isHoveringText ? 'clamp(180px, 24vw, 320px)' : '0px';
	const spotlightStyle = {
		backgroundColor: CORAL,
	};
	const overlayStyle = {
		clipPath: `circle(${spotlightSize} at var(--spot-x, 100%) var(--spot-y, 40%))`,
		WebkitClipPath: `circle(${spotlightSize} at var(--spot-x, 100%) var(--spot-y, 40%))`,
	};

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		setReducedMotion(mq.matches);
		const onMq = () => setReducedMotion(mq.matches);
		mq.addEventListener('change', onMq);

		const resizeMq = window.matchMedia('(max-width: 767px)');
		setMobile(resizeMq.matches);
		const onResizeMq = () => setMobile(resizeMq.matches);
		resizeMq.addEventListener('change', onResizeMq);

		const tick = () => {
			setProgress(scrollProgressThrough(trackRef.current));
		};
		const onScroll = () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			rafRef.current = requestAnimationFrame(tick);
		};

		tick();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		return () => {
			mq.removeEventListener('change', onMq);
			resizeMq.removeEventListener('change', onResizeMq);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<div
			ref={trackRef}
			className="about-scroll-track relative min-h-[120vh] md:min-h-[200vh] w-full"
		>
			<div className="about-scroll-sticky sticky top-0 flex min-h-[min(85svh,820px)] flex-col justify-center px-0 pb-16 pt-8 md:pb-24 md:pt-12">
				<h2 className="w-full text-center text-4xl font-bold uppercase tracking-wider sm:text-5xl">
					<span className="contact-headline-shimmer">About me</span>
				</h2>

				<div
					ref={copyRef}
					className="about-scroll-copy relative mx-auto mt-8 max-w-5xl text-center md:mt-10"
					onMouseEnter={() => setIsHoveringText(true)}
					onMouseLeave={() => setIsHoveringText(false)}
					onMouseMove={(e) => {
						const rect = e.currentTarget.getBoundingClientRect();
						if (!rect.width || !rect.height) return;
						const x = ((e.clientX - rect.left) / rect.width) * 100;
						const y = ((e.clientY - rect.top) / rect.height) * 100;
						const el = copyRef.current;
						if (!el) return;
						el.style.setProperty('--spot-x', `${x}%`);
						el.style.setProperty('--spot-y', `${y}%`);
					}}
				>
					<span
						className={`about-follow-dot ${isHoveringText ? 'about-follow-dot--active' : ''}`}
						style={spotlightStyle}
						aria-hidden
					/>
					<p className="about-scroll-lead relative z-20 text-center text-[clamp(1.65rem,4.5vw,3.35rem)] font-bold leading-[1.12] tracking-tight text-fg">
						{items.map((item, i) => {
							const t = reducedMotion
								? 1
								: clamp((progress * spread - i) / fadeWindow, 0, 1);
							const opacity = reducedMotion ? 1 : 0.08 + 0.92 * t;
							return (
								<span
									key={`${i}-${item.text}`}
									className={item.accent ? 'about-scroll-accent' : undefined}
									style={{
										opacity,
										color: item.accent ? CORAL : undefined,
										transition: reducedMotion
											? undefined
											: 'opacity 0.12s ease-out',
									}}
								>
									{item.text}
									{i < n - 1 ? ' ' : ''}
								</span>
							);
						})}
					</p>
					<p
						className="about-scroll-lead about-scroll-lead--overlay pointer-events-none absolute inset-0 z-30 text-center text-[clamp(1.65rem,4.5vw,3.35rem)] font-bold leading-[1.12] tracking-tight"
						style={overlayStyle}
						aria-hidden
					>
						{items.map((item, i) => {
							return (
								<span
									key={`overlay-${i}-${item.text}`}
									className={
										item.accent
											? 'about-scroll-accent about-scroll-accent--overlay'
											: undefined
									}
									style={{
										opacity: 1,
										color: '#111111',
									}}
								>
									{item.text}
									{i < n - 1 ? ' ' : ''}
								</span>
							);
						})}
					</p>
				</div>
			</div>
		</div>
	);
}
