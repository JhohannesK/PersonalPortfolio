import React, { useContext, useEffect } from 'react';
import { Link } from 'react-scroll';
import { nav } from '../data/content/navlinks';
import { appContext } from '../util/Context';
import useToggleClassName from '../../hook/useToggle';

const Navigation = () => {
	const { iconState, setIconState, heroState, aboutState, contactState } =
		useContext(appContext);

	function toggleActive(index: number) {
		setIconState({ ...iconState, activeObject: index });
	}

	useEffect(() => {
		if (heroState) {
			toggleActive(0);
		} else if (aboutState) {
			toggleActive(1);
		} else if (contactState) {
			toggleActive(2);
		}
	}, [heroState, aboutState, contactState]);

	function toggleActiveIcon(index: number) {
		if (iconState.objects[index].id === iconState.activeObject) {
			return 'icon -translate-y-10 opacity-0';
		} else {
			return 'icon';
		}
	}

	function toggleActiveName(index: number) {
		if (iconState.objects[index].id === iconState.activeObject) {
			return 'text translate-y-5';
		} else {
			return 'text opacity-0';
		}
	}

	return (
		<div className=''>
			<nav className='fixed bottom-[2rem] left-[50%]  [transform:translateX(-50%)] flex items-center  text-yellow-300 sm:w-[360px] h-20 bg-zinc-700  bg-opacity-30 z-10 rounded-full px-5 '>
				<div className=' flex item-center justify-center  uppercase font-bold text-sm pl-12 font-mono w-full'>
					{nav.map((item, index) => {
						return (
							<div
								key={index}
								className='flex flex-col items-center pr-12 justify-center'
								data-id={index}
							>
								<Link
									activeClass='active'
									to={item.to}
									spy={true}
									smooth={true}
									offset={item.offset}
									duration={700}
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
								<span className={toggleActiveName(index)}>
									{item.name}{' '}
								</span>
							</div>
						);
					})}
				</div>
			</nav>
		</div>
	);
};

export default Navigation;
