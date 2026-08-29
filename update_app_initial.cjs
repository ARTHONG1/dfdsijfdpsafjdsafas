const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

if (!content.includes('group: \'\',')) {
  content = content.replace(
    'part: \'\',',
    'group: \'\',\n  name: \'\',\n  part: \'\','
  );
  fs.writeFileSync('src/App.tsx', content, 'utf-8');
}
