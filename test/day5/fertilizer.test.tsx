import { fertilizer, rangeSeeds } from '../../src/day5/fertilizer'

describe( "Day 5 part 1", () => {
  it( "should produce with the real input", () => {
    const result = fertilizer( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day5/input.txt' );
    expect( result ).toEqual( 17803 );
  } );

  it( "should produce 35 with the example 1", () => {
    const result = fertilizer( '/Users/ferfrizzo/coding/training/adventOfCode2023/src/day5/example1.txt' );
    expect( result ).toEqual( 35 );
  } );

  // it( 'should return a range of seeds based on pairs 79 - 14 and 55 - 13', () => {
  //   const result = rangeSeeds( [79, 14, 55, 13] )
  //   expect( result ).toEqual( [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67] );
  // } );

  it( 'should return a range of seeds based on pairs 79 - 14 and 55 - 13', async () => {
    const results = await rangeSeeds( [1367444651, 99920667, 3319921504, 153335682, 67832336, 139859832, 2322838536, 666063790, 1591621692, 111959634, 442852010, 119609663, 733590868, 56288233, 2035874278, 85269124, 4145746192, 55841637, 864476811, 347179760] )
    expect( results ).toEqual( [] );
  } );
} );