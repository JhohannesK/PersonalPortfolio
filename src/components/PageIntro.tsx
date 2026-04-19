import { useEffect, useRef, useState } from 'react';

type Phase = 'loading' | 'splash';

const ACCENT = '#facc15';
const ACCENT_SUBTLE = 'rgba(250,204,21,0.16)';
const DANGER = '#ef4444';
const BG = '#09090b';
const LOAD_DURATION_MS = 2600;
const EASE_INTRO = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_EXIT = 'cubic-bezier(0.4, 0, 1, 1)';

function easeOutCubic(t: number) {
	return 1 - (1 - t) ** 3;
}

export default function PageIntro({ children }: { children: React.ReactNode }) {
	const [phase, setPhase] = useState<Phase>('loading');
	const [dismissed, setDismissed] = useState(false);
	const [loadPct, setLoadPct] = useState(0);
	const [splashEntered, setSplashEntered] = useState(false);
	const [overlayExiting, setOverlayExiting] = useState(false);
	const rafRef = useRef<number>(0);
	const reduceMotionRef = useRef(
		typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches,
	);

	useEffect(() => {
		if (phase !== 'loading') return;

		if (reduceMotionRef.current) {
			setLoadPct(100);
			const t = window.setTimeout(() => setPhase('splash'), 120);
			return () => window.clearTimeout(t);
		}

		const start = performance.now();
		const tick = (now: number) => {
			const raw = Math.min(1, (now - start) / LOAD_DURATION_MS);
			const eased = easeOutCubic(raw);
			setLoadPct(Math.min(100, Math.round(eased * 100)));
			if (raw < 1) {
				rafRef.current = requestAnimationFrame(tick);
			} else {
				setLoadPct(100);
				window.setTimeout(() => setPhase('splash'), 200);
			}
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafRef.current);
	}, [phase]);

	useEffect(() => {
		if (phase !== 'splash') return;
		const id = requestAnimationFrame(() => setSplashEntered(true));
		return () => cancelAnimationFrame(id);
	}, [phase]);

	useEffect(() => {
		if (dismissed) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, [dismissed]);

	function handleStart() {
		if (reduceMotionRef.current) {
			setDismissed(true);
			return;
		}
		setOverlayExiting(true);
	}

	function handleOverlayTransitionEnd(e: React.TransitionEvent) {
		if (e.propertyName !== 'opacity' || !overlayExiting) return;
		setDismissed(true);
	}

	const ringR = 52;
	const ringC = 2 * Math.PI * ringR;
	const dashOffset = ringC - (loadPct / 100) * ringC;
	const pctLabel = String(loadPct).padStart(2, '0');

	if (dismissed) {
		return <>{children}</>;
	}

	return (
		<>
			<div
				className="relative z-0 min-h-screen"
				inert={!dismissed ? true : undefined}
				aria-hidden={!dismissed}
			>
				{children}
			</div>

			<div
				className="page-intro-overlay fixed inset-0 z-1000 flex flex-col items-center justify-center"
				style={{
					backgroundColor: BG,
					opacity: overlayExiting ? 0 : 1,
					transition: `opacity 240ms ${EASE_EXIT}`,
					pointerEvents: overlayExiting ? 'none' : 'auto',
				}}
				onTransitionEnd={handleOverlayTransitionEnd}
			>
				<div
					className="page-intro-loading absolute inset-0 z-0 flex flex-col items-center justify-center gap-10 px-6"
					style={{
						opacity: phase === 'loading' ? 1 : 0,
						transform: phase === 'loading' ? 'scale(1)' : 'scale(0.98)',
						transition: `opacity 360ms ${EASE_INTRO}, transform 360ms ${EASE_INTRO}`,
						pointerEvents: phase === 'loading' ? 'auto' : 'none',
					}}
					aria-live="polite"
					aria-busy={phase === 'loading'}
				>
					<div className="relative flex h-[min(52vw,220px)] w-[min(52vw,220px)] items-center justify-center">
						<svg
							className="absolute inset-0 h-full w-full -rotate-90"
							viewBox="0 0 120 120"
							aria-hidden
						>
							<circle
								cx="60"
								cy="60"
								r={ringR}
								fill="none"
								stroke={ACCENT_SUBTLE}
								strokeWidth="1.5"
							/>
							<circle
								cx="60"
								cy="60"
								r={ringR}
								fill="none"
								stroke={ACCENT}
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeDasharray={ringC}
								strokeDashoffset={dashOffset}
								style={{
									transition: reduceMotionRef.current
										? 'none'
										: `stroke-dashoffset 80ms ${EASE_INTRO}`,
								}}
							/>
						</svg>
						<div className="relative z-1 flex flex-col items-center gap-1 text-center">
							<p
								className="text-[10px] font-medium uppercase tracking-[0.55em] text-yellow-400/80"
								style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
							>
								Start
							</p>
							<p
								className="flex items-baseline gap-0.5 tabular-nums text-yellow-400"
								style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
							>
								<span className="text-4xl font-light tracking-tight sm:text-5xl">{pctLabel}</span>
								<span className="text-lg font-light opacity-90">%</span>
							</p>
						</div>
					</div>
				</div>

				<div
					className="page-intro-splash relative z-1 flex flex-col items-center gap-10 px-6"
					style={{
						opacity: phase === 'splash' ? (splashEntered ? 1 : 0) : 0,
						transform:
							phase === 'splash' && splashEntered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
						transition: `opacity 420ms ${EASE_INTRO} 40ms, transform 420ms ${EASE_INTRO} 40ms`,
						pointerEvents: phase === 'splash' ? 'auto' : 'none',
					}}
				>
					<p className="font-Source-code text-[1.3rem] tracking-wide font-semibold text-yellow-400 sm:text-[1.5rem]">
						<code>
							{'<'}Domeh.<span style={{ color: DANGER }}>sh</span>
							{'/>'}
						</code>
					</p>
					<button
						type="button"
						onClick={handleStart}
						aria-label="Enter portfolio"
						className="page-intro-start border border-yellow-400 bg-transparent px-10 py-3 text-[11px] font-medium uppercase tracking-[0.45em] text-yellow-400 outline-none select-none"
						style={{
							fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
							borderRadius: '9999px',
							transition: `transform 140ms cubic-bezier(0.23, 1, 0.32, 1), border-color 140ms ease, color 140ms ease, background-color 200ms ease`,
						}}
					>
						Start
					</button>
				</div>
			</div>
		</>
	);
}
