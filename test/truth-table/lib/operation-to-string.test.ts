import test from 'ava';

import {LogicalSymbolFromName} from '../../../src/truth-table/lib/logical-symbols';
import {operationToString} from '../../../src/truth-table/lib/operation-to-string';
import {type AST} from '../../../src/truth-table/lib/parse-operation';

test('a AND b', t => {
	t.is(
		operationToString({
			type: 'operator',
			operator: 'and',
			values: [
				{
					type: 'variable',
					variable: 'a',
				},
				{
					type: 'variable',
					variable: 'b',
				},
			],
		}),
		`(a ${LogicalSymbolFromName.and} b)`,
	);
});

test('a AND (b XOR (c <=> d))', t => {
	t.is(
		operationToString({
			type: 'operator',
			operator: 'and',
			values: [
				{
					type: 'variable',
					variable: 'a',
				},
				{
					type: 'operator',
					operator: 'xor',
					values: [
						{
							type: 'variable',
							variable: 'b',
						},
						{
							type: 'operator',
							operator: 'iff',
							values: [
								{
									type: 'variable',
									variable: 'c',
								},
								{
									type: 'variable',
									variable: 'd',
								},
							],
						},
					],
				},
			],
		}),
		`(a ${LogicalSymbolFromName.and} (b ${LogicalSymbolFromName.xor} (c ${LogicalSymbolFromName.iff} d)))`,
	);
});

test('caching', t => {
	const operation: AST = {
		type: 'operator',
		operator: 'and',
		values: [
			{
				type: 'variable',
				variable: 'a',
			},
			{
				type: 'variable',
				variable: 'b',
			},
		],
	};

	const expected = `(a ${LogicalSymbolFromName.and} b)`;

	t.is(operationToString(operation), expected);
	t.is(operation.stringified, expected);
});
