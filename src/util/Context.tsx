import { ReactNode, createContext, useRef, useState } from 'react';
import { IconProps } from '../components/@types';
import { nav } from '../data/content/navlinks';

interface IAppContext {
	heroState: boolean;
	setHeroState: React.Dispatch<React.SetStateAction<boolean>>;
	aboutState: boolean;
	setAboutState: React.Dispatch<React.SetStateAction<boolean>>;
	projectState: boolean;
	setProjectState: React.Dispatch<React.SetStateAction<boolean>>;
	iconState: IconProps;
	setIconState: React.Dispatch<React.SetStateAction<IconProps>>;
}

export const appContext = createContext<IAppContext>({
	heroState: false,
	setHeroState: () => {},
	aboutState: false,
	setAboutState: () => {},
	projectState: false,
	setProjectState: () => {},
	iconState: { activeObject: null, objects: nav },
	setIconState: () => {},
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [heroState, setHeroState] = useState(false);
	const [aboutState, setAboutState] = useState(false);
	const [projectState, setProjectState] = useState(false);
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
		projectState,
		setProjectState,
	};

	return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
