export interface Subject {
  name: string;
  mascot: string;
  color: string;
  deep: string;
  icon: string;
}

export const subjects: Subject[] = [
  { name: 'Matemática', mascot: 'Cifra', color: '#E8483A', deep: '#B8291E', icon: '/images/icon-math.png' },
  { name: 'Física', mascot: 'Volt', color: '#F2B825', deep: '#C4900F', icon: '/images/icon-physics.png' },
  { name: 'Química', mascot: 'Bórax', color: '#4A7DF0', deep: '#3159C2', icon: '/images/icon-chem.png' },
  { name: 'Biologia', mascot: 'Broto', color: '#5FAE4A', deep: '#3F8531', icon: '/images/icon-bio.png' },
];
