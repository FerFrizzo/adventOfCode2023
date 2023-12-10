import fs from 'fs'

interface Cards {
  id: number,
  winningNumbers: number[],
  betNumbers: number[],
  copies: number,
  matches: number
}

export function scratchcardsP2(filePath: string): number {
  const file = fs.readFileSync(filePath, 'utf-8').trim().split('\n')
  const cards: Cards[] = []
  for (let i = 0; i < file.length; i++) {
    const ind = file[i].indexOf(':')
    const game = file[i].substring(ind + 1).trim()
    const card: Cards = {
      id: i + 1,
      winningNumbers: [],
      betNumbers: [],
      copies: 1,
      matches: 0,
    }
    const winningNumbers = game.split('|')[0].trim().split(' ').filter((v) => v !== '').map(str => parseInt(str))
    const betNumbers = game.split('|')[1].trim().split(' ').filter((v) => v !== '').map(str => parseInt(str))
    card.betNumbers = betNumbers  
    card.winningNumbers = winningNumbers
    card.winningNumbers.map(n => {
      if (card.betNumbers.includes(n)) card.matches++
    })

    cards.push(card)
    
  }

  let sum = 0
  for (let i = 0; i < cards.length; i++) {
    range(cards[i].id, cards[i].matches + i).forEach(j => {
      cards[j].copies += cards[i].copies
    })
    sum += cards[i].copies
    console.log("🚀 ~ file: scratchcardsP2.tsx:38 ~ scratchcardsP2 ~ cards:", cards[i])
  
  }

  return sum
}

function range(from: number, to: number): number[] {
  const out: number[] = [];
  for (let i = from; i <= to; i++) {
      out.push(i);
  }
  return out;
}