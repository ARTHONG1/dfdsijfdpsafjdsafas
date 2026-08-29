const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');

// Insert the import
text = text.replace(
    "import { AIFairyTaleSlide } from './components/AIFairyTaleSlide';",
    "import { AIFairyTaleSlide } from './components/AIFairyTaleSlide';\nimport { MysterySlide } from './components/MysterySlide';"
);

// Find the start of SLIDE 5
const startIndex = text.indexOf('{/* SLIDE 5: Motivation 2 (Richard III video & mystery) */}');
const endIndex = text.indexOf('{/* SLIDE 6: Motivation Choices */}');

if (startIndex !== -1 && endIndex !== -1) {
    const newSlide = `              {/* SLIDE 5: Motivation 2 (Mystery) */}
              {currentIndex === 4 && (
                <MysterySlide onNext={nextSlide} />
              )}\n\n              `;
    text = text.substring(0, startIndex) + newSlide + text.substring(endIndex);
    fs.writeFileSync('src/App.tsx', text);
    console.log('Successfully replaced slide 5!');
} else {
    console.log('Could not find slide 5 markers.');
}
