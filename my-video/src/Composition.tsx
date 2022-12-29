import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import { Logo } from './Logo';
import { Subtitle } from './Subtitle';
import { Title } from './Title';

export const MyComposition = () => {
	const frame = useCurrentFrame();
	const config = useVideoConfig();
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center relative">
			<div className="m-10" />
			<Logo />
			<div className="m-3" />
			<Title />
			<Subtitle />
			<div className='m-10'>
				<div className="m-3">Current Frame: {frame}</div>
				<div className="m-3">Config:<br />
					<span className='m-3'>&nbsp;</span>
					<span>Duration in Frames: {config.durationInFrames}</span>,&nbsp;
					<span>FPS: {config.fps}</span>,&nbsp;
					<span>Size: {config.width} x {config.height}</span>
				</div>
			</div>
		</AbsoluteFill>
	);
};
