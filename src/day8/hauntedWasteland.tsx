import fs from 'fs'

type Instructions = {
  left: string,
  right: string,
}

function gcd ( a: number, b: number ): number {
  return b === 0 ? a : gcd( b, a % b );
}

function lcm ( a: number, b: number ): number {
  return ( a * b ) / gcd( a, b );
}

function calculateLCM ( numbers: number[] ): number {
  if ( numbers.length === 0 ) {
    return 1;
  }

  let result = numbers[0];
  for ( let i = 1; i < numbers.length; i++ ) {
    result = lcm( result, numbers[i] );
  }

  return result;
}


export function hauntedWasteland ( filePath: string ): number {
  const file = fs.readFileSync( filePath, 'utf-8' ).trim().split( '\n' )
  // let steps = 0
  const directions = file[0].split( '' )
  const nodes = file.splice( 2 )
  let nextMap: { [key: string]: Instructions } = {};
  const initialNodes: string[] = []

  nodes.map( ( line ) => {
    const node = line.substring( 0, line.indexOf( '=' ) - 1 ).trim()
    const tuple = line.substring( line.indexOf( '=' ) + 2 )
    const left = tuple.substring( 1, tuple.indexOf( ',' ) ).trim()
    const right = tuple.substring( tuple.indexOf( ',' ) + 1, tuple.length - 1 ).trim()
    nextMap[node] = { left, right }
    if ( node.split( '' )[2] === 'A' )
      initialNodes.push( node )
  } )

  // I had an error running with the input file
  // function walk ( from: string | undefined, direction: string[], acc: number ) {
  //   if ( !from || from === 'ZZZ' ) {
  //     return acc;
  //   }

  //   if ( direction.length === 0 )
  //     return walk( from, directions, acc )

  //   acc++
  //   const instruction = nextMap.get( from )

  //   if ( !instruction ) return acc

  //   const newDirection = direction.slice( 1 )

  //   if ( direction[0] === 'L' ) {
  //     return walk( instruction?.left, newDirection, acc )
  //   }
  //   else {
  //     return walk( instruction?.right, newDirection, acc )
  //   }

  // }
  let direction: string
  // const initialNodes: string[] = []
  // directions.map( dir => {
  //   if ( dir.split( '' )[2] === 'A' )
  //     initialNodes.push( dir )
  // } )
  const steps: number[] = []

  initialNodes.map( curNode => {
    let total = 0
    let currentNode = curNode
    while ( true ) {
      direction = directions[total % directions.length]
      if ( currentNode.endsWith( 'Z' ) ) {
        // total++
        break
      }
      if ( direction === 'L' ) {
        currentNode = nextMap[currentNode].left
      } else {
        currentNode = nextMap[currentNode].right
      }
      total++
    }
    steps.push( total )

  } )

  //part1
  // let currentNode = 'AAA'
  // while ( currentNode !== 'ZZZ' ) {
  //   direction = directions[total % directions.length]
  //   if ( direction === 'L' ) {
  //     currentNode = nextMap[currentNode].left
  //   } else {
  //     currentNode = nextMap[currentNode].right
  //   }
  //   total++
  // }
  console.log( steps )
  return calculateLCM( steps )
}