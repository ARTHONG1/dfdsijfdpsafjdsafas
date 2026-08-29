const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');

// We are inserting at index 2 (slide 3).
// So slide 3 -> 4, etc.

// Update SLIDE comments
text = text.replace(/\{\/\* SLIDE (\d+):/g, (match, p1) => {
    const num = parseInt(p1);
    if (num >= 3) {
        return `{/* SLIDE ${num + 1}:`;
    }
    return match;
});

// Update currentIndex checks
for (let i = 16; i >= 2; i--) {
    const regex = new RegExp(`currentIndex === ${i}`, 'g');
    text = text.replace(regex, `currentIndex === ${i + 1}`);
}

// Add the rendering for the new slide 3
const newSlideBlock = `
              {/* SLIDE 3: AI Fairy Tale Video */}
              {currentIndex === 2 && (
                <AIFairyTaleSlide />
              )}
`;
text = text.replace('{/* SLIDE 4: Motivation 1 (Da Vinci Video) */}', newSlideBlock.trim() + '\n\n              {/* SLIDE 4: Motivation 1 (Da Vinci Video) */}');


// Insert import
text = text.replace("import { AIFeaturesSlide } from './components/AIFeaturesSlide';", "import { AIFeaturesSlide } from './components/AIFeaturesSlide';\nimport { AIFairyTaleSlide } from './components/AIFairyTaleSlide';");

// Update SLIDES array.
const slidesRegex = /const SLIDES: SlideData\[\] = \[([\s\S]*?)\];/;
const slidesMatch = text.match(slidesRegex);
if (slidesMatch) {
    let slidesContent = slidesMatch[1];
    
    // Increment existing ids
    slidesContent = slidesContent.replace(/id:\s*(\d+)/g, (m, id) => {
        const num = parseInt(id);
        if (num >= 3) return `id: ${num + 1}`;
        return m;
    });

    // Insert new slide before id: 4
    const newSlide = `\n  { id: 3, title: 'AI-동화 속 엄마들의 진실 편', category: '탐구 도입 2' },`;
    // Find the previous line (id: 2) and append after it
    slidesContent = slidesContent.replace(/({\s*id:\s*2[^\n]*\n)/, `$1${newSlide}`);
    
    text = text.replace(slidesRegex, `const SLIDES: SlideData[] = [${slidesContent}];`);
}

// Update the toggleChoice signature and calls (slide3 -> slide4, slide9 -> slide10)
// toggleChoice('slide3', -> toggleChoice('slide4',
// toggleChoice('slide9', -> toggleChoice('slide10',
text = text.replace(/slide3/g, 'slide4');
text = text.replace(/slide9/g, 'slide10');
// wait, if I replace slide3 -> slide4 globally, I also change state accesses like setChoices({ slide4: [], slide10: [] }) which is correct since types will complain otherwise.
// wait, I also need to update types.ts to change the key names if they are typed. Let's check types.ts.

fs.writeFileSync('src/App.tsx', text);
console.log('done shift4');
