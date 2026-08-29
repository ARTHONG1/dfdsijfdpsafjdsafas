const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `            </button>
          </div>
        </div>
        {/* Bottom Horizontal Progress Bar */}`;
const replacement = `            </button>
          </div>
        </div>
        )}
        {/* Bottom Horizontal Progress Bar */}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content, 'utf-8');
  console.log("Syntax fixed");
} else {
  console.log("Target not found");
}
