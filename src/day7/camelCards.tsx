import fs from 'fs'

type Game =
  'HIGH_CARD' |
  'ONE_PAIR' |
  'TWO_PAIRS' |
  'THREE_OF_A_KIND' |
  'FULL_HOUSE' |
  'FOUR_OF_A_KIND' |
  'FIVE_OF_A_KIND'

type Card = {
  value: string,
  appearances: number
}

type Hand = {
  cards: Card[],
  bid: number,
  game: Game,
  rank: number,
  valueOfTheHand: number,
  originalCards: Card[]
}

type HandControl = {
  position: number,
  cards: Card[]
}

export function camelCards ( filePath: string ): number {
  const file = fs.readFileSync( filePath, 'utf-8' ).trim().split( '\n' )
  const hands: Hand[] = []
  file.map( lines => {
    const cards = lines.split( ' ' )[0].split( '' ).map( ( value ) => ( { value, appearances: 0 } ) )
    const bid = parseInt( lines.split( ' ' )[1] )
    const originalCards = cards
    hands.push( {
      cards,
      bid,
      game: 'HIGH_CARD',
      rank: 0,
      valueOfTheHand: 0,
      originalCards
    } )
  } )

  for ( let handInd = 0; handInd < hands.length; handInd++ ) {
    const handsControl: HandControl[] = []
    const hand = hands[handInd]

    for ( let cardInd = 0; cardInd < hand.cards.length; cardInd++ ) {
      const card = hand.cards[cardInd];
      const existingHandControl = handsControl.find(
        ( value ) => value.cards.some( ( c ) => c.value === card.value )
      );

      if ( !existingHandControl ) {
        handsControl.push( {
          position: handInd,
          cards: [{ ...card, appearances: 1 }]
        } );
      } else {
        existingHandControl.cards.forEach( ( existingCard ) => {
          if ( existingCard.value === card.value ) {
            existingCard.appearances++;
          }
        } );
      }

      // Increment appearances in the original hand
      const existingCardInHand = hand.cards.find(
        ( value ) => value.value === card.value
      );
      if ( existingCardInHand ) {
        existingCardInHand.appearances++;
      }
    }

  }


  const newHands = calculateRank( hands )
  const groupedHands = groupHandsByGame( newHands );

  const resultListOfHands: Hand[] = [
    ...( groupedHands['HIGH_CARD'] || [] ),
    ...( groupedHands['ONE_PAIR'] || [] ),
    ...( groupedHands['TWO_PAIRS'] || [] ),
    ...( groupedHands['THREE_OF_A_KIND'] || [] ),
    ...( groupedHands['FULL_HOUSE'] || [] ),
    ...( groupedHands['FOUR_OF_A_KIND'] || [] ),
    ...( groupedHands['FIVE_OF_A_KIND'] || [] ),
  ];

  let winnings = 0
  resultListOfHands.forEach( ( hand ) => {
    hand.valueOfTheHand = hand.bid * hand.rank
    winnings += hand.valueOfTheHand
  } )
  console.log( "🚀 ~ file: camelCards.tsx:99 ~ resultListOfHands.forEach ~ resultListOfHands:", JSON.stringify( resultListOfHands ) )

  const totalValue = resultListOfHands.reduce( ( sum, hand, index ) => {
    hand.valueOfTheHand = hand.bid * ( index + 1 );
    return sum + hand.valueOfTheHand;
  }, 0 );

  // return totalValue

  return winnings
}

function calculateRank ( hands: Hand[] ): Hand[] {
  hands.forEach( ( hand ) => {
    let { cards, game, rank, originalCards } = hand;
    const sortedOriginalCards = [...originalCards];
    cards.sort( ( a, b ) => b.appearances - a.appearances );

    if ( cards[0].appearances === 5 ) {
      game = 'FIVE_OF_A_KIND'
      rank = 6
    }
    else if ( ( cards[0].appearances === 4 ) ) {
      game = 'FOUR_OF_A_KIND'
      rank = 5
    }
    else if ( ( cards[0].appearances === 3 ) && (
      ( cards[1].appearances == 2 ) ||
      ( cards[2].appearances == 2 ) ||
      ( cards[3].appearances == 2 ) ||
      ( cards[4].appearances == 2 )
    ) ) {
      game = 'FULL_HOUSE'
      rank = 4
    }
    else if ( ( cards[0].appearances === 3 ) ) {
      game = 'THREE_OF_A_KIND'
      rank = 3
    }
    else if ( ( cards[0].appearances === 2 ) && cards[1].appearances === 2 ) {
      game = 'TWO_PAIRS'
      rank = 2
    }
    else {
      game = 'ONE_PAIR'
      rank = 1
    }

    hand.rank = rank
    hand.game = game
    hand.originalCards = sortedOriginalCards
  } );

  return hands;
}

function groupHandsByGame ( newHands: Hand[] ): Record<Game, Hand[]> {
  const groupedHands: Record<Game, Hand[]> = newHands.reduce(
    ( groupedHands, hand ) => {
      const game = hand.game;

      if ( !groupedHands[game] ) {
        groupedHands[game] = [];
      }

      groupedHands[game].push( hand );

      return groupedHands;
    },
    {} as Record<Game, Hand[]>
  );

  // Apply second ordering rule within each game
  Object.values( groupedHands ).forEach( ( hands ) => {
    hands.sort( ( a, b ) => {
      const minCards = Math.min( a.cards.length, b.cards.length );
      const cardOrder = "AKQJT98765432"; // Define the order of cards

      for ( let i = 0; i < minCards; i++ ) {
        const valueA = cardOrder.indexOf( a.originalCards[i].value );
        const valueB = cardOrder.indexOf( b.originalCards[i].value );

        if ( valueA < valueB ) {
          return 1;
        } else if ( valueA > valueB ) {
          return -1;
        }
      }

      return 0;
    } );
  } );

  return groupedHands;
}
