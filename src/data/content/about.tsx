import { GiStarMedal } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import { SiFiles } from 'react-icons/si';
import type { ReactElement } from 'react';

interface IAbout {
	title: string;
	icon: ReactElement;
	abb: string;
}

export const about: IAbout[] = [
	{
		title: 'Experience',
		icon: <GiStarMedal />,
		abb: '+2 year of experience',
	},
	{
		title: 'Clients',
		icon: <BsPeopleFill />,
		abb: '+10 clients worldwide',
	},
	{
		title: 'Projects',
		icon: <SiFiles />,
		abb: '+30 projects done',
	},
];
