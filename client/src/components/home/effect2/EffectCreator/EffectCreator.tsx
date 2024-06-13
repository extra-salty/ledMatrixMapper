'use client';
import { useMemo } from 'react';
import { useActiveEffect } from '@/libs/redux/features/effects/data/selector';
import { Box } from '@mui/material';
import { Panel, PanelGroup } from 'react-resizable-panels';
import ResizeHandle from '@/components/misc/ResizeHandle/ResizeHandle';
import EffectPlayerToolbar from '@/components/temp/PlayerComps/EffectPlayerToolbar/EffectPlayerToolbar';
import EffectPlayer from '@/components/temp/PlayerComps/EffectPlayer/EffectPlayer';
import EffectToolbar from '../../Effect/EffectToolbar/EffectToolbar';
import FrameGridWrapper from '../../Effect/FrameGridWrapper/FrameGridWrapper';
import EffectDetails from '../../Effect/Actions/EffectDetails/EffectDetails';
import ColorHistory from '../../Effect/EffectToolbar/ColorHistory/ColorHistory';

const EffectCreator = () => {
	const activeEffect = useActiveEffect();

	const order = useMemo(() => activeEffect?.order || [], [activeEffect]);
	const frames = useMemo(() => activeEffect?.frames || {}, [activeEffect]);

	const framesArr = useMemo(
		() =>
			order.map((frameId) => frames[frameId]).filter((frame) => !frame.disabled) || [],
		[order, frames],
	);

	return (
		<PanelGroup direction='horizontal'>
			<Panel defaultSize={20} minSize={20} maxSize={40}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<EffectPlayerToolbar />
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							padding: 4,
							gap: 4,
						}}
					>
						<EffectPlayer frames={framesArr} />
						<EffectDetails
							name={activeEffect?.name}
							description={activeEffect?.description}
						/>
					</Box>
				</Box>
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={70} minSize={50}>
				<Box sx={{ height: '100%', display: 'flex' }}>
					<Box
						sx={{
							height: '100%',
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<EffectToolbar activeEffect={activeEffect} />
						<FrameGridWrapper effect={activeEffect} />
					</Box>
					<ColorHistory />
				</Box>
			</Panel>
		</PanelGroup>
	);
};

export default EffectCreator;
