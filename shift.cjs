const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');

// Update slide categories/comments
text = text.replace(/\{\/\* SLIDE (\d+):/g, (match, p1) => {
    return `{/* SLIDE ${parseInt(p1) + 1}:`;
});

// Update currentIndex checks
for (let i = 15; i >= 1; i--) {
    const regex = new RegExp(`currentIndex === ${i}`, 'g');
    text = text.replace(regex, `currentIndex === ${i + 1}`);
}

// Add the placeholder render block
const placeholder = `
              {/* SLIDE 2: Placeholder */}
              {currentIndex === 1 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto flex flex-col items-center justify-center text-center">
                  <h2 className="text-[36px] font-bold text-[#1f2933]">새로운 2페이지 (내용을 알려주세요)</h2>
                </div>
              )}
`;

text = text.replace('{/* SLIDE 3: Motivation 1 (Da Vinci Video) */}', placeholder.trim() + '\n\n              {/* SLIDE 3: Motivation 1 (Da Vinci Video) */}');

// Now, update SLIDES array.
const slidesRegex = /const SLIDES: SlideData\[\] = \[([\s\S]*?)\];/;
const slidesMatch = text.match(slidesRegex);
if (slidesMatch) {
    let slidesContent = slidesMatch[1];
    
    // Increment existing ids
    // Format is like: { id: 1, ... }
    slidesContent = slidesContent.replace(/id:\s*(\d+)/g, (m, id) => {
        const num = parseInt(id);
        if (num >= 2) return `id: ${num + 1}`;
        return m;
    });

    // Insert new slide
    const newSlide = `\n  { id: 2, title: '새로운 내용 (작성 예정)', category: '탐구 도입' },`;
    slidesContent = slidesContent.replace(/({\s*id:\s*1[^\n]*\n)/, `$1${newSlide}`);
    
    text = text.replace(slidesRegex, `const SLIDES: SlideData[] = [${slidesContent}];`);
}

// Update the toggleChoice signature if there is one that relies on slide numbers like 'slide2' -> 'slide3'
text = text.replace(/slide2/g, 'slide3');
text = text.replace(/slide8/g, 'slide9');
// Also check any hardcoded matching logic 
text = text.replace(/choices\.slide3/g, 'choices.slide3');
text = text.replace(/choices\.slide9/g, 'choices.slide9');

fs.writeFileSync('src/App.tsx', text);
console.log('done');
