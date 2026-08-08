import { useRef, type ReactElement } from 'react';

export interface AboutBentoItem {
	title: string;
	icon: ReactElement;
	abb: string;
}

type Props = {
	item: AboutBentoItem;
	index: number;
	className?: string;
};

export default function AboutBentoCard({ item, index, className = '' }: Props) {
	const rootRef = useRef<HTMLDivElement>(null);

	const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const el = rootRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - 0.5;
		const py = (e.clientY - r.top) / r.height - 0.5;
		el.style.setProperty('--tilt-x', `${py * -14}deg`);
		el.style.setProperty('--tilt-y', `${px * 14}deg`);
		el.style.setProperty('--glare-x', `${px * 200 + 50}%`);
		el.style.setProperty('--glare-y', `${py * 200 + 50}%`);
	};

	const onLeave = () => {
		const el = rootRef.current;
		if (!el) return;
		el.style.setProperty('--tilt-x', '0deg');
		el.style.setProperty('--tilt-y', '0deg');
		el.style.setProperty('--glare-x', '50%');
		el.style.setProperty('--glare-y', '50%');
	};

	return (
		<div
			className={`about-bento-wrap h-full min-h-[11rem] ${className}`}
			style={{ '--stagger': index } as React.CSSProperties}
		>
			<div
				ref={rootRef}
				className='about-bento-card group h-full'
				onMouseMove={onMove}
				onMouseLeave={onLeave}
			>
				<div className='about-bento-card-inner'>
					<div className='about-bento-glare' aria-hidden />
					<div className='about-bento-icon'>{item.icon}</div>
					<h3 className='about-bento-title'>{item.title}</h3>
					<p className='about-bento-desc'>{item.abb}</p>
				</div>
			</div>
		</div>
	);
}
