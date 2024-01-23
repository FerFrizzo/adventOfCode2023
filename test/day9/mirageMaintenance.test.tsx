import { mirageMaintanance } from '../../src/day9/ mirageMaintenance'

describe( "Day 9 part 1", () => {
  it( "should produce with the real input", () => {
    const result = mirageMaintanance( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day9/input.txt' );
    expect( result ).toEqual( 5133600 );
  } );

  it( "should produce 114 with the example 1", () => {
    const result = mirageMaintanance( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day9/example1.txt' );
    expect( result ).toEqual( 114 );
  } );

  it( "should produce 6 steps with the example 2", () => {
    const result = mirageMaintanance( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day9/example2.txt' );
    expect( result ).toEqual( 6 );
  } );


} );
