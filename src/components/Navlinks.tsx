import React, { useEffect, useRef, useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { VscPerson } from 'react-icons/vsc';
import { Link } from 'react-scroll';
import { AiOutlineProject } from 'react-icons/ai';
import { MdOutlineContactSupport } from 'react-icons/md';
import { IconProps } from './@types';
import { nav } from '../data/content/navlinks';

const Navigation = () => {
	const [iconState, setIconState] = useState<IconProps>({
		activeObject: null,
		objects: nav,
	});

	const refs = useRef<(HTMLDivElement | null)[]>([]);
	console.log('🚀 ~ file: Navlinks.tsx:60 ~ Navigation ~ ref:', refs);

	const [test, setTest] = useState<boolean>(false);
	console.log('🚀 ~ file: Navlinks.tsx:20 ~ Navigation ~ test:', test);

	useEffect(() => {
		const observer = new IntersectionObserver(
			() => {
				(entries: IntersectionObserverEntry[]) => {
					entries.forEach((entry, index) => {
						const divId = Number(entry.target.getAttribute('data-id'));
						if (entry.isIntersecting) {
							setTest(entry.isIntersecting);
						}
						// if (entry.isIntersecting) {
						// 	setIconState({ ...iconState, activeObject: index });
						// 	toggleActiveIcon(index);
						// 	toggleActiveName(index);
						// 	setTest(index);
						// }
					});
				};
			},
			{
				root: null,
				rootMargin: '-300px',
				threshold: 0.5,
			}
		);

		refs.current.forEach((ref) => {
			if (ref) {
				observer.observe(ref);
			}
		});

		return () => {
			observer.disconnect();
		};
	}, [refs]);

	function toggleActive(index: number) {
		setIconState({ ...iconState, activeObject: index });
	}

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
								ref={(ref) => (refs.current[index] = ref)}
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
