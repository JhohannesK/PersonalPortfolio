export interface objProps {
	id: number;
	offset: number;
	icon: JSX.Element;
	name: string;
	to: string;
}

export interface IconProps {
	activeObject: number | null;
	objects: objProps[];
}
