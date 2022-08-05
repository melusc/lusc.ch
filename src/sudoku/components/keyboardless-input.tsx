import React from 'react';

const SvgEraser: React.FC = () => (
	<svg
		width='16'
		height='16'
		fill='currentColor'
		className='svg-eraser-fill'
		viewBox='0 0 16 16'
	>
		<path d='M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z' />
	</svg>
);

export const KeyboardlessInput: React.FC<{
	onClick: (key: string) => void;
}> = ({onClick}) => (
	<div className='keyboardless-inputs'>
		{Array.from({length: 9}, (_v, index) => (
			<div
				key={index}
				className='keyboardless-input'
				title={`${index + 1}`}
				onClick={(): void => {
					onClick(`${index + 1}`);
				}}
			>
				{index + 1}
			</div>
		))}
		<div
			className='keyboardless-input input-eraser'
			title='Clear cell'
			onClick={(): void => {
				onClick(' ');
			}}
		>
			<SvgEraser />
		</div>
	</div>
);