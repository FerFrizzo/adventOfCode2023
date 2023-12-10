import { scratchcards } from '../../src/day4/scratchcards'
import { scratchcardsP2 } from '../../src/day4/scratchcardsP2'

describe("Day 4 - part 1", () => {
  it("should produce ?? with the real input", () => {
    const result = scratchcards('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day4/input.txt');
    expect(result).toEqual(17803);
  });

  it("should produce 13 with the example", () => {
    const result = scratchcards('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day4/example1.txt');
    expect(result).toEqual(13);
  });
});

describe("Day 4 - part 2", () => {
  it("should produce ?? with the real input", () => {
    const result = scratchcardsP2('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day4/input.txt');
    expect(result).toEqual(17803);
  });

  it("should produce 30 with the example 2", () => {
    const result = scratchcardsP2('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day4/example2.txt');
    expect(result).toEqual(30);
  });
});