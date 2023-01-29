import clsx from 'clsx';
import hexRgb from 'hex-rgb';
import {produce} from 'immer';
import {debounce} from 'lodash-es';
import React from 'react';
// eslint-disable-next-line n/file-extension-in-import
import {createRoot} from 'react-dom/client';
import rgbHex from 'rgb-hex';
import type {Except} from 'type-fest';

import {isOfType} from './util';

const inputKeys = ['hex', 'red', 'green', 'blue', 'alpha'] as const;
type InputKeys = (typeof inputKeys)[number];

type Inputs = {
	[key in InputKeys]: string;
};

type RgbaLabels = keyof Except<Inputs, 'hex'>;

type AppState = {
	inputs: Inputs;
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = props => (
	<>
		<input {...props} />
		<div className='input-pseudo-border' />
	</>
);

const sanitiseHex = (hex: string, shouldShorten = true): string => {
	hex = hex.trim();

	// Remove leading "#"
	hex = `#${hex}`.replace(/^#+/g, '');

	let shortFormPossible
		= shouldShorten && (hex.length === 8 || hex.length === 6);
	let shortForm = '';
	for (let index = 0; index < hex.length && shortFormPossible; index += 2) {
		if (hex[index] === hex[index + 1]) {
			shortForm += hex[index]!;
		} else {
			shortFormPossible = false;
			break;
		}
	}

	return `#${shortFormPossible ? shortForm : hex}`;
};

const setHashInstantly = (hex: string): void => {
	hex = sanitiseHex(hex);

	if (hex !== location.hash) {
		/*
      https://developer.mozilla.org/en-US/docs/Web/API/History/pushState#description
      -> history.pushState doesn't trigger hashchange

      Alternative would be storing current hex and location.hash and
      when setHash updates the hash, the stored hex and hash will be the same
      and if the user goes back in history the stored hex and hash will not be the same
    */
		history.pushState({}, '', hex);
	}
};

/*
  To not spam the history
*/
const setHashDebounced = debounce(setHashInstantly, 800, {
	leading: true,
	trailing: true,
	maxWait: 1500,
});

const rgbaLabels: ReadonlySet<RgbaLabels> = new Set([
	'red',
	'green',
	'blue',
	'alpha',
]);

class App extends React.Component<Record<string, unknown>, AppState> {
	override state: AppState = {
		inputs: {
			hex: '',
			red: '',
			green: '',
			blue: '',
			alpha: '',
		},
	};

	invalidInputs = new Set<keyof Inputs>();

	override render(): JSX.Element {
		const {invalidInputs, state, randomColour, handleInput, handleScroll}
			= this;
		const {inputs} = state;
		const {hex, alpha} = inputs;
		const labels: Array<keyof Inputs> = ['red', 'green', 'blue'];

		return (
			<div
				className='horizontal-vertical-center'
				style={{backgroundColor: hex}}
			>
				<div className='floating-box'>
					<div className='row'>
						<div>Hex</div>
						<div className='inputs-rows'>
							<Input
								maxLength={9}
								value={hex}
								placeholder='#'
								name='hex'
								className={clsx({
									invalid: invalidInputs.has('hex'),
								})}
								onInput={handleInput}
							/>
						</div>
					</div>

					<div className='row'>
						<div>Rgba</div>
						<div className='inputs-rows'>
							{labels.map(key => (
								<Input
									key={key}
									type='number'
									min='0'
									max='255'
									maxLength={3}
									name={key}
									placeholder={key}
									value={inputs[key]}
									className={clsx({
										invalid: invalidInputs.has(key),
									})}
									onInput={handleInput}
									onWheel={handleScroll}
								/>
							))}
							<Input
								// [type="tel"] because percent is valid in our use-case
								// but not valid for [type="number"]
								type='tel'
								min='0'
								max='1'
								placeholder='[alpha]'
								value={alpha}
								name='alpha'
								className={clsx({
									invalid: invalidInputs.has('alpha'),
								})}
								onInput={handleInput}
								onWheel={handleScroll}
							/>
						</div>
					</div>
					<div className='row'>
						<div className='rainbow-box'>
							<div className='rainbow-text' onClick={randomColour}>
								Random colour
							</div>
							<div className='rainbow-bg' />
						</div>
					</div>
				</div>
			</div>
		);
	}

	override componentDidMount(): void {
		addEventListener('hashchange', this.handleHashChange);

		// If there is already a hash
		// it will be filled in this way
		this.handleHashChange();
	}

	override componentWillUnmount(): void {
		removeEventListener('hashchange', this.handleHashChange);
	}

	handleScroll: React.WheelEventHandler<HTMLInputElement> = event_ => {
		const target = event_.currentTarget;

		const label = target.name;

		const {inputs} = this.state;

		if (!isOfType(label, inputKeys)) {
			throw new TypeError(
				`Expected label to be of type inputKeys instead got ${label}.`,
			);
		}

		const direction = -Math.sign(event_.deltaY);

		let value = inputs[label];

		if (typeof value !== 'string') {
			return;
		}

		value = value.trim();

		if (label === 'alpha') {
			let multiplier = 100;
			let endsWith = '';

			if (value.endsWith('%')) {
				multiplier = 1;
				endsWith = '%';

				value = value.slice(0, -1);
			}

			if (Number.isNaN(Number(value))) {
				return;
			}

			let parsed = Number(value) * multiplier;
			parsed += direction;

			parsed = parsed > 100 ? 100 : (parsed < 0 ? 0 : parsed);

			parsed /= multiplier;

			parsed = Math.trunc(parsed * 1e2) / 1e2;

			value = `${parsed}${endsWith}`;
		} else {
			if (Number.isNaN(Number(value))) {
				return;
			}

			let parsed = Number(value) + direction;
			parsed = parsed > 255 ? 255 : (parsed < 0 ? 0 : parsed);
			parsed = Math.trunc(parsed * 1e2) / 1e2;

			value = `${parsed}`;
		}

		this.handleRgbaInput(label, value);
	};

	handleHashChange = (event_?: Event): void => {
		let hex = location.hash;
		hex = sanitiseHex(hex);

		this.hexSetState(hex);

		try {
			const rgba = hexRgb(hex);

			// At this point the hex is valid
			// because otherwise the function above
			// would have thrown

			this.rgbaSetState(rgba);

			if (event_ === undefined) {
				// If called directly instead
				// of by the eventlistener
				setHashInstantly(hex);
			}
		} catch {
			this.setState(
				produce((state: AppState) => {
					const inputs = state.inputs;

					for (const label of rgbaLabels) {
						inputs[label] = '';
					}
				}),
			);
		}
	};

	randomColour = (): void => {
		const [red, blue, green] = crypto.getRandomValues(new Uint8Array(3));

		this.rgbaSetState({
			// These cannot not be a number
			red: red!,
			blue: blue!,
			green: green!,
			alpha: 1,
		});

		let hex = rgbHex(red!, green!, blue!);

		hex = sanitiseHex(hex);

		setHashInstantly(hex);

		this.hexSetState(hex);
	};

	rgbaSetState = (
		rgba: Readonly<{
			red: number;
			green: number;
			blue: number;
			alpha: number;
		}>,
	): void => {
		this.setState(
			produce((state: AppState) => {
				const {inputs} = state;

				for (const key of rgbaLabels) {
					const value = rgba[key];

					inputs[key] = value.toFixed(Number.isInteger(value) ? 0 : 2);
				}

				return state;
			}),
		);
	};

	/**
	 * It is the caller's responsibility to sanitise the passed
	 * value because maybe the hex shouldn't be shortened
	 * or even sanitised
	 *
	 * @param {string} hex The hex value to update the state with
	 *
	 * @return {void}
	 */
	hexSetState = (hex: string): void => {
		this.setState(
			produce((state: AppState) => {
				state.inputs.hex = hex;
			}),
		);
	};

	handleHexInput = (hex: string): void => {
		const {invalidInputs} = this;

		hex = sanitiseHex(hex, false);

		this.hexSetState(hex);

		try {
			const rgba = hexRgb(hex);

			setHashDebounced(hex);
			// Only if the hex was valid (calling hexRgb)

			invalidInputs.delete('hex');

			this.rgbaSetState(rgba);
		} catch {
			invalidInputs.add('hex');
			this.forceUpdate();
			// Force update because invalidInputs won't by itself
		}
	};

	handleRgbaInput = (label: string, value: string): void => {
		const {invalidInputs} = this;

		this.setState(
			produce((state: AppState) => {
				const {inputs} = state;

				if (!isOfType(label, inputKeys)) {
					throw new TypeError(
						`Expected label to be of type inputKeys instead got ${label}.`,
					);
				}

				inputs[label] = value;

				// The next few lines because if alpha is '', '1' or '100%'
				// we want a 6-digit instead
				// and we can achieve that by passing undefined

				let alpha: string | undefined = inputs.alpha;
				if (['1', '100%', ''].includes(alpha)) {
					alpha = undefined;
				}

				try {
					let hex = rgbHex(
						Number(inputs.red),
						Number(inputs.green),
						Number(inputs.blue),
						alpha,
					);

					hex = sanitiseHex(hex);

					inputs.hex = hex;

					setHashDebounced(inputs.hex);

					for (const label of rgbaLabels) {
						invalidInputs.delete(label);
					}

					invalidInputs.delete('hex');
				} catch {
					invalidInputs.add(label);
					// No forceUpdate, will trigger after immer is done
				}
			}),
		);
	};

	handleInput: React.FormEventHandler<HTMLInputElement> = event_ => {
		const target = event_.currentTarget;

		const value = target.value.trim();
		const label = target.name;

		if (!isOfType(label, inputKeys)) {
			throw new TypeError(
				`Expected label to be of type inputKeys instead got ${label}.`,
			);
		}

		if (label === 'hex') {
			this.handleHexInput(value);
		} else if (rgbaLabels.has(label)) {
			this.handleRgbaInput(label, value);
		}
	};
}

const container = document.querySelector('#root');

if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}
