import fs from 'fs'

function countOccurences ( hand: string, char: string ) {
  let occurences = 0

  for ( let item of hand ) {
    if ( item == char ) occurences++
  }

  return occurences
}

function getCardScore ( card: string ) {
  const counts = card.split( '' ).map( char => countOccurences( card, char ) );
  if ( counts.includes( 5 ) ) {
    return 6;
  } else if ( counts.includes( 4 ) ) {
    return 5;
  } else if ( counts.includes( 3 ) ) {
    if ( counts.includes( 2 ) ) {
      return 4;
    }

    return 3;
  } else if ( counts.includes( 2 ) ) {
    if ( counts.filter( el => el == 2 ).length == 4 ) {
      return 2
    }

    return 1;
  }

  return 0
}

type Hand = {
  points: number,
  hand: string[]
}

export function camelCards ( filePath: string ): number {
  const file = fs.readFileSync( filePath, 'utf-8' ).trim().split( '\n' )
  const map: Map<string, string> = new Map( [
    ['T', 'A'],
    ['J', '!'],
    ['Q', 'C'],
    ['K', 'D'],
    ['A', 'E']] )
  let total = 0
  const hands: { hand: string; bid: number; }[] = []
  file.map( lines => {
    const hand = lines.split( ' ' )[0]
    const bid = parseInt( lines.split( ' ' )[1] )
    hands.push( { hand, bid } )
  } )

  function getReplacements ( hand: string ): string[] {
    if ( hand === '' ) return ['']

    const items: string[] = []

    if ( hand[0] === 'J' ) {
      for ( let x of '23456789TQKA' ) {
        for ( let y of getReplacements( hand.slice( 1 ) ) ) {
          items.push( x + y )
        }
      }
    } else {
      for ( let y of getReplacements( hand.slice( 1 ) ) ) {
        items.push( hand[0] + y )
      }
    }

    return items

  }

  function evaluateHand ( hand: string ): Hand {
    const handMap: string[] = []
    for ( const char of hand ) {
      handMap.push( map.get( char ) || char )
    }

    let maxScore = Number.NEGATIVE_INFINITY
    for ( let replacement of getReplacements( hand ) ) {
      const score = getCardScore( replacement )
      if ( score > maxScore ) {
        maxScore = score
      }
    }

    return { points: maxScore, hand: handMap }
  }

  hands.sort( ( a, b ) => {
    const typeA = evaluateHand( a.hand )
    const typeB = evaluateHand( b.hand )

    if ( typeA.points !== typeB.points ) {
      return typeA.points - typeB.points
    } else {
      const joinedA = typeA.hand.join( '' )
      const joinedB = typeB.hand.join( '' )

      return joinedA.localeCompare( joinedB )
    }
  } )

  for ( let i = 0; i < hands.length; i++ ) {
    total += hands[i].bid * ( i + 1 )
  }

  return total
}

