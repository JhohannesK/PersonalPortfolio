import { GiStarMedal } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import { SiFiles } from 'react-icons/si';
import { IconType } from 'react-icons';

interface IAbout {
	title: string;
	icon: JSX.Element;
	abb: string;
}

export const about: IAbout[] = [
	{
		title: 'Experience',
		icon: <GiStarMedal />,
		abb: '+1 year of experience',
	},
	{
		title: 'Clients',
		icon: <BsPeopleFill />,
		abb: '+20 clients worldwide',
	},
	{
		title: 'Projects',
		icon: <SiFiles />,
		abb: '+10 projects done',
	},
];
