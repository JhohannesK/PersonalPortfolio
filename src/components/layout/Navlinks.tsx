import React, { useContext, useEffect } from 'react';
import { Link } from 'react-scroll';
import { nav } from '../../data/content/navlinks';
import { appContext } from '../../util/Context';

const Navigation = () => {
	const {
		iconState,
		setIconState,
		heroState,
		aboutState,
		projectsState,
		contactState,
	} = useContext(appContext);

	function toggleActive(index: number) {
		setIconState({ ...iconState, activeObject: index });
	}

	useEffect(() => {
		if (heroState) {
			toggleActive(0);
		} else if (aboutState) {
			toggleActive(1);
		} else if (projectsState) {
			toggleActive(2);
		} else if (contactState) {
			toggleActive(3);
		}
	}, [heroState, aboutState, projectsState, contactState]);

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

	return (
		<div className=''>
			<nav className='site-nav fixed bottom-[2rem] left-[50%] z-10 flex h-20 -translate-x-1/2 items-center rounded-full px-8 text-accent-soft'>
				<div className='flex items-center justify-center uppercase font-bold text-sm gap-x-10'>
					{nav.map((item, index) => {
						const isActive =
							iconState.objects[index].id === iconState.activeObject;

						return (
							<div
								key={index}
								className={`nav-item ${isActive ? 'nav-item--active' : ''} relative flex flex-col items-center justify-center`}
								data-id={index}
							>
								<Link
									activeClass='active'
									to={item.to}
									href={`#${item.to}`}
									spy={true}
									smooth={true}
									offset={item.offset}
									duration={700}
									aria-label={item.name}
									aria-current={isActive ? 'location' : undefined}
									className='cursor-pointer flex items-center justify-center'
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
								<span className={toggleActiveName(index)} aria-hidden='true'>
									{item.name}{' '}
								</span>
								{!isActive && (
									<span className='nav-hover-label' aria-hidden='true'>
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
