const fs = require('fs');
let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(/slide2: string\[\];/g, 'slide4: string[];');
types = types.replace(/slide8: string\[\];/g, 'slide10: string[];');
fs.writeFileSync('src/types.ts', types);
console.log('done types');
