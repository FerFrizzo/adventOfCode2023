import fs from 'fs'

export function cubeConundrum(filePath: string): number {
  const file = fs.readFileSync(filePath, 'utf-8').trim().split('\n')
  const splitByGame = file.map(line => line.trim().split(':'))
  let sum = 0

  for (let game = 0; game < splitByGame.length; game++) {
    const sets = splitByGame[game][1].replaceAll(';', ',').trim().split(', ')
    // if (isGameValid(sets)) {
    //   sum += (game + 1)
    // }
    sum += setPower(sets)
  }
  
  return sum
}

function setPower(sets: string[]): number {
  let sumRed = 0
  let sumGreen = 0
  let sumBlue = 0

  sets.map(set => {
    const setItem = set.split(' ')
    const setCount = setItem[0]
    const setColour = setItem[1]

    if (setColour === 'blue' && Number(setCount) > sumBlue) {
      sumBlue = Number(setCount)
    }
    if (setColour === 'green' && Number(setCount) > sumGreen) {
      sumGreen = Number(setCount)
    }
    if (setColour === 'red' && Number(setCount) > sumRed) {
      sumRed = Number(setCount)
    }
  })

  return sumBlue * sumGreen * sumRed
}

function isGameValid(sets: string[]): boolean {
  const limitRed = 12
  const limitGreen = 13
  const limitBlue = 14

  const bolResult = sets.map(set => {
    const setItem = set.split(' ')
    const setCount = setItem[0]
    const setColour = setItem[1]

    if (setColour === 'blue' && Number(setCount) <= limitBlue) return true
    if (setColour === 'green' && Number(setCount) <= limitGreen) return true
    if (setColour === 'red' && Number(setCount) <= limitRed) return true

    return false
  })

  return !bolResult.includes(false)
}