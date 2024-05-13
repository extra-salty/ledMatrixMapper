'use client';
import { useDispatch } from 'react-redux';
import { useActiveAnimationCreatorTabs } from '@/libs/redux/features/app/selector';
import { appActions } from '@/libs/redux/features/app/slice';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
	AnimationCreatorLeftTabs,
	AnimationCreatorRightTabs,
} from '@/libs/redux/features/app/appSlice.types';
import Animations from '@/components/home/Animations/Animations';
import Playlist from '@/components/home/Playlist/Playlist';
import Effects from '@/components/home/Effects/Effects';
import ResizeHandle from '@/components/misc/ResizeHandle/ResizeHandle';
import AnimationPlayerWrapper from '@/components/home/AnimationPlayer/AnimationPlayerWrapper/AnimationPlayerWrapper';

const AnimationCreator = () => {
	const dispatch = useDispatch();
	const { activeLeftTab, activeRightTab } = useActiveAnimationCreatorTabs();

	const handleLeftTabChange = (
		event: React.SyntheticEvent,
		tab: AnimationCreatorLeftTabs,
	) => dispatch(appActions.setAnimationCreatorLeftTab(tab));

	const handleRightTabChange = (
		event: React.SyntheticEvent,
		tab: AnimationCreatorRightTabs,
	) => dispatch(appActions.setAnimationCreatorRightTab(tab));

	return (
		<PanelGroup direction='horizontal'>
			<Panel defaultSize={30} minSize={30}>
				<TabContext value={activeLeftTab}>
					<TabList onChange={handleLeftTabChange} aria-label='lab API tabs example'>
						<Tab label='Animations' value={AnimationCreatorLeftTabs.animations} />
						<Tab label='Effects' value={AnimationCreatorLeftTabs.effects} />
						<Tab label='Player' value={AnimationCreatorLeftTabs.player} />
					</TabList>
					<TabPanel value={AnimationCreatorLeftTabs.animations}>
						<Animations />
					</TabPanel>
					<TabPanel value={AnimationCreatorLeftTabs.effects}>
						<Effects />
					</TabPanel>
					<TabPanel value={AnimationCreatorLeftTabs.player}>
						<AnimationPlayerWrapper />
					</TabPanel>
				</TabContext>
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={70} minSize={40}>
				<TabContext value={activeRightTab}>
					<TabList onChange={handleRightTabChange} aria-label='lab API tabs example'>
						<Tab label='Editor' value={AnimationCreatorRightTabs.editor} />
						<Tab label='Setting' value={AnimationCreatorRightTabs.setting} disabled />
					</TabList>
					<TabPanel value={AnimationCreatorRightTabs.editor}>
						<Playlist />
					</TabPanel>
					<TabPanel value={AnimationCreatorRightTabs.setting}></TabPanel>
				</TabContext>
			</Panel>
		</PanelGroup>
	);
};

export default AnimationCreator;
