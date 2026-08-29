const fs = require('fs');

function unescapeFile(file) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\${/g, '${');
  fs.writeFileSync(file, content, 'utf-8');
}

unescapeFile('src/components/CustomDataAnalysis.tsx');
unescapeFile('src/App.tsx');
