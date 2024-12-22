export {
  colorDict, colors, ominoDict, ominoRegistry,
  commonOminos, uncommonOminos, mole,
};

import { getMatrixStats } from './matrix.js';
import { expose } from './expose.js';

const colorDict = {
  '-1': 'black',

  line: '#777',

  1: 'cyan',
  2: 'yellow',
  3: 'magenta',
  4: 'blue',
  5: 'orange',
  6: 'lime',
  7: 'red',
}

const colors = [
  'DarkOrange', 'FireBrick', 'MediumSeaGreen', 'OrangeRed', 'Turquoise', 'LightCoral', 'CadetBlue', 'MediumSlateBlue', 'Olive', 'LightGreen', 'Salmon', 'NavajoWhite', 'Teal', 'ForestGreen', 'IndianRed', 'Lavender', 'Peru', 'Plum', 'DarkMagenta', 'Tan', 'MediumVioletRed', 'DeepPink', 'LimeGreen', 'RebeccaPurple', 'DarkSalmon', 'Orchid', 'Bisque', 'LemonChiffon', 'MediumOrchid', 'LightSteelBlue', 'DarkSlateGray', 'MediumBlue', 'DodgerBlue', 'Silver', 'Khaki', 'HotPink', 'Gainsboro', 'DarkSlateBlue', 'Tomato', 'PaleVioletRed', 'Maroon', 'SpringGreen', 'SteelBlue', 'PeachPuff', 'SeaGreen', 'GreenYellow', 'MediumSpringGreen', 'Aquamarine', 'MediumPurple', 'Sienna', 'DarkGreen', 'DeepSkyBlue', 'DarkRed', 'SaddleBrown', 'Coral', 'DarkGray', 'LightBlue', 'LightSeaGreen', 'OliveDrab', 'DarkOliveGreen', 'Gold', 'GoldenRod', 'Chartreuse', 'DarkSeaGreen', 'DarkKhaki', 'DarkBlue', 'PaleGreen', 'YellowGreen', 'CornflowerBlue', 'MediumAquaMarine', 'Violet', 'SandyBrown', 'SkyBlue', 'Thistle', 'Gray', 'DarkTurquoise', 'BurlyWood', 'Indigo', 'Crimson', 'SlateGray', 'Chocolate', 'PaleTurquoise', 'Pink', 'DimGray', 'RosyBrown', 'MistyRose', 'SlateBlue', 'RoyalBlue', 'BlueViolet', 'LightSalmon', 'DarkGoldenRod'
]

const ominoDict = parseOminos(`
                                                      
I4:       T4:     J4:     L4:     S4:     Z4:     O4: 
░░██░░░░  ░░░░░░  ░░██░░  ░░██░░  ░░████  ████░░  ████
░░██░░░░  ██████  ░░██░░  ░░██░░  ████░░  ░░████  ████
░░██░░░░  ░░██░░  ████░░  ░░████  ░░░░░░  ░░░░░░      
░░██░░░░                                              
                                                      
I3:     L3:   I2:   O1:                               
░░██░░  ██░░  ██░░  ██                                
░░██░░  ████  ██░░                                    
░░██░░                                                
                                                      
I5:         l5:       J5:       L5:     S5:     Z5:   
░░░░██░░░░  ░░██░░░░  ░░░░██░░  ██░░░░  ░░████  ████░░
░░░░██░░░░  ░░██░░░░  ░░░░██░░  ██░░░░  ░░██░░  ░░██░░
░░░░██░░░░  ░░██░░░░  ░░░░██░░  ██████  ████░░  ░░████
░░░░██░░░░  ░░████░░  ░░████░░                        
░░░░██░░░░                                            
                                                      
P5:     b5:     T5:     t5:     C5:     W5:     r5:   
░░████  ░░██░░  ██████  ░░██░░  ░░████  ░░░░██  ░░████
░░████  ░░████  ░░██░░  ██████  ░░██░░  ░░████  ████░░
░░██░░  ░░████  ░░██░░  ░░██░░  ░░████  ████░░  ░░██░░
                                                      
y5:                                                   
░░░░██                                                
██████                                                
░░██░░                                                
                                                      
l6:         i6:         v6:         r6:               
░░░░██░░░░  ░░░░██░░░░  ░░░░░░░░░░  ░░░░██░░░░        
░░░░██░░░░  ░░░░██░░░░  ░░░░░░░░░░  ░░░░████░░        
░░░░██░░░░  ░░░░██░░░░  ██████████  ░░░░██░░░░        
░░░░██░░░░  ░░░░████░░  ░░░░██░░░░  ░░░░██░░░░        
░░░░████░░  ░░░░██░░░░  ░░░░░░░░░░  ░░░░██░░░░        
                                                      
j6:         L6:       J6:       C6:       b6:         
░░░░██░░░░  ░░██░░░░  ░░░░██░░  ░░████░░  ░░██░░░░    
░░░░██░░░░  ░░██░░░░  ░░░░██░░  ░░██░░░░  ░░██░░░░    
░░░░██░░░░  ░░██░░░░  ░░░░██░░  ░░██░░░░  ░░████░░    
░░░░██░░░░  ░░██████  ██████░░  ░░████░░  ░░████░░    
░░████░░░░                                            
                                                      
P6:       t6:       D6:       Z6:       S6:           
░░████░░  ░░██░░░░  ░░██░░░░  ░░████░░  ░░████░░      
░░████░░  ██████░░  ░░████░░  ░░░░██░░  ░░██░░░░      
░░██░░░░  ░░██░░░░  ░░████░░  ░░░░██░░  ░░██░░░░      
░░██░░░░  ░░██░░░░  ░░██░░░░  ░░░░████  ████░░░░      
                                                      
T6:       s6:       s6:       q6:     e6:     W6:     
██████░░  ░░░░░░░░  ░░░░░░░░  ████░░  ████░░  ░░░░██  
░░██░░░░  ░░██████  ░░██████  ██████  ████░░  ░░████  
░░██░░░░  ██████░░  ██████░░  ░░░░██  ░░████  ██████  
░░██░░░░  ░░░░░░░░  ░░░░░░░░                          
                                                      
h6:     A6:     a6:     O6:     Y6:                   
██░░░░  ░░░░██  ░░██░░  ░░████  ██░░██                
██████  ██████  ██████  ░░████  ██████                
██░░██  ██░░██  ████░░  ░░████  ░░██░░                
                                                      
`);

