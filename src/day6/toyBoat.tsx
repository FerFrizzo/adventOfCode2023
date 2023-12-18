import fs from 'fs'

export function toyBoat ( filePath: string ): number {
  const file = fs.readFileSync( filePath, 'utf-8' ).trim().split( '\n' )
  const time = file[0].substring( file[0].indexOf( ':' ) + 1 ).trim().split( ' ' ).filter( ( v ) => v !== '' ).map( ( v ) => parseInt( v ) )
  const distance = file[1].substring( file[1].indexOf( ':' ) + 1 ).trim().split( ' ' ).filter( ( v ) => v !== '' ).map( ( v ) => parseInt( v ) )
  let differentWaysToWin: number[] = []

  for ( let race = 0; race < time.length; race++ ) {
    let record = distance[race]
    let sum = 0

    for ( let hold = 0; hold < time[race]; hold++ ) {
      const racingTime = time[race] - hold
      const distanceRan = racingTime * hold

      if ( record < distanceRan ) sum++
    }

    differentWaysToWin.push( sum )

  }

  return differentWaysToWin.reduce( ( acc, prev ) => acc * prev )
}

export function toyBoatP2 ( filePath: string ): number {
  const file = fs.readFileSync( filePath, 'utf-8' ).trim().split( '\n' )
  const time = parseInt( file[0].substring( file[0].indexOf( ':' ) + 1 ).trim().split( ' ' ).filter( ( v ) => v !== '' ).join( '' ) )
  const distance = parseInt( file[1].substring( file[1].indexOf( ':' ) + 1 ).trim().split( ' ' ).filter( ( v ) => v !== '' ).join( '' ) )
  let sum = 0

  for ( let hold = 14; hold < time; hold++ ) {
    const racingTime = time - hold
    const distanceRan = racingTime * hold

    if ( distance < distanceRan ) sum++
  }

  return sum
}