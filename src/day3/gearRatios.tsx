import fs from 'fs'

export function gearRatios(filePath: string): number {
  const file = fs.readFileSync(filePath, 'utf-8').trim().split('\n')
  let sum = 0;
  let gears: {
    x: number;
    y: number;
    num: string;
  }[] = [];
  
  for (let y = 0; y < file.length; y++) {
    file[y] += ".";

    let currentNum = "";
    let currentGear = {
        x: 0,
        y: 0,
        found: false
    };
    for (let x = 0; x < file[y].length; x++) {
        const char = file[y][x];

        if (isDigit(char)) {
            currentNum += char;
            getNeighbors(x, y, file).forEach(val => {
                if (val.char == "*") {
                    if (currentGear.x == val.x && currentGear.y == val.y) return;
                    currentGear = {
                        x: val.x,
                        y: val.y,
                        found: true
                    };
                }
            });
        } else {
            if (currentGear.found) {
                const gearsAtPos = gears.filter(gear => gear.x == currentGear.x && gear.y == currentGear.y);
                if (gearsAtPos.length > 0) {
                    sum += parseInt(gearsAtPos[0].num) * parseInt(currentNum);
                } else {
                    gears.push({
                        x: currentGear.x,
                        y: currentGear.y,
                        num: currentNum
                    });
                }

                currentGear = {
                    found: false,
                    x: 0,
                    y: 0
                };
            }

            currentNum = "";
        }
    }
}

  return sum
}

function getNeighbors(x: number, y: number, file: string[]): { char: string; x: number; y: number; }[] {
  let out: { char: string; x: number; y: number; }[] = [];
  // top row
  // X x x
  if (y > 0 && x > 0) out.push({ char: file[y - 1][x - 1], x: x - 1, y: y - 1 });
  // x X x
  if (y > 0) out.push({ char: file[y - 1][x], x, y: y - 1 });
  // x x X
  if (y > 0 && x < file[y].length - 1) out.push({ char: file[y - 1][x + 1], x: x + 1, y: y - 1 });

  // right col
  if (x < file[y].length - 1) out.push({ char: file[y][x + 1], x: x + 1, y });
  if (y < file.length - 1 && x < file[y].length - 1) out.push({ char: file[y + 1][x + 1], x: x + 1, y: y + 1 });

  // left col
  if (x > 0) out.push({ char: file[y][x - 1], x: x - 1, y });
  if (y < file.length - 1 && x > 0) out.push({ char: file[y + 1][x - 1], x: x - 1, y: y + 1 });

  // bottom
  if (y < file.length - 1) out.push({ char: file[y + 1][x], x, y: y + 1 });

  out = out.filter(val => val != undefined);

  return out;
}

function isDigit(str: string) {
  return !Number.isNaN(parseInt(str));
}