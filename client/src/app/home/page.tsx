'use client';
import { useDispatch } from 'react-redux';
import { useActiveMainTab } from '@/libs/redux/features/app/selector';
import { appActions } from '@/libs/redux/features/app/slice';
import { MainTabs } from '@/libs/redux/features/app/appSlice.types';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AnimationCreator from '../../components/home/animation/AnimationCreator/AnimationCreator';
import EffectCreator from '../../components/home/effect2/EffectCreator/EffectCreator';

const Home = () => {
	const dispatch = useDispatch();
	const activeMainTab = useActiveMainTab();

	const handleChange = (event: React.SyntheticEvent, newValue: MainTabs) =>
		dispatch(appActions.setMainTab(newValue));

	return (
		<TabContext value={activeMainTab}>
			<TabList onChange={handleChange}>
				<Tab label='Animation Creator' value={MainTabs.animationCreator} />
				<Tab label='Effect Editor' value={MainTabs.effectCreator} />
			</TabList>
			<TabPanel value={MainTabs.animationCreator}>
				<AnimationCreator />
			</TabPanel>
			<TabPanel value={MainTabs.effectCreator}>
				<EffectCreator />
			</TabPanel>
		</TabContext>
	);
};

export default Home;
