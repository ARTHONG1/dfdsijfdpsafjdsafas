const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf-8');

if (!content.includes('group: string;')) {
  content = content.replace(
    'part: string;',
    'group: string;\n  name: string;\n  part: string;'
  );
  fs.writeFileSync('src/types.ts', content, 'utf-8');
}
