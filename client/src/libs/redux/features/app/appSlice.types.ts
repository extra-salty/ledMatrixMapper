export type AppT = {
	themeMode: ThemeModeT;
	activeMainTab: MainTabs;
	activeAnimationCreatorTabs: {
		activeLeftTab: AnimationCreatorLeftTabs;
		activeRightTab: AnimationCreatorRightTabs;
	};
};

export type ThemeModeT = 'dark' | 'light';

export enum MainTabs {
	animationCreator = 'animationCreator',
	effectCreator = 'effectCreator',
}

export enum AnimationCreatorLeftTabs {
	animations = 'animations',
	effects = 'effects',
	player = 'player',
}

export enum AnimationCreatorRightTabs {
	editor = 'Editor',
	setting = 'Settings',
}
