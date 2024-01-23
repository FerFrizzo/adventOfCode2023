import fs from 'fs'

type History = {
  steps: number[]
}

export function mirageMaintanance ( filePath: string ): number {
  const file = fs.readFileSync( filePath, 'utf-8' ).trim().split( '\n' )

  const history: number[] = []
  for ( let i = 0; i < file.length; i++ ) {
    const step = file[i].split( ' ' ).map( el => parseInt( el ) )
    history.push( ...step )
  }

  for ( let ind = 0; ind < history.length; ind++ ) {
    const stepsControl: number[] = []
    const steps = history[ind]

    for ( let i = 0; i < history.length - 1; i++ ) {
      const diff = history[i + 1] - history[i]
      stepsControl[i] = diff
    }

    let control = true
    let index = 0
    let diff: number
    while ( control ) {
      diff = history[index + 1] - history[index]
      if ( diff === 0 ) {
        control = false
        break
      }
      else
        stepsControl[index] = history[index + 1] - history[index]
    }


    // stepsMatrix.push( { steps: stepsControl } )

    console.log( "🚀 ~ file:  mirageMaintenance.tsx:17 ~ mirageMaintanance ~ stepsControl:", stepsControl )
  }

  // while ( history )

  return 0
}

function walk ( history: History, total: number ): number {
  const lastItem = history.steps.length

  if ( history.steps.filter( el => el === 0 ).length === lastItem )
    return total

  const steps = history.steps
  const stepsControl: number[] = []
  for ( let step = 0; step < steps.length - 1; step++ ) {
    const diff = steps[step + 1] + steps[step]
    stepsControl[step] = diff
  }
  history.steps.push( ...stepsControl )


  return walk( history, total + 1 )
}