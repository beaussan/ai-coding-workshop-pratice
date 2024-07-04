// TODO: Implement a function that takes a string and returns an object with the count of each word in the string
// The function should ignore case and punctuation
// Example: wordCount("Hello world! Hello TypeScript.") should return { hello: 2, world: 1, typescript: 1 }
function wordCount(text: string): Record<string, number> {
  return {};
}

describe('wordCount', () => {
  test.each`
    input                                                 | result
    ${'Hello world! Hello TypeScript.'}                   | ${{ hello: 2, world: 1, typescript: 1 }}
    ${'This is a test. This test is only a test.'}        | ${{ this: 2, is: 2, a: 2, test: 3, only: 1 }}
    ${''}                                                 | ${{}}
    ${'With punctuation, without! And with and without.'} | ${{ with: 2, punctuation: 1, without: 2, and: 1 }}
    ${'Case TEST. Case test.'}                            | ${{ case: 2, test: 2 }}
  `('returns $result when $input is passed', ({ input, result }) => {
    expect(wordCount(input)).toBe(result);
  });
});
