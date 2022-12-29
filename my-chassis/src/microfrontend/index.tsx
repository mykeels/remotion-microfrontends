/* eslint-disable no-negated-condition */
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import PropTypes from 'prop-types';
import assert from 'tiny-invariant';

import {loadMicrofrontend} from './utils/loader.utils';
import { useCurrentFrame, useVideoConfig, VideoConfig } from 'remotion';

export type MicrofrontendProps = {
	scope: string;
	entry: string;
	module: string;
	url?: string;
	key?: string;
	id?: string;
	className?: string;
	Loading: JSX.Element | (() => JSX.Element);
	loadMicrofrontend?: (manifest: {
		scope: string;
		entry: string;
		module: string;
	}) => Promise<{
		mount: (containerRef: string | HTMLElement, props: { frame: number, config: VideoConfig }) => () => void;
		unmount: (containerRef: string | HTMLElement) => void;
	}>;
};

export const Microfrontend = ({
	id,
	scope,
	entry,
	module,
	Loading,
	className,
	loadMicrofrontend,
}: MicrofrontendProps) => {
	const frame = useCurrentFrame()
	const config = useVideoConfig()
	useEffect(() => {
		// eslint-disable-next-line camelcase
		window.remotion_imported = false;
	}, []);
	const {
		isFetched: isMounted,
		isError,
		error,
		data: {mount} = {},
	} = useQuery(`microfrontend?entry=${entry}&module=${module}`, async () => {
		assert(loadMicrofrontend, 'props.loadMicrofrontend must be a function');
		return loadMicrofrontend({entry, scope, module});
	});

	const mfClassName = classNames(
		'microfrontend-container spin-when-empty',
		className
	);

	const containerId = `mount-${(id || scope).toLowerCase()}-container`;
	const [mfError, setMFError] = useState<Error | null>(null);

	useEffect(() => {
		if (!isMounted || isError || typeof mount !== 'function') {
			return;
		}

		let unmount: (() => void) | null = null;
		try {
			unmount = mount(containerId, { frame, config });
		} catch (error) {
			setMFError(
				new Error(
					`Could not mount Microfrontend: ${scope} (${module})\n${error}`
				)
			);
		}
		return () => {
			try {
				if (typeof unmount === 'function') {
					console.log('unmount', scope);
					unmount();
				}
			} catch (err) {
				console.error(err);
				setMFError(
					new Error(
						`Could not mount Microfrontend: ${scope} (${module})\n${error}`
					)
				);
			}
		};
	}, [isMounted, isError, entry, module, frame, config]);

	return isError ? (
		<div>
			{(error instanceof Error
				? error
				: new Error(
						typeof error === 'string'
							? error
							: `An error occurred in a microfrontend: ${error}`
				  )
			).toString()}
		</div>
	) : mfError ? (
		<div>{mfError.toString()}</div>
	) : !isMounted ? (
		typeof Loading === 'function' ? (
			<Loading />
		) : (
			Loading
		)
	) : (
		<div
			id={containerId}
			className={mfClassName}
			{...{'data-mf-scope': scope, 'data-mf-module': module}}
		/>
	);
};

Microfrontend.defaultProps = {
	loadMicrofrontend,
};

Microfrontend.propTypes = {
	loadMicrofrontend: PropTypes.func,
};

