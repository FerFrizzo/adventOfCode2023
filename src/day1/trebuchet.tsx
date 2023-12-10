import fs from 'fs'

// function replaceUsingMap(inputString: string, replacementMap: Map<string, string>): string {
//   let modifiedString = inputString;

//   replacementMap.forEach((value, key) => {
//     const regex = new RegExp(key, 'g');
//     modifiedString = modifiedString.replaceAll(regex, value);
//   });

//   return modifiedString;
// }

export function trebuchet(filePath: string): number {
  const file = fs.readFileSync(filePath, 'utf-8').trim().split('\n')
  const fileCounts: number[] = []
  // const mapOfNumbers: Map<string, string> = new Map([
  //   ['one', '1'],
  //   ['two', '2'],
  //   ['three', '3'],
  //   ['four', '4'],
  //   ['five', '5'],
  //   ['six', '6'],
  //   ['seven', '7'],
  //   ['eight', '8'],
  //   ['nine', '9'],
  // ]);
  // const convertedFile = file.map(line => replaceUsingMap(line, mapOfNumbers))
  // console.log("🚀 ~ file: trebuchet.tsx:29 ~ trebuchet ~ convertedFile:", convertedFile)
  
  interface Numbers {
    [key: string]: number;
}

const numbers: Numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

  for (let i = 0; i < file.length; i++) {
    let line = file[i]
    
    Object.keys(numbers).forEach((number) => {
      line = line.replaceAll(
          number,
          number + numbers[number] + number.substring(number.length - 1)
          // numbers[number] + number.substring(number.length - 1)
      );
  });
    let sumWord = ''
    console.log("🚀 ~ file: trebuchet.tsx:49 ~ trebuchet ~ line:", line)
    for (let j = 0; j < line.length; j++) {
      if (!isNaN(Number(line[j]))) {
        sumWord = `${line[j]}`
        break
      }
    }
    for (let j = line.length - 1; j >= 0; j--) {
      if (!isNaN(Number(line[j]))) {
        sumWord = `${sumWord}${line[j]}`
        break
      }
    }
    fileCounts.push(Number(sumWord))
  }

  const sum = fileCounts.reduce((acc, curr) => acc + curr, 0)
  console.log("🚀 ~ file: trebuchet.tsx:30 ~ trebuchet ~ sum:", sum)
  
  return sum
}