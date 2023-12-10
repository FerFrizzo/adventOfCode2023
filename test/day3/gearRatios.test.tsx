import { gearRatios } from '../../src/day3/gearRatios'

describe("Day 3", () => {
  it("should produce ?? with the real input", () => {
    const result = gearRatios('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day3/input.txt');
    expect(result).toEqual(2720);
  });

  it("should produce 4361 with the example", () => {
    const result = gearRatios('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day3/example1.txt');
    expect(result).toEqual(4361);
  });

  it("should produce 467835 with the example 2", () => {
    const result = gearRatios('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day3/example2.txt');
    expect(result).toEqual(467835);
  });

  it("should produce ?? with the real input", () => {
    const result = gearRatios('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day3/input.txt');
    expect(result).toEqual(2720);
  });

});