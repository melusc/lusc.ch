import test from 'ava';

import {parseOperation} from '../../../src/truth-table/lib/parse-operation';
import {operationToString} from '../../../src/truth-table/lib/operation-to-string';

const t1 = '(a) && (b)';
test(t1, t => {
	t.deepEqual(parseOperation(t1), {
		type: 'and',
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
	});
});

const t2 = '!A';
test(t2, t => {
	t.deepEqual(parseOperation(t2), {
		type: 'not',
		values: [
			{
				type: 'variable',
				variable: 'A',
			},
		],
	});
});

const t3 = 'not A and not B';
test(t3, t => {
	t.deepEqual(parseOperation(t3), {
		type: 'and',
		values: [
			{
				type: 'not',
				values: [
					{
						type: 'variable',
						variable: 'A',
					},
				],
			},
			{
				type: 'not',
				values: [
					{
						type: 'variable',
						variable: 'B',
					},
				],
			},
		],
	});
});

const t4 = 'a and b xor c';
test(t4, t => {
	t.deepEqual(parseOperation(t4), {
		type: 'xor',
		values: [
			{
				type: 'and',
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
			},
			{
				type: 'variable',
				variable: 'c',
			},
		],
	});
});

const t5 = '(a and b) or (c xor not d)';
test(t5, t => {
	t.deepEqual(parseOperation(t5), {
		type: 'or',
		values: [
			{
				type: 'and',
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
			},
			{
				type: 'xor',
				values: [
					{
						type: 'variable',
						variable: 'c',
					},
					{
						type: 'not',
						values: [
							{
								type: 'variable',
								variable: 'd',
							},
						],
					},
				],
			},
		],
	});
});

const t6 = '(((a)))';
test(t6, t => {
	t.deepEqual(parseOperation(t6), {
		type: 'variable',
		variable: 'a',
	});
});

const t7 = `
	(
		a && (b || c)
		xor
		(
			(d -> c) <-> e
		)
	) && (e || c) -> f`;
test(t7, t => {
	t.deepEqual(parseOperation(t7), {
		type: 'if-then',
		values: [
			{
				type: 'and',
				values: [
					{
						type: 'xor',
						values: [
							{
								type: 'and',
								values: [
									{
										type: 'variable',
										variable: 'a',
									},
									{
										type: 'or',
										values: [
											{
												type: 'variable',
												variable: 'b',
											},
											{
												type: 'variable',
												variable: 'c',
											},
										],
									},
								],
							},
							{
								type: 'iff',
								values: [
									{
										type: 'if-then',
										values: [
											{
												type: 'variable',
												variable: 'd',
											},
											{
												type: 'variable',
												variable: 'c',
											},
										],
									},
									{
										type: 'variable',
										variable: 'e',
									},
								],
							},
						],
					},
					{
						type: 'or',
						values: [
							{
								type: 'variable',
								variable: 'e',
							},
							{
								type: 'variable',
								variable: 'c',
							},
						],
					},
				],
			},
			{
				type: 'variable',
				variable: 'f',
			},
		],
	});
});

const t8 = 'not not not not not A';
test(t8, t => {
	t.deepEqual(parseOperation(t8), {
		type: 'not',
		values: [
			{
				type: 'not',
				values: [
					{
						type: 'not',
						values: [
							{
								type: 'not',
								values: [
									{
										type: 'not',
										values: [
											{
												type: 'variable',
												variable: 'A',
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	});
});

const t9 = `
	(
		a -> not b
	) && (
		not not a -> b -> not c
	) && c || not d
`;
test(`${t9} should deep equal itself when parsing it after restringified`, t => {
	const parsed1 = parseOperation(t9);
	const parsed2 = parseOperation(operationToString(parsed1));
	operationToString(parsed2); // For all cached stringifieds

	t.deepEqual(parsed2, parsed1);
});

const t10 = 'a b';
test(t10, t => {
	t.throws(
		() => {
			parseOperation(t10);
		},
		{
			message: 'Expected "a b" to have an operator.',
		},
	);
});

const t11 = '((a -> b) -> c) && ((c d -> a) XOR b)';
test(t11, t => {
	t.throws(
		() => {
			parseOperation(t11);
		},
		{
			message: 'Expected "c d" to have an operator.',
		},
	);
});
