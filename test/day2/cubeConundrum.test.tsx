import { cubeConundrum } from '../../src/day2/cubeConundrum'

describe("Day 2", () => {
  // it("should produce 2720 with the real input", () => {
  //   const result = cubeConundrum('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day2/input.txt');
  //   expect(result).toEqual(2720);
  // });

  // it("should produce 8 with the example", () => {
  //   const result = cubeConundrum('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day2/example1.txt');
  //   expect(result).toEqual(8);
  // });

  it('should produce the power of the sets a sum of 2286 for the example', () => {
    const result = cubeConundrum('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day2/example1.txt');
    expect(result).toEqual(2286);
  })
  it('should produce the power of the sets a sum of 2286 for the example', () => {
    const result = cubeConundrum('/Users/ferfrizzo/coding/training/adventOfCode2023/src/day2/input.txt');
    expect(result).toEqual(2286);
  })

});