import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import { nav } from '../../data/content/navlinks';
import { appContext } from '../../util/Context';

// Scroll-spy: replaces the four per-section boolean observers that could never
// agree (Projects is taller than the viewport at its 0.3 threshold, Tech Stack
// had none, and instant jumps left every boolean false). One observer over all
// sections picks the best-matching section and drives the pill.
const SECTION_IDS = ['hero', 'about', 'projects', 'stack', 'contact'];
// #stack renders the Projects label in the nav.
const SECTION_LABEL_FOR: Record<string, string> = {
	stack: 'projects',
};

const Navigation = () => {
	const { iconState, setIconState } = useContext(appContext);
	const [activeIndex, setActiveIndex] = useState<number | null>(0);

	function toggleActive(index: number) {
		setIconState({ ...iconState, activeObject: index });
		setActiveIndex(index);
	}

	useEffect(() => {
		const elements = SECTION_IDS
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		const observer = new IntersectionObserver(
			(entries) => {
				const best = entries.reduce((prev, entry) => {
					if (!prev) return entry;
					return entry.intersectionRatio >= prev.intersectionRatio
						? entry
						: prev;
				});
				if (!best) return;

				const targetId = SECTION_LABEL_FOR[best.target.id] ?? best.target.id;
				const index = nav.findIndex((item) => item.to === targetId);
				if (index >= 0 && index !== activeIndex) {
					setActiveIndex(index);
					toggleActive(index);
				}
			},
			{ threshold: 0, rootMargin: '-45% 0px -45% 0px' },
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [activeIndex]);

	function toggleActiveIcon(index: number) {
		if (iconState.objects[index].id === iconState.activeObject) {
			return 'icon -translate-y-10 opacity-0';
		} else {
			return 'icon';
		}
	}

	function toggleActiveName(index: number) {
		if (iconState.objects[index].id === iconState.activeObject) {
			return 'text text--active';
		} else {
			return 'text';
		}
	}

	const isActive = (index: number) => iconState.objects[index].id === iconState.activeObject;

	return (
		<div className="">
			<nav className="site-nav fixed bottom-[2rem] left-[50%] z-10 flex h-14 -translate-x-1/2 items-center rounded-full px-8 text-accent-soft">
				<div className="flex items-center justify-center uppercase font-bold text-sm gap-x-10">
					{nav.map((item, index) => {
						const active = isActive(index);

						return (
							<div
								key={index}
								className={`nav-item ${active ? 'nav-item--active' : ''} relative flex flex-col items-center justify-center`}
								data-id={index}
							>
								<Link
									activeClass="active"
									to={item.to}
									href={`#${item.to}`}
									spy={true}
									smooth={true}
									offset={item.offset}
									duration={700}
									aria-label={item.name}
									aria-current={active ? 'location' : undefined}
									className="cursor-pointer flex items-center justify-center"
								>
									<div
										onClick={() => {
											toggleActive(index);
										}}
										className={toggleActiveIcon(index)}
									>
										{item.icon}
									</div>
								</Link>
								<span
									className={toggleActiveName(index)}
									aria-hidden="true"
								>
									{item.name}{' '}
								</span>
								{!active && (
									<span
										className="nav-hover-label"
										aria-hidden="true"
									>
										{item.name}
									</span>
								)}
							</div>
						);
					})}
				</div>
			</nav>
		</div>
	);
};

export default Navigation;
