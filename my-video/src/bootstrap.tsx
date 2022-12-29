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
		{frame, config, continueRender}: {frame: number; config: VideoConfig, continueRender: () => void}
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
			/**
			 * Stubbing these contexts, is important so hooks like `useVideoConfig()` and `useCurrentFrame()` can continue to work.
			 * 
			 * In the future, it may be helpful to provide a context provider such as:
			 * @example
			 * <RemoteComposition frame={frame} config={config}>
			 * 	{children}
			 * </RemoteComposition>
			 */
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
		/**
		 * Ideally, continueRender should be called in a useEffect(), that runs after the component is fully loaded
		 */
		continueRender()
	},
};
