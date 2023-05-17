import React from 'react';
import { appContext } from '../src/util/Context';

const useToggleClassName = () => {
	const { iconState } = React.useContext(appContext);

	function toggleActiveIcon(index: number) {
		if (iconState.objects[index].id === iconState.activeObject) {
			return 'icon -translate-y-10 opacity-0';
		} else {
			return 'icon';
		}
	}

	function toggleActiveName(index: number) {
		console.log(
			'🚀 ~ file: useToggle.tsx:16 ~ toggleActiveName ~ index:',
			index
		);
		if (iconState.objects[index].id === iconState.activeObject) {
			return 'text translate-y-5';
		} else {
			return 'text opacity-0';
		}
	}
	return {
		toggleActiveIcon,
		toggleActiveName,
	};
};

export default useToggleClassName;
