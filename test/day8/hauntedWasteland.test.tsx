import { hauntedWasteland } from '../../src/day8/hauntedWasteland'

describe( "Day 8 part 1", () => {
  it( "should produce with the real input", () => {
    const result = hauntedWasteland( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day8/input.txt' );
    expect( result ).toEqual( 5133600 );
  } );

  it( "should produce 2 steps with the example 1", () => {
    const result = hauntedWasteland( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day8/example1.txt' );
    expect( result ).toEqual( 2 );
  } );

  it( "should produce 6 steps with the example 2", () => {
    const result = hauntedWasteland( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day8/example2.txt' );
    expect( result ).toEqual( 6 );
  } );

  it( "should also produce 6 steps with the example 3", () => {
    const result = hauntedWasteland( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day8/example3.txt' );
    expect( result ).toEqual( 6 );
  } );
} );
