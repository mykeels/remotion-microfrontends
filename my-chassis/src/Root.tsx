import {QueryClient, QueryClientProvider} from 'react-query';
import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import {Microfrontend, MicrofrontendProps} from './mfs';
import './style.css';

const MFComp = (props: MicrofrontendProps) => (
	<QueryClientProvider client={new QueryClient()}>
		<Microfrontend {...props} />
	</QueryClientProvider>
);

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={240}
				fps={30}
				width={1280}
				height={720}
			/>

			<Composition
				id="MFComp"
				component={MFComp}
				durationInFrames={240}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					scope: 'MyVideo',
					entry: 'http://localhost:3002/remoteEntry.js',
					module: './src/bootstrap',
					Loading: <div>...loading...</div>,
				}}
			/>
		</>
	);
};