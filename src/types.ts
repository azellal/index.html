
export type Grade = '1A' | '2A' | '3A' | '4A' | '5A' | '6A';

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'pairing' | 'drag-and-drop' | 'typing' | 'listening' | 'imposter' | 'crossword';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  imageUrl?: string;
  audioPrompt?: string; 
  clues?: { word: string; clue: string; orientation: 'across' | 'down'; row: number; col: number }[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  icon: string;
}

export interface Theme {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface GradeData {
  grade: Grade;
  themes: Theme[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  themeId: string;
}

export interface UserProgress {
  score: number;
  completedLessons: string[];
  badges: string[];
}
