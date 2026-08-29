const fs = require('fs');
let content = fs.readFileSync('src/components/MobileSubmit.tsx', 'utf-8');

const oldFetch = `const formBody = new URLSearchParams();
      formBody.append("age", studentData.age);
      formBody.append("gender", studentData.gender);
      formBody.append("ulna", studentData.ulna);
      formBody.append("height", studentData.height);
      formBody.append("timestamp", new Date().toISOString());
      
      await fetch(GAS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });`;

const newFetch = `await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          age: studentData.age,
          gender: studentData.gender,
          ulna: studentData.ulna,
          height: studentData.height,
          timestamp: new Date().toISOString()
        })
      });`;

content = content.replace(oldFetch, newFetch);
fs.writeFileSync('src/components/MobileSubmit.tsx', content, 'utf-8');
