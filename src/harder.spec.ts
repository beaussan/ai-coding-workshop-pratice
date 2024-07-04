import { describe, test, expect } from 'vitest';

function generateParenthesis(n: number): string[] {
  return [];
}

describe('generateParenthesis', () => {
  test.each`
    input | result
    ${1}  | ${['()']}
    ${2}  | ${['(())', '()()']}
    ${3}  | ${['((()))', '(()())', '(())()', '()(())', '()()()']}
  `('returns $result when $input is passed', ({ input, result }) => {
    expect(generateParenthesis(input)).toEqual(result);
  });
});
