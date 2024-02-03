import { AiOutlineProject } from 'react-icons/ai';
import { BiHomeAlt } from 'react-icons/bi';
import { MdOutlineContactSupport } from 'react-icons/md';
import { VscPerson } from 'react-icons/vsc';

export const nav = [
	{
		id: 0,
		offset: 0,
		icon: <BiHomeAlt />,
		name: 'Home',
		to: 'hero',
	},
	{
		id: 1,
		offset: 100,
		icon: <VscPerson />,
		name: 'About',
		to: 'about',
	},
	{
		id: 2,
		offset: 200,
		icon: <MdOutlineContactSupport />,
		name: 'Contact',
		to: 'contact',
	},
];
