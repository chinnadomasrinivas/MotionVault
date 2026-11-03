export const C = {
  ink: '#0B1B33',
  inkSoft: '#3A4C68',
  muted: '#7A8BA6',
  paper: '#FFFFFF',
  mist: '#EEF4FC',
  line: '#CFDCF0',
  blue: '#2F6FEB',
  pyBlue: '#3776AB',
  pyYellow: '#FFD43B',
  orange: '#FF7A1A',
  green: '#12B76A',
  red: '#F04438',
  purple: '#7A5AF8',
  pcb: '#0F8A5A',
};

// System font stacks => the project renders fully offline (Windows: Segoe UI Black / Cascadia / Consolas).
export const FONT_DISPLAY =
  "'Segoe UI Black','Segoe UI Variable Display','Segoe UI','Helvetica Neue',Arial,'Nirmala UI','Yu Gothic UI',sans-serif";
export const FONT_MONO = "'Cascadia Code','Cascadia Mono',Consolas,'SF Mono',Menlo,monospace";

export const shadow = (c = 'rgba(20,50,110,0.18)', y = 24, b = 60) => `0 ${y}px ${b}px ${c}`;
