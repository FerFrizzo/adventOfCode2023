import fs from 'fs'

export function scratchcards(filePath: string): number {
  const file = fs.readFileSync(filePath, 'utf-8').trim().split('\n')
  const justGames = file.map( line => {
    const ind = line.indexOf(':')
    return line.substring(ind + 1).trim()
  })

  let sum = 0

  justGames.forEach((val) => {
    let points = 0
    
    const winningNumbers = val.split('|')[0].trim().split(' ').filter((v) => v !== '')
    const betNumbers = val.split('|')[1].trim().split(' ').filter((v) => v !== '')
    winningNumbers.map((win) => {
      if (betNumbers.includes(win)) {
        if (points == 0) points = 1
        else points *= 2
      }
    })
    sum += points
  })

  return sum
}