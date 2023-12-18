import { camelCards } from '../../src/day7/cameCards2change'

describe( "Day 7 part 1", () => {
  it( "should produce with the real input", () => {
    const result = camelCards( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day7/input1.txt' );
    expect( result ).toEqual( 5133600 );
  } );

  it( "should produce 6440 with the example 1", () => {
    const result = camelCards( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day7/example1.txt' );
    expect( result ).toEqual( 6440 );
  } );
} );
