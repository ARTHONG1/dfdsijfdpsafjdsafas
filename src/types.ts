export interface SlideData {
  id: number;
  title: string;
  category: string;
  timerDuration?: number; // seconds (e.g. 600 or 1500)
}

export interface StudentData {
  // New Blank Slide 1 & 2 (Template)
  blankSlide1Title: string;
  blankSlide1Content: string;
  blankSlide2Title: string;
  blankSlide2Content: string;
  // Slide 5 (Davinci Measurement)
  davinciAge: string;
  davinciGender: string;
  davinciArmSpan: string;
  davinciHeight: string;
  // Slide 7 (formerly 5)
  age: string;
  gender: string;
  ulna: string;
  height: string;
  // Slide 10 (formerly 8)
  group: string;
  name: string;
  part: string;
  reason: string;
  // Slide 11 (formerly 9)
  hypothesis: string;
  // Slide 12 (formerly 10)
  rows: {
    id: number;
    name: string;
    partLength: string;
    height: string;
    note: string;
  }[];
  // Slide 15 (formerly 13)
  prediction: string;
  predictionReason: string;
}

export interface SelectedChoices {
  slide4: string[];
  slide10: string[];
}