const ominoRegistry = fillRegistry({
  common: 'I4 T4 J4 L4 S4 Z4 O4',
  uncommon: '', // to be filled dinamically
  byWeight: {}, // to be filled dinamically
  byMinSide: {}, // to be filled dinamically
  byMaxSide: {}, // to be filled dinamically
  tLike: 'T4 T5 T6 v6 t5 t6 r5 y5 i6 r6 a6 y6',
  zLike: 'S4 Z4 S5 Z5 S6 Z6 s6 z6 q6 e6',
  jLike: 'L3 J4 L4 l5 J5 L5 J6 L6 j6 L6 P5 b5 l6 j6 b6 P6',
  blocks: 'O1 O4 O6 I2 I3 I4 I5',
});

const commonOminos = ominoRegistry.common.split(' ').map(name => ominoDict[name]);
const uncommonOminos = ominoRegistry.uncommon.split(' ').map(name => ominoDict[name]);

const mole = [[-1]];

expose({ ominoDict, ominoRegistry, commonOminos, uncommonOminos, colorDict, colors });

function parseOminos(str) {
  let n = 0;
  const rows = str.split('\n');
  const locationDescriptors = rows.flatMap((row, i) => {
    const matches = [...row.matchAll(/(\w+):/g)];
    return matches.map(match => {
      const name = match[1];
      const iStart = i + 1;
      const jStart = match.index;
      const jEnd = rows[iStart].slice(jStart).search(/\s|$/) + jStart;
      const iEnd = iStart + (jEnd - jStart) / 2;
      return { name, iStart, iEnd, jStart, jEnd };
    });
  });
  const nameShapePairs = locationDescriptors.map(({ name, iStart, iEnd, jStart, jEnd }) => {
    n++;
    const shape = rows.slice(iStart, iEnd).map(
      row => row.slice(jStart, jEnd)
        .replace(/(.)\1/g, '$1').split('')
        .map(char => (char === '█') * n)
    );
    return [name, shape];
  });
  const ominosDict = Object.fromEntries(nameShapePairs);

  return ominosDict;
}

function fillRegistry(registry) {
  const uncommon = [];
  const { byWeight, byMinSide, byMaxSide } = registry;

  for (const name in ominoDict) {
    const shape = ominoDict[name];
    const {
      count, startRow, endRow, startCol, endCol
    } = getMatrixStats(shape);
    const acturalWidth = endCol - startCol + 1;
    const acturalHeight = endRow - startRow + 1;
    const minSide = Math.min(acturalWidth, acturalHeight);
    const maxSide = Math.max(acturalWidth, acturalHeight);

    if (!registry.common.includes(name)) uncommon.push(name);

    byWeight[count] = (byWeight[count] || []).concat(name);
    byMinSide[minSide] = (byMinSide[minSide] || []).concat(name);
    byMaxSide[maxSide] = (byMaxSide[maxSide] || []).concat(name);
  }

  registry.uncommon = uncommon.join(' ');

  for (const dict of [byWeight, byMinSide, byMaxSide]) {
    for (const key in dict) dict[key] = dict[key].join(' ');
  }

  return registry;
}
