import { createContext, useState } from 'react';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { IconProps } from '../components/shared/@types';
import { nav } from '../data/content/navlinks';

interface IAppContext {
	iconState: IconProps;
	setIconState: Dispatch<SetStateAction<IconProps>>;
}

export const appContext = createContext<IAppContext>({
	iconState: { activeObject: null, objects: nav },
	setIconState: () => {},
});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [iconState, setIconState] = useState<IconProps>({
		activeObject: 0,
		objects: nav,
	});

	const value = {
		iconState,
		setIconState,
	};

	return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
