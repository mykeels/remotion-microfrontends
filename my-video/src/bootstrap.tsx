import * as ReactDOM from 'react-dom/client';
import {MyComposition} from './Composition';
import {
	TimelineContextValue,
	VideoConfig,
	CompositionManager,
	CompositionManagerContext,
	CanUseRemotionHooks,
	TimelineContext,
} from 'remotion';

export default {
	mount: (
		ref: string | HTMLElement,
		{frame, config}: {frame: number; config: VideoConfig}
	) => {
		const container =
			ref instanceof HTMLElement ? ref : document.getElementById(ref);
		if (!container) {
			throw new Error('No container found');
		}
		const root = container.hasAttribute('data-react-root')
			? (container as unknown as {reactRoot: ReactDOM.Root}).reactRoot
			: ReactDOM.createRoot(container);
		(container as unknown as {reactRoot: ReactDOM.Root}).reactRoot = root;
		container.setAttribute('data-react-root', 'true');
		root.render(
			<CanUseRemotionHooks.Provider value>
				<CompositionManager.Provider
					value={
						{
							compositions: [
								{
									id: 'idMustMatch',
								},
							],
							currentComposition: 'idMustMatch',
							currentCompositionMetadata: {
								defaultProps: config.defaultProps,
								durationInFrames: config.durationInFrames,
								fps: config.fps,
								height: config.height,
								width: config.width,
							},
						} as CompositionManagerContext
					}
				>
					<TimelineContext.Provider
						value={
							{
								frame,
							} as TimelineContextValue
						}
					>
						<MyComposition />
					</TimelineContext.Provider>
				</CompositionManager.Provider>
			</CanUseRemotionHooks.Provider>
		);
	},
};
