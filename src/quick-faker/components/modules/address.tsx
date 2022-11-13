import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Address: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Address'
		module={faker.address}
		keys={[
			'buildingNumber',
			'cardinalDirection',
			'city',
			'cityName',
			'country',
			'countryCode',
			'county',
			'direction',
			'latitude',
			'longitude',
			'nearbyGPSCoordinate',
			'ordinalDirection',
			'secondaryAddress',
			'state',
			'stateAbbr',
			'street',
			'streetAddress',
			'streetName',
			'timeZone',
			'zipCode',

			// Not included due to incompatible types
			// 'zipCodeByState',

			// Deprecated
			// 'cityPrefix',
			// 'citySuffix',
			// 'streetPrefix',
			// 'streetSuffix',
		]}
	/>
);
