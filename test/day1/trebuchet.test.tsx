import { trebuchet } from '../../src/day1/trebuchet'

describe("Day 1", () => {
  it("should produce 281", () => {
    const result = trebuchet('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day1/input1.txt');
    expect(result).toEqual(281);
  });

});