import { createContext, useState } from 'react';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { IconProps } from '../components/@types';
import { nav } from '../data/content/navlinks';

interface IAppContext {
	heroState: boolean;
	setHeroState: Dispatch<SetStateAction<boolean>>;
	aboutState: boolean;
	setAboutState: Dispatch<SetStateAction<boolean>>;
	projectsState: boolean;
	setProjectsState: Dispatch<SetStateAction<boolean>>;
	iconState: IconProps;
	setIconState: Dispatch<SetStateAction<IconProps>>;
	contactState: boolean;
	setContactState: Dispatch<SetStateAction<boolean>>;
}

export const appContext = createContext<IAppContext>({
	heroState: false,
	setHeroState: () => {},
	aboutState: false,
	setAboutState: () => {},
	projectsState: false,
	setProjectsState: () => {},
	iconState: { activeObject: null, objects: nav },
	setIconState: () => {},
	contactState: false,
	setContactState: () => {},
});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [heroState, setHeroState] = useState(false);
	const [aboutState, setAboutState] = useState(false);
	const [projectsState, setProjectsState] = useState(false);
	const [contactState, setContactState] = useState(false);
	const [iconState, setIconState] = useState<IconProps>({
		activeObject: null,
		objects: nav,
	});

	const value = {
		iconState,
		setIconState,
		heroState,
		setHeroState,
		aboutState,
		setAboutState,
		projectsState,
		setProjectsState,
		contactState,
		setContactState,
	};

	return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
