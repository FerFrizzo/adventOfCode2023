import { toyBoat, toyBoatP2 } from '../../src/day6/toyBoat'

describe( "Day 6 part 1", () => {
  it( "should produce with the real input", () => {
    const result = toyBoat( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day6/input1.txt' );
    expect( result ).toEqual( 5133600 );
  } );

  it( "should produce 288 with the example 1", () => {
    const result = toyBoat( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day6/example1.txt' );
    expect( result ).toEqual( 288 );
  } );
} );

describe( "Day 6 part 2", () => {
  it( "should produce with the real input", () => {
    const result = toyBoatP2( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day6/input1.txt' );
    expect( result ).toEqual( 5133600 );
  } );

  it( "should produce 71503 with the example 1", () => {
    const result = toyBoatP2( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day6/example1.txt' );
    expect( result ).toEqual( 71503 );
  } );

} );