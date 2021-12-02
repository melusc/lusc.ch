import {generateBoolPermutations} from './generate-bool-permutations';
import {operationToString} from './operation-to-string';
import {findVariables} from './find-variables';
import {AST, parseOperation} from './parse-operation';
import {evalOperation} from './eval';

type Column = [AST, string];

function * getColumns(operations: AST): Iterable<Column> {
	// Not variables, they are handled differently below
	if (operations.type !== 'variable') {
		for (const value of operations.values) {
			yield * getColumns(value);
		}

		// Yield after above, so it goes from inside out
		yield [operations, operationToString(operations)];
	}
}

const deduplicateColumns = (columns: Iterable<Column>): Column[] => {
	const seenColumns = new Set<string>();
	const result: Column[] = [];

	for (const column of columns) {
		if (!seenColumns.has(column[1])) {
			result.push(column);
			seenColumns.add(column[1]);
		}
	}

	return result;
};

const removeOuterBrackets = (string: string) =>
	/^\(.+\)$/.test(string) ? string.slice(1, -1) : string;

export const generateTable = (
	input: string,
): {
	columns: readonly string[];
	rows: ReadonlyArray<readonly boolean[]>;
} => {
	const parsed = parseOperation(input);
	const variables = findVariables(parsed);
	const rows = generateBoolPermutations(variables);
	const columns = deduplicateColumns(getColumns(parsed));

	const table: {
		columns: string[];
		rows: boolean[][];
	} = {
		columns: [...variables],
		rows: [],
	};

	for (const [, stringified] of columns) {
		table.columns.push(removeOuterBrackets(stringified));
	}

	for (const variablePermutations of rows) {
		const row: boolean[] = [];

		for (const variable of variables) {
			row.push(variablePermutations[variable]!);
		}

		for (const [operation] of columns) {
			row.push(evalOperation(operation, variablePermutations));
		}

		table.rows.push(row);
	}

	return table;
};
