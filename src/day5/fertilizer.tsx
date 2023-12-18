import fs from 'fs'

type Item =
    | "seed"
    | "soil"
    | "fertilizer"
    | "water"
    | "light"
    | "temperature"
    | "humidity"
    | "location";
const itemOrder: Item[] = [
    "seed",
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
    "location"
];

interface Map {
    from: Item;
    to: Item;
    sources: number[];
    destinations: number[];
    ranges: number[];
}
const maps: Map[] = [];

export function fertilizer ( filePath: string ): number {
    const input = fs.readFileSync( filePath, 'utf-8' )
    const mapsList = input.split( "\n\n" );
    const seedsStr = mapsList.shift()!.split( " " );
    seedsStr.shift();
    const seeds: number[] = seedsStr.map( ( val ) => parseInt( val ) );
    // const seeds: number[] = rangeSeeds( seedsStr.map( ( val ) => parseInt( val ) ) );
    console.log( "running seed", seeds );
    // const bla = rangeSeeds( seeds )
    // console.log( "🚀 ~ file: fertilizer.tsx:40 ~ fertilizer ~ bla:", bla )

    for ( let i = 0; i < mapsList.length; i++ ) {
        let mapStr = mapsList[i];
        const map: Map = {
            from: "seed",
            to: "soil",
            sources: [],
            destinations: [],
            ranges: []
        };

        const header = mapStr.split( "\n" )[0];

        map.from = header.split( "-to-" )[0] as Item;
        map.to = header.split( "-to-" )[1].replaceAll( " map:", "" ) as Item;

        const mappings = mapStr.split( "\n" );
        mappings.shift();

        mappings.forEach( ( mapping ) => {
            const split = mapping.split( " " );

            map.destinations.push( parseInt( split[0] ) );
            map.sources.push( parseInt( split[1] ) );
            map.ranges.push( parseInt( split[2] ) );
        } );

        maps.push( map );
    }

    const locations: number[] = [];


    for ( let i = 0; i < seeds.length; i++ ) {
        const seed = seeds[i];
        let val = seed;

        for ( let j = 0; j < itemOrder.length - 1; j++ ) {
            const item = itemOrder[j];
            const nextItem = itemOrder[j + 1];

            val = map( val, item, nextItem );
            if ( nextItem == "location" ) locations.push( val );
        }
    }

    let lowest = Number.MAX_VALUE;
    for ( let i = 0; i < locations.length; i++ ) {
        if ( locations[i] < lowest ) lowest = locations[i];
    }

    console.log( "lowest:", lowest, "seeds:", seeds.length );

    return lowest
}

function map ( value: number, from: Item, to: Item ): number {
    const mapping = maps.find( ( map ) => map.from == from && map.to == to );
    if ( !mapping ) {
        console.log( `no mapping found for ${from} -> ${to}` );
        return -1;
    }

    for ( let i = 0; i < mapping.sources.length; i++ ) {
        const source = mapping.sources[i];
        const destination = mapping.destinations[i];
        const range = mapping.ranges[i];

        if (
            ( value < source && value < destination ) ||
            ( value > source + range && value > destination + range )
        ) {
            continue;
        }

        if ( value >= source && value < source + range ) {
            return destination + value - source;
        }
    }

    return value;
}

export function rangeSeeds ( seeds: number[] ): number[] {
    const returnOfSeeds: number[] = []

    while ( seeds.length > 1 ) {
        const seed = seeds.shift();
        const range = seeds.shift();

        if ( !seed ) return [];
        if ( !range ) return [];

        for ( let i = 0; i < range; i++ ) {
            returnOfSeeds.push( seed + i )
        }

        console.log( "🚀 ~ file: fertilizer.tsx:137 ~ rangeSeeds ~ returnOfSeeds:", returnOfSeeds )

    }

    console.log( "🚀 ~ file: fertilizer.tsx:142 ~ rangeSeeds ~ returnOfSeeds:", returnOfSeeds )
    return returnOfSeeds
}

function* generateSeeds ( seeds: number[] ): Generator<number> {
    while ( seeds.length > 1 ) {
        const seed = seeds.shift();
        const range = seeds.shift();

        if ( seed === undefined || range === undefined ) {
            console.error( "Invalid seed or range:", seed, range );
            return;
        }

        for ( let i = 0; i < range; i++ ) {
            yield seed + i;
        }
    }
}
