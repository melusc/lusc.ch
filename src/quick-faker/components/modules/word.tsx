import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Address: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Word'
		module={faker.word}
		keys={[
			'adjective',
			'adverb',
			'conjunction',
			'interjection',
			'noun',
			'preposition',
			'verb',
		]}
	/>
);
