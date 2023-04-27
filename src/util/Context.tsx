import { ReactNode, createContext, useRef, useState } from 'react';
import { IconProps } from '../components/@types';
import { nav } from '../data/content/navlinks';

interface IAppContext {
	heroRef: React.RefObject<HTMLDivElement>;
	aboutRef: React.RefObject<HTMLDivElement>;
	techStackRef: React.RefObject<HTMLDivElement>;
	iconState: IconProps;
	setIconState: React.Dispatch<React.SetStateAction<IconProps>>;
}

export const appContext = createContext<IAppContext>({
	heroRef: { current: null },
	aboutRef: { current: null },
	techStackRef: { current: null },
	iconState: { activeObject: null, objects: nav },
	setIconState: () => {},
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const aboutRef = useRef<HTMLDivElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);
	const techStackRef = useRef<HTMLDivElement>(null);
	const [iconState, setIconState] = useState<IconProps>({
		activeObject: null,
		objects: nav,
	});

	const value = { aboutRef, heroRef, techStackRef, iconState, setIconState };

	return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
