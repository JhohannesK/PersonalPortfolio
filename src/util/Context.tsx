import { ReactNode, createContext, useRef, useState } from 'react';
import { IconProps } from '../components/@types';
import { nav } from '../data/content/navlinks';

interface IAppContext {
	heroState: boolean;
	setHeroState: React.Dispatch<React.SetStateAction<boolean>>;
	aboutState: boolean;
	setAboutState: React.Dispatch<React.SetStateAction<boolean>>;
	iconState: IconProps;
	setIconState: React.Dispatch<React.SetStateAction<IconProps>>;
	contactState: boolean;
	setContactState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const appContext = createContext<IAppContext>({
	heroState: false,
	setHeroState: () => {},
	aboutState: false,
	setAboutState: () => {},
	iconState: { activeObject: null, objects: nav },
	setIconState: () => {},
	contactState: false,
	setContactState: () => {},
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [heroState, setHeroState] = useState(false);
	const [aboutState, setAboutState] = useState(false);
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
		contactState,
		setContactState,
	};

	return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
