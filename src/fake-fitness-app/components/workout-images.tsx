import {h} from 'preact';

import {Photo} from './icons';

import '../styles/workout-images.scss';

export const WorkoutImages = (): h.JSX.Element => (
	<div class="workout-images">
		<div class="workout-images-title">Images</div>
		<Photo />
	</div>
);
