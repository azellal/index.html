/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Home,
  CheckCircle2,
  XCircle,
  Hand,
  Users,
  School,
  Leaf,
  Sparkles,
  Search,
  Palette,
  Settings2,
  Activity,
  Zap,
  AlignLeft,
  Shirt,
  Trophy,
  Smile,
  Ghost,
  Target,
  MessageSquare,
  Mic,
  Plane,
  History,
  FastForward,
  Link,
  UserCheck,
  Medal,
  Volume2,
  VolumeX,
  LayoutDashboard,
  ShieldCheck,
  Grid3X3,
  Share2,
  FileText,
  Play,
  Video,
  Music,
  Check,
  LucideIcon
} from 'lucide-react';
import { curriculum } from './data/curriculum';
import { Grade, Theme, Lesson, Exercise } from './types';
import { CrosswordGame } from './components/CrosswordGame';

// Sound effect helper
const playSound = (type: 'correct' | 'wrong') => {
  const audio = new Audio();
  if (type === 'correct') {
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'; // Generic success
  } else {
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'; // Generic fail
  }
  audio.volume = 0.4;
  audio.play().catch(e => console.log('Audio error:', e));
};

// Icon mapping helper
const IconMap: Record<string, LucideIcon> = {
  Hand,
  Users,
  School,
  Leaf,
  BookOpen,
  GraduationCap,
  Palette,
  Settings2,
  Activity,
  Zap,
  AlignLeft,
  Shirt,
  Trophy,
  Smile,
  Ghost,
  Target,
  MessageSquare,
  Mic,
  Plane,
  History,
  FastForward,
  Link,
  UserCheck,
  Medal,
  Volume2,
  Grid3X3,
  Video
};

// Creative Logo Component
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex items-center gap-3 group ${className}`}>
    <div className="relative w-14 h-14">
      <motion.div 
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-sky-500 rounded-2xl shadow-[0_8px_20px_-6px_rgba(14,165,233,0.3)] transform -rotate-6 group-hover:rotate-0 transition-transform" 
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-10 h-10 group-hover:scale-110 transition-transform duration-500">
          <path 
            d="M20 25 L50 50 L80 25 M50 50 L50 80" 
            stroke="white" 
            strokeWidth="14" 
            strokeLinecap="round" 
            fill="none" 
          />
          <path 
            d="M60 25 L60 70 C60 85 45 85 40 78" 
            stroke="#FBBF24" 
            strokeWidth="10" 
            strokeLinecap="round" 
            fill="none" 
            className="mix-blend-screen opacity-70"
          />
        </svg>
      </div>
    </div>
    <div className="flex flex-col -space-y-1">
      <div className="flex items-center gap-1">
        <span className="font-black text-3xl tracking-tighter text-slate-900 leading-none">
          YO<span className="text-sky-500">JA</span>
        </span>
        <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
      </div>
      <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase leading-none">
        Mon Aventure
      </span>
    </div>
  </div>
);

export default function App() {
  const [isParentMode, setIsParentMode] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to muted for better UX
  const [userName, setUserName] = useState<string>('');
  const [tempName, setTempName] = useState<string>('');
  const [currentGrade, setCurrentGrade] = useState<Grade | null>(null);
  const [gender, setGender] = useState<'boy' | 'girl' | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [showBadgeUnlock, setShowBadgeUnlock] = useState<string | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isViewingContent, setIsViewingContent] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [justCompletedLessonId, setJustCompletedLessonId] = useState<string | null>(null);
  
  const [selectedMusic, setSelectedMusic] = useState<'funny' | 'adventure' | 'calm'>('funny');
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  const schoolAmbientRef = useRef<HTMLAudioElement | null>(null);
  const gameAmbientRef = useRef<HTMLAudioElement | null>(null);

  const musicTracks = {
    funny: 'https://assets.mixkit.co/music/preview/mixkit-funny-and-playful-6.mp3',
    adventure: 'https://assets.mixkit.co/music/preview/mixkit-adventure-unleashed-1218.mp3',
    calm: 'https://assets.mixkit.co/music/preview/mixkit-calm-and-peaceful-1100.mp3'
  };

  useEffect(() => {
    // School playground/hallway vibe
    if (!schoolAmbientRef.current) {
      schoolAmbientRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-small-group-of-kids-talking-and-laughing-280.mp3');
      schoolAmbientRef.current.loop = true;
      schoolAmbientRef.current.volume = 0.08;
    }

    // Update game audio track when selectedMusic changes
    const wasPlaying = gameAmbientRef.current && !gameAmbientRef.current.paused && !isMuted;
    
    if (gameAmbientRef.current) {
      gameAmbientRef.current.pause();
    }
    
    gameAmbientRef.current = new Audio(musicTracks[selectedMusic]);
    gameAmbientRef.current.loop = true;
    gameAmbientRef.current.volume = 0.05;

    if (wasPlaying) {
      gameAmbientRef.current.play().catch(() => {});
    }

    return () => {
      schoolAmbientRef.current?.pause();
      gameAmbientRef.current?.pause();
    };
  }, [selectedMusic]); // Re-run when selected music changes

  useEffect(() => {
    if (isMuted) {
      schoolAmbientRef.current?.pause();
      gameAmbientRef.current?.pause();
      return;
    }

    if (selectedLesson) {
      schoolAmbientRef.current?.pause();
      gameAmbientRef.current?.play().catch(() => {});
    } else if (selectedTheme || currentGrade) {
      gameAmbientRef.current?.pause();
      schoolAmbientRef.current?.play().catch(() => {});
    } else {
      schoolAmbientRef.current?.pause();
      gameAmbientRef.current?.pause();
    }
  }, [selectedLesson, selectedTheme, currentGrade, isMuted]);

  const handleShare = async () => {
    if (!selectedLesson) return;
    const score = Math.round((sessionScore / (selectedLesson.exercises.length * 10)) * 100);
    const text = `J'ai terminé la leçon "${selectedLesson.title}" avec un score de ${score}% sur EducAction ! 🚀`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EducAction - Succès !',
          text: text,
          url: url,
        });
      } catch (err) {
        console.error('Share error:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setFeedback({ type: 'success', message: 'Lien de partage copié dans le presse-papiers !' });
        setTimeout(() => setFeedback(null), 3000);
      } catch (err) {
        console.error('Clipboard error:', err);
      }
    }
  };

  const avatars = {
    boy: [
      { id: 'b1', icon: '👦', name: 'Explorateur Lunaire', color: 'bg-blue-400' },
      { id: 'b2', icon: '🧑‍🚀', name: 'Cosmonaute', color: 'bg-sky-500' },
      { id: 'b3', icon: '🦸‍♂️', name: 'Super Héros', color: 'bg-indigo-600' }
    ],
    girl: [
      { id: 'g1', icon: '👧', name: 'Aventurière', color: 'bg-rose-400' },
      { id: 'g2', icon: '👩‍🚀', name: 'Scientifique', color: 'bg-emerald-500' },
      { id: 'g3', icon: '🦸‍♀️', name: 'Super Héroïne', color: 'bg-violet-600' }
    ]
  };

  const isGradeUnlocked = (grade: Grade) => {
    return true;
  };

  const isThemeUnlocked = (theme: Theme, index: number) => {
    return true;
  };

  const isLessonUnlocked = (lessonId: string, index: number) => {
    return true;
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getBadgeForTheme = (theme: Theme) => {
    const title = theme.title.toLowerCase();
    if (title.includes('vocabulaire')) return { name: 'Vocabulary Virtuoso', icon: '🎨' };
    if (title.includes('grammaire')) return { name: 'Grammar Guru', icon: '🧠' };
    if (title.includes('conjugaison')) return { name: 'Conjugation Champ', icon: '⚡' };
    if (title.includes('communication')) return { name: 'Communication King', icon: '🗣️' };
    if (title.includes('test') || title.includes('examen')) return { name: 'Mastermind', icon: '👑' };
    return { name: `${theme.title} Expert`, icon: '🌟' };
  };

  const checkThemeCompletion = (lessonId: string) => {
    if (!selectedTheme) return;
    
    // Use a fresh set to ensure we have the absolute latest
    setCompletedLessons(current => {
      const next = new Set(current);
      next.add(lessonId);
      
      // Check if all lessons in current theme are completed
      const allCompleted = selectedTheme.lessons.every(l => next.has(l.id));
      const badgeInfo = getBadgeForTheme(selectedTheme);
      
      if (allCompleted && !earnedBadges.includes(badgeInfo.name)) {
        setEarnedBadges(prev => [...prev, badgeInfo.name]);
        setShowBadgeUnlock(badgeInfo.name);
        setTimeout(() => setShowBadgeUnlock(null), 5000);
        playSound('correct');
      }
      return next;
    });
  };

  const resetToHome = () => {
    setCurrentGrade(null);
    setSelectedTheme(null);
    setSelectedLesson(null);
    setCurrentExerciseIndex(0);
    setIsFinished(false);
    setJustCompletedLessonId(null);
    setFeedback(null);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUserName(tempName.trim());
    }
  };

  const currentGradeData = curriculum.find(g => g.grade === currentGrade);

  const handleAnswer = (answer: string) => {
    if (!selectedLesson) return;
    const currentExercise = selectedLesson.exercises[currentExerciseIndex];
    
    if (answer === currentExercise.correctAnswer) {
      setSessionScore(s => s + 10);
      setTotalPoints(t => t + 10);
      setFeedback({ type: 'success', message: 'Magnifique ! 🌟' });
      playSound('correct');
    } else {
      setFeedback({ type: 'error', message: 'Presque ! Essaie encore ✨' });
      playSound('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentExerciseIndex < selectedLesson.exercises.length - 1) {
        setCurrentExerciseIndex(i => i + 1);
      } else {
        setIsFinished(true);
        setJustCompletedLessonId(selectedLesson.id);
        checkThemeCompletion(selectedLesson.id);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334155] font-sans selection:bg-sky-200">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="cursor-pointer transition-transform hover:scale-105 active:scale-95" onClick={resetToHome}>
            <Logo />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowMusicMenu(!showMusicMenu)}
                className="w-10 h-10 rounded-xl bg-white border-2 border-slate-100 text-slate-400 hover:border-sky-500 hover:text-sky-600 flex items-center justify-center transition-all"
                title="Changer la musique"
              >
                <Music size={18} />
              </button>
              
              <AnimatePresence>
                {showMusicMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 lg:left-0 lg:right-auto md:origin-top-left top-14 w-48 bg-white border-2 border-slate-100 rounded-2xl shadow-xl overflow-hidden z-50 p-2"
                  >
                    <div className="px-3 py-2 text-xs font-black text-slate-400 uppercase tracking-wider mb-1">
                      Ambiance Musicale
                    </div>
                    {[
                      { id: 'funny', label: 'Ludique 🎮' },
                      { id: 'adventure', label: 'Aventure 🗺️' },
                      { id: 'calm', label: 'Calme 🧘' }
                    ].map(track => (
                      <button
                        key={track.id}
                        onClick={() => {
                          setSelectedMusic(track.id as 'funny' | 'adventure' | 'calm');
                          setShowMusicMenu(false);
                          if (isMuted) setIsMuted(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-between transition-colors ${
                          selectedMusic === track.id ? 'bg-sky-50 text-sky-600' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {track.label}
                        {selectedMusic === track.id && <Check size={16} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border-2 ${
                isMuted 
                ? 'bg-slate-50 border-slate-100 text-slate-400' 
                : 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-lg shadow-emerald-100'
              }`}
              title={isMuted ? "Activer les sons d'ambiance" : "Couper les sons d'ambiance"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <button 
              onClick={() => setIsParentMode(!isParentMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm transition-all border-2 ${
                isParentMode 
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-sky-500 hover:text-sky-600'
              }`}
            >
              {isParentMode ? <ShieldCheck size={18} /> : <LayoutDashboard size={18} />}
              <span className="hidden sm:inline">
                {isParentMode ? 'Quitter Espace Parents' : 'Espace Parents'}
              </span>
            </button>
            
            {avatar && (
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-12 h-12 bg-white border-4 border-sky-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-sky-200"
              >
                {avatar}
              </motion.div>
            )}
            {userName && (
              <div className="flex items-center gap-2 text-sm font-black text-slate-700 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-6 h-6 bg-sky-100 rounded-lg flex items-center justify-center">
                  <Users size={14} className="text-sky-600" />
                </div>
                <span>{userName}</span>
              </div>
            )}
            <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
              Primaire Maroc
            </div>
            <div className="flex items-center gap-2 bg-[#FFFBEB] px-5 py-2.5 rounded-2xl border border-[#FEF3C7] shadow-sm">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="font-black text-amber-900 tabular-nums text-lg">{totalPoints}</span>
            </div>
            {earnedBadges.length > 0 && (
              <div className="flex -space-x-2">
                {earnedBadges.slice(0, 3).map((badge, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-lg shadow-sm" title={badge}>
                    {earnedBadges[i].includes('Virtuoso') ? '🎨' : 
                     earnedBadges[i].includes('Guru') ? '🧠' : 
                     earnedBadges[i].includes('Champ') ? '⚡' : 
                     earnedBadges[i].includes('King') ? '🗣️' : 
                     earnedBadges[i].includes('Master') ? '👑' : '🌟'}
                  </div>
                ))}
                {earnedBadges.length > 3 && (
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white border-2 border-white flex items-center justify-center text-xs font-bold">
                    +{earnedBadges.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:p-10">
        <AnimatePresence>
          {showBadgeUnlock && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -100 }}
              className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
            >
              <div className="bg-white p-12 rounded-[4rem] shadow-[0_32px_64px_-12px_rgba(14,165,233,0.25)] border-4 border-sky-100 text-center space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-sky-50/50 animate-pulse" />
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="w-32 h-32 bg-sky-600 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-xl shadow-sky-200 relative z-10"
                >
                  <Trophy size={64} className="text-white" />
                </motion.div>
                <div className="space-y-2 relative z-10">
                  <h4 className="text-sky-600 font-black uppercase tracking-widest text-sm">NOUVEAU BADGE !</h4>
                  <h2 className="text-4xl font-black text-slate-900">{showBadgeUnlock}</h2>
                  <p className="text-slate-500 font-medium">Tu es un véritable expert de ce module !</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro-screen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white p-8 md:p-16 rounded-[4rem] border-2 border-slate-100 shadow-3xl shadow-slate-200/40 text-center space-y-12 relative overflow-hidden">
                {/* Brand Header */}
                <div className="flex flex-col items-center space-y-6">
                  <Logo className="scale-125 mb-2" />
                  <div className="space-y-2">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                      Prêt pour <span className="text-sky-600 italic">l'Aventure ?</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">
                      Découvre comment YOJA transforme tes leçons en un voyage extraordinaire !
                    </p>
                  </div>
                </div>



                {/* Action */}
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowIntro(false)}
                    className="px-16 py-7 bg-sky-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-sky-500/30 hover:bg-sky-500 transition-all flex items-center gap-4 mx-auto"
                  >
                    C'est parti ! <ChevronRight size={32} />
                  </motion.button>
                  <p className="mt-6 text-slate-400 font-bold text-sm uppercase tracking-widest">
                    Entrée Gratuite • Illimitée • Amusante
                  </p>
                </div>
              </div>
            </motion.div>
          ) : isParentMode ? (
            <motion.div
              key="parent-dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              {/* Dashboard Header */}
              <div className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
                  <LayoutDashboard size={200} />
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">Tableau de Bord</h2>
                      <p className="text-slate-500 font-medium text-lg">Suivez les progrès de <span className="text-sky-600 font-bold">{userName || 'l\'élève'}</span> en temps réel.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-sky-50 px-6 py-4 rounded-3xl border-b-4 border-sky-200">
                        <span className="block text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1">Score Total</span>
                        <span className="text-3xl font-black text-sky-600 tabular-nums">{totalPoints} pts</span>
                      </div>
                      <div className="bg-emerald-50 px-6 py-4 rounded-3xl border-b-4 border-emerald-200">
                        <span className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Leçons Finies</span>
                        <span className="text-3xl font-black text-emerald-600 tabular-nums">{completedLessons.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-50">
                    {/* Progress by Grade */}
                    <div className="space-y-6">
                      <h3 className="font-black text-xl text-slate-900 flex items-center gap-3">
                        <Star className="text-amber-500" /> Progression par Classe
                      </h3>
                      <div className="space-y-4">
                        {curriculum.map((gradeData) => {
                          const totalLessons = gradeData.themes.reduce((sum, t) => sum + t.lessons.length, 0);
                          const completed = gradeData.themes.reduce((sum, t) => 
                            sum + t.lessons.filter(l => completedLessons.has(l.id)).length, 0
                          );
                          const percentage = Math.round((completed / totalLessons) * 100);
                          
                          return (
                            <div key={gradeData.grade} className="space-y-2">
                              <div className="flex justify-between text-sm font-black uppercase tracking-wider">
                                <span className={percentage > 0 ? 'text-slate-700' : 'text-slate-400'}>{gradeData.grade === '1A' ? '1ère Année' : gradeData.grade === '2A' ? '2ème Année' : gradeData.grade === '3A' ? '3ème Année' : gradeData.grade === '4A' ? '4ème Année' : gradeData.grade === '5A' ? '5ème Année' : '6ème Année'}</span>
                                <span className={percentage === 100 ? 'text-emerald-600' : 'text-slate-400'}>{percentage}%</span>
                              </div>
                              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  className={`h-full ${percentage === 100 ? 'bg-emerald-500' : 'bg-sky-500'}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Insights */}
                    <div className="space-y-6">
                      <h3 className="font-black text-xl text-slate-900 flex items-center gap-3">
                        <Sparkles className="text-sky-500" /> Points Forts & Axes d'Amélioration
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {/* Area needing improvement */}
                        <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-100 flex items-start gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm shrink-0">
                            <Target size={20} />
                          </div>
                          <div>
                            <span className="block font-black text-rose-900 text-sm">À travailler prochainement :</span>
                            <p className="text-rose-700 text-sm font-medium mt-1">
                              {completedLessons.size === 0 
                                ? "Commencez la première leçon pour voir les recommandations !" 
                                : "Continuez les modules pour renforcer les bases de grammaire."}
                            </p>
                          </div>
                        </div>

                        {/* Recent Badges */}
                        <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100 flex items-start gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                            <Medal size={20} />
                          </div>
                          <div>
                            <span className="block font-black text-amber-900 text-sm">Badges Collectionnés :</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {earnedBadges.length > 0 ? earnedBadges.map((badge, i) => (
                                <span key={i} className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-amber-800 border border-amber-200">
                                  {badge}
                                </span>
                              )) : (
                                <span className="text-amber-700/60 text-xs font-bold">Aucun badge pour le moment</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Parents */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Encouragement", text: "Félicitez votre enfant pour chaque leçon terminée, pas seulement pour les sans-fautes.", icon: "📣" },
                  { title: "Régularité", text: "15 minutes par jour valent mieux que 2 heures une fois par semaine.", icon: "⏰" },
                  { title: "Conjugaison", text: "Proposez de réciter un verbe au dîner pour rendre l'apprentissage ludique.", icon: "🗣️" }
                ].map((tip, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-200/30">
                    <div className="text-3xl mb-4">{tip.icon}</div>
                    <h4 className="font-black text-lg text-slate-800 mb-2">{tip.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{tip.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : !currentGrade ? (
            <motion.div 
              key="grade-selector"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-16"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-none tracking-tighter">
                  Bienvenue dans <span className="text-sky-600">YOJA</span> !
                </h2>
                <p className="text-slate-500 text-xl font-medium">
                  Prêt pour une aventure incroyable ? Choisis ta classe scolaire pour commencer !
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { grade: '1A', label: '1ère Année', color: 'bg-gradient-to-br from-sky-400 to-sky-600', icon: '🎨', accent: 'sky' },
                  { grade: '2A', label: '2ème Année', color: 'bg-gradient-to-br from-amber-400 to-amber-500', icon: '🚀', accent: 'amber' },
                  { grade: '3A', label: '3ème Année', color: 'bg-gradient-to-br from-emerald-400 to-emerald-500', icon: '🦁', accent: 'emerald' },
                  { grade: '4A', label: '4ème Année', color: 'bg-gradient-to-br from-rose-400 to-rose-500', icon: '🌍', accent: 'rose' },
                  { grade: '5A', label: '5ème Année', color: 'bg-gradient-to-br from-cyan-400 to-cyan-500', icon: '🌱', accent: 'cyan' },
                  { grade: '6A', label: '6ème Année', color: 'bg-gradient-to-br from-violet-500 to-violet-600', icon: '🎓', accent: 'violet' }
                ].map((item, idx) => {
                  const unlocked = isGradeUnlocked(item.grade as Grade);
                  return (
                    <motion.button
                      key={item.grade}
                      whileHover={unlocked ? { y: -16, scale: 1.05 } : {}}
                      whileTap={unlocked ? { scale: 0.95 } : {}}
                      onClick={() => unlocked && setCurrentGrade(item.grade as Grade)}
                      className={`group relative h-96 rounded-[4rem] p-8 flex flex-col items-center justify-between transition-all shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border-4 border-white
                        ${!unlocked ? 'bg-slate-50 grayscale opacity-80 cursor-not-allowed' : 
                          idx === 0 ? 'bg-sky-50 shadow-sky-100' : 
                          idx === 1 ? 'bg-amber-50 shadow-amber-100' : 
                          idx === 2 ? 'bg-emerald-50 shadow-emerald-100' : 
                          idx === 3 ? 'bg-rose-50 shadow-rose-100' : 
                          idx === 4 ? 'bg-cyan-50 shadow-cyan-100' : 'bg-violet-50 shadow-violet-100'}`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full opacity-10 transition-transform group-hover:scale-[3] ${item.color}`} />
                      
                      <div className={`w-28 h-28 ${unlocked ? item.color : 'bg-slate-200'} rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl shadow-current/20 transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                        <span className="drop-shadow-lg">{unlocked ? item.icon : '🔒'}</span>
                      </div>
                      
                      <div className="text-center space-y-2 relative">
                        <span className="block font-black text-4xl text-slate-900 tracking-tighter leading-none">
                          {item.label}
                        </span>
                        <span className="text-slate-400 font-black tracking-[0.3em] text-[10px] uppercase">Maroc Primaire</span>
                      </div>

                      <div className={`w-full py-5 rounded-[2rem] font-black text-lg transition-all shadow-xl
                        ${!unlocked ? 'bg-slate-200 text-slate-400 shadow-none' :
                          idx === 0 ? 'bg-white text-sky-600 group-hover:bg-sky-600 group-hover:text-white' : 
                          idx === 1 ? 'bg-white text-amber-600 group-hover:bg-amber-600 group-hover:text-white' : 
                          idx === 2 ? 'bg-white text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 
                          idx === 3 ? 'bg-white text-rose-600 group-hover:bg-rose-600 group-hover:text-white' : 
                          idx === 4 ? 'bg-white text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white' : 
                          'bg-white text-violet-600 group-hover:bg-violet-600 group-hover:text-white'}`}>
                        {unlocked ? 'Débuter →' : 'Niveau Verrouillé'}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : !gender ? (
            <motion.div 
              key="gender-selector"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-auto space-y-12 py-10 text-center"
            >
              <h2 className="text-5xl font-black text-slate-900 tracking-tight">Tu es un garçon ou une fille ?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <motion.button onClick={() => setGender('boy')} className="bg-white p-12 rounded-[4rem] border-4 border-white shadow-xl hover:border-sky-500 group transition-all">
                  <div className="text-8xl mb-6 group-hover:scale-110 transition-transform">👦</div>
                  <span className="text-3xl font-black">Garçon</span>
                </motion.button>
                <motion.button onClick={() => setGender('girl')} className="bg-white p-12 rounded-[4rem] border-4 border-white shadow-xl hover:border-rose-500 group transition-all">
                  <div className="text-8xl mb-6 group-hover:scale-110 transition-transform">👧</div>
                  <span className="text-3xl font-black">Fille</span>
                </motion.button>
              </div>
            </motion.div>
          ) : !avatar ? (
            <motion.div 
              key="avatar-selector"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto space-y-12 py-10 text-center"
            >
              <h2 className="text-5xl font-black text-slate-900 tracking-tight">Choisis ton personnage !</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {avatars[gender].map(item => (
                  <motion.button key={item.id} onClick={() => setAvatar(item.icon)} className="bg-white p-10 rounded-[4rem] border-4 border-white shadow-xl hover:border-sky-500 group transition-all">
                    <div className={`w-32 h-32 ${item.color} rounded-[2.5rem] mx-auto flex items-center justify-center text-6xl shadow-lg mb-6 group-hover:rotate-6`}>{item.icon}</div>
                    <h3 className="font-black text-2xl">{item.name}</h3>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : !userName ? (
            <motion.div 
              key="name-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center space-y-10 py-10"
            >
              <div className="text-8xl">{avatar}</div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Comment t'appelles-tu ?</h2>
              <form onSubmit={handleStart} className="space-y-6 bg-white p-12 rounded-[4rem] shadow-2xl border-2 border-slate-100">
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Écris ton prénom..."
                  className="w-full px-8 py-6 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-sky-600 outline-none text-2xl font-black text-center"
                  required
                />
                <button type="submit" className="w-full bg-sky-600 text-white font-black text-2xl py-6 rounded-3xl shadow-xl hover:y-[-2px] transition-all">
                  C'est parti !
                </button>
              </form>
            </motion.div>
          ) : !selectedTheme ? (
            <motion.div 
              key="theme-selector"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setCurrentGrade(null)}
                className="flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors font-bold group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChevronLeft className="w-5 h-5" />
                </div>
                Retour aux niveaux
              </button>
              
              <div className="space-y-6">
                <div className="flex items-end justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-3xl font-black text-slate-900">Programmes {currentGrade}</h2>
                  <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-black">{currentGradeData?.themes.length || 0} MODULES</span>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                       <Target />
                     </div>
                     <div>
                       <h2 className="text-3xl font-black text-slate-900">Ton Aventure</h2>
                       <p className="text-slate-500 font-medium">Choisis un module pour progresser !</p>
                     </div>
                   </div>
                <div className="grid grid-cols-1 gap-4">
                  {currentGradeData?.themes.map((theme, i) => {
                    const unlocked = isThemeUnlocked(theme, i);
                    return (
                      <motion.button
                        key={theme.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        disabled={!unlocked}
                        onClick={() => unlocked && setSelectedTheme(theme)}
                        className={`bg-white p-6 rounded-3xl border-2 flex items-center justify-between transition-all group group relative overflow-hidden
                          ${unlocked ? 'border-slate-100 hover:border-sky-600 hover:shadow-xl hover:shadow-sky-500/10' : 'border-slate-50 bg-slate-50/50 opacity-60 cursor-not-allowed'}`}
                      >
                        <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-colors
                            ${!unlocked ? 'bg-slate-200 text-slate-400' :
                              i % 3 === 0 ? 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white' : 
                              i % 3 === 1 ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' : 
                              'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                            {unlocked ? <BookOpen className="w-8 h-8" /> : <span>🔒</span>}
                          </div>
                          <div className="text-left">
                            <h3 className="font-black text-xl text-slate-800">{theme.title}</h3>
                            <p className="text-slate-400 font-medium">{unlocked ? `${theme.lessons.length} leçons interactives` : 'Termine le module précédent'}</p>
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors
                          ${unlocked ? 'bg-slate-50 group-hover:bg-sky-600' : 'bg-slate-100'}`}>
                           <ChevronLeft className={`w-6 h-6 rotate-180 ${unlocked ? 'text-slate-300 group-hover:text-white' : 'text-slate-200'}`} />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                </div>
              </div>
            </motion.div>
          ) : !selectedLesson ? (
            <motion.div 
              key="lesson-selector"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setSelectedTheme(null)}
                className="flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors font-bold group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChevronLeft className="w-5 h-5" />
                </div>
                Retour au module
              </button>
              
              <div className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-20">
                    <BookOpen size={120} />
                  </div>
                  <h4 className="text-indigo-400 font-black uppercase tracking-tighter text-sm">Module en cours</h4>
                  <h2 className="text-3xl font-black">{selectedTheme.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedTheme.lessons.map((lesson, i) => {
                    const IconComp = IconMap[lesson.icon] || BookOpen;
                    const unlocked = isLessonUnlocked(lesson.id, i);
                    return (
                      <motion.button
                        key={lesson.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        disabled={!unlocked}
                        onClick={() => {
                          if (unlocked) {
                            setSelectedLesson(lesson);
                            setSessionScore(0);
                            setIsViewingContent(!!(lesson.storyContent || lesson.videoUrl));
                          }
                        }}
                        className={`bg-white p-6 rounded-[2rem] border-2 flex flex-col items-start gap-6 transition-all group relative
                          ${unlocked ? 'border-slate-100 hover:shadow-2xl hover:shadow-slate-200 hover:border-sky-500' : 'border-slate-50 bg-slate-50/30 opacity-60 cursor-not-allowed'}`}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-current/10
                          ${!unlocked ? 'bg-slate-200 text-slate-400' :
                            i % 4 === 0 ? 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white' : 
                            i % 4 === 1 ? 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white' : 
                            i % 4 === 2 ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' : 
                            'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                          {unlocked ? <IconComp className="w-7 h-7" /> : <span>🔒</span>}
                        </div>
                        <div className="text-left space-y-1">
                          <h3 className="font-black text-xl text-slate-800">{lesson.title}</h3>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed">{unlocked ? lesson.description : 'Termine la leçon précédente pour débloquer'}</p>
                        </div>
                        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-700 ${completedLessons.has(lesson.id) ? 'w-full bg-emerald-500' : 'w-0 group-hover:w-full bg-sky-500'}`} />
                        </div>
                        {completedLessons.has(lesson.id) && (
                          <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                            Complété
                          </div>
                        )}
                        
                        {/* Celebration Animation overlay */}
                        {justCompletedLessonId === lesson.id && (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.05, 1], opacity: [1, 1, 0] }}
                            transition={{ duration: 2, times: [0, 0.2, 1] }}
                            onAnimationComplete={() => setJustCompletedLessonId(null)}
                            className="absolute -inset-2 z-50 pointer-events-none flex items-center justify-center"
                          >
                            <div className="absolute inset-0 bg-emerald-400 rounded-[2.5rem] opacity-20 mix-blend-overlay"></div>
                            
                            <motion.div
                              animate={{ 
                                y: [10, -60], 
                                scale: [0, 1.5, 0],
                                rotate: [0, 180]
                              }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="absolute top-0 text-4xl drop-shadow-lg"
                            >🌟</motion.div>
                            <motion.div
                              animate={{ 
                                x: [10, -50], y: [10, -30],
                                scale: [0, 1.2, 0],
                                rotate: [0, -90]
                              }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                              className="absolute left-6 text-3xl drop-shadow-lg"
                            >✨</motion.div>
                            <motion.div
                              animate={{ 
                                x: [-10, 50], y: [10, -30],
                                scale: [0, 1.4, 0],
                                rotate: [0, 90]
                              }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
                              className="absolute right-6 text-4xl drop-shadow-lg"
                            >🎉</motion.div>
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="exercise-area"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-10"
            >
              {isViewingContent ? (
                <div className="bg-white p-10 md:p-14 rounded-[3rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <button 
                      onClick={() => setSelectedLesson(null)}
                      className="w-12 h-12 bg-white rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all font-bold group"
                    >
                      <XCircle size={24} />
                    </button>
                    <div className="bg-sky-50 px-6 py-2 rounded-2xl text-sky-600 font-black text-sm uppercase tracking-widest">
                      {selectedLesson.videoUrl ? 'Vidéo Éducative' : 'Histoire du Jour'}
                    </div>
                  </div>

                  <div className="text-center space-y-8">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">{selectedLesson.title}</h2>
                    
                    {selectedLesson.videoUrl && (
                      <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-slate-900">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={selectedLesson.videoUrl}
                          title={selectedLesson.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    {selectedLesson.storyContent && (
                      <div className="space-y-8">
                        {selectedLesson.storyContent.image && (
                          <img 
                            src={selectedLesson.storyContent.image} 
                            alt={selectedLesson.title}
                            className="w-full h-64 object-cover rounded-3xl shadow-lg"
                          />
                        )}
                        <div className="prose prose-lg mx-auto text-slate-700 font-medium leading-relaxed bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-100 italic">
                          "{selectedLesson.storyContent.text}"
                        </div>
                        <div className="bg-amber-50 p-6 rounded-[2rem] border-2 border-amber-100 flex items-center gap-6">
                          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-amber-200">
                            ✨
                          </div>
                          <div className="text-left">
                            <h4 className="font-black text-amber-800 uppercase text-xs tracking-widest mb-1">La Morale</h4>
                            <p className="text-amber-900 font-black text-lg">{selectedLesson.storyContent.moral}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsViewingContent(false)}
                      className="w-full py-6 bg-sky-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-sky-500/20 flex items-center justify-center gap-3 mt-8"
                    >
                      <Play size={24} /> Continuer vers les exercices
                    </motion.button>
                  </div>
                </div>
              ) : !isFinished ? (
                <>
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => {
                        setSelectedLesson(null);
                        setCurrentExerciseIndex(0);
                      }}
                      className="w-12 h-12 bg-white rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"
                    >
                      <XCircle size={24} />
                    </button>
                    <div className="flex-1">
                      <div className="bg-white p-2 md:p-3 rounded-2xl border-2 border-slate-100 shadow-sm">
                        <div className="flex gap-1.5 md:gap-2">
                          {selectedLesson.exercises.map((_, i) => {
                            const isCompleted = i < currentExerciseIndex || (i === currentExerciseIndex && feedback?.type === 'success');
                            return (
                              <div key={i} className="flex-1 h-3 md:h-4 bg-slate-100 rounded-full overflow-hidden relative">
                                <motion.div 
                                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-emerald-500"
                                  initial={{ width: isCompleted ? '100%' : '0%' }}
                                  animate={{ width: isCompleted ? '100%' : '0%' }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-white rounded-2xl border-2 border-slate-100 flex items-center justify-center font-black text-slate-800 text-sm">
                      {currentExerciseIndex + 1}/{selectedLesson.exercises.length}
                    </div>
                  </div>

                  <div className="bg-white p-10 md:p-14 rounded-[3rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50 space-y-12 relative overflow-hidden">
                    <AnimatePresence>
                      {feedback && (
                        <motion.div 
                          initial={{ opacity: 0, y: -40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className={`absolute inset-x-0 top-0 p-6 text-center font-black text-white z-20 flex items-center justify-center gap-3
                            ${feedback.type === 'success' ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}
                        >
                          {feedback.type === 'success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                          <span className="text-lg">{feedback.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="text-center space-y-8">
                       <div className="w-20 h-20 bg-sky-50 rounded-[2rem] mx-auto flex items-center justify-center">
                          {selectedLesson.exercises[currentExerciseIndex].type === 'listening' ? (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleSpeak(selectedLesson.exercises[currentExerciseIndex].audioPrompt || '')}
                              className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-200"
                            >
                              <Volume2 size={32} />
                            </motion.button>
                          ) : selectedLesson.exercises[currentExerciseIndex].type === 'imposter' ? (
                            <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 shadow-lg shadow-rose-100">
                              <Search size={32} />
                            </div>
                          ) : (
                            <Sparkles className="w-10 h-10 text-[#0284c7]" />
                          )}
                       </div>
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight px-4">
                        {selectedLesson.exercises[currentExerciseIndex].question}
                      </h2>
                      {selectedLesson.exercises[currentExerciseIndex].type === 'listening' && (
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Clique sur le bouton pour écouter</p>
                      )}
                      {selectedLesson.exercises[currentExerciseIndex].type === 'imposter' && (
                        <p className="text-rose-400 font-bold uppercase tracking-widest text-xs">Trouve l'intrus !</p>
                      )}
                    </div>

                    <div className={selectedLesson.exercises[currentExerciseIndex].type === 'imposter' ? 'grid grid-cols-2 gap-4' : selectedLesson.exercises[currentExerciseIndex].type === 'crossword' ? 'block' : 'grid grid-cols-1 gap-5'}>
                      {selectedLesson.exercises[currentExerciseIndex].type === 'crossword' ? (
                        <CrosswordGame 
                          clues={selectedLesson.exercises[currentExerciseIndex].clues || []} 
                          onComplete={() => handleAnswer(selectedLesson.exercises[currentExerciseIndex].correctAnswer as string)}
                        />
                      ) : (
                        selectedLesson.exercises[currentExerciseIndex].options?.map((option, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ x: 8, scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswer(option)}
                            disabled={!!feedback}
                            className={`w-full group p-6 rounded-3xl border-2 border-slate-100 hover:border-sky-600 hover:bg-sky-50/50 transition-all text-left flex items-center gap-6
                              ${selectedLesson.exercises[currentExerciseIndex].type === 'imposter' ? 'flex-col items-center text-center p-8' : ''}`}
                          >
                            {selectedLesson.exercises[currentExerciseIndex].type !== 'imposter' && (
                              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                {String.fromCharCode(65 + i)}
                              </div>
                            )}
                            <span className="font-black text-xl text-slate-700 group-hover:text-slate-900">{option}</span>
                          </motion.button>
                        ))
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 md:p-20 rounded-[3rem] border-2 border-slate-100 shadow-2xl text-center space-y-10"
                >
                  <motion.div 
                    initial={{ y: 20, rotate: -10 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ type: "spring", repeat: Infinity, repeatType: "reverse", duration: 2 }}
                    className="flex justify-center"
                  >
                    <div className="w-32 h-32 bg-amber-50 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-amber-100">
                      <Trophy className="w-16 h-16 text-amber-500" />
                    </div>
                  </motion.div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Excellent Travail ! 🎉</h2>
                    <p className="text-slate-400 text-lg font-medium">Tu as complété <span className="text-slate-900">"{selectedLesson.title}"</span> comme un champion.</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                    <div className="flex flex-col items-center gap-2">
                       <span className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">Score Leçon</span>
                       <div className="bg-sky-50 px-8 py-4 rounded-[2rem] border-b-4 border-sky-200">
                         <span className="text-4xl font-black text-[#0284c7]">{sessionScore}</span>
                         <span className="text-sky-400 ml-1 font-bold">pts</span>
                       </div>
                    </div>
                    <div className="w-px h-16 bg-slate-100 hidden md:block" />
                    <div className="flex flex-col items-center gap-2">
                       <span className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">Précision</span>
                       <div className="bg-emerald-50 px-8 py-4 rounded-[2rem] border-b-4 border-emerald-200">
                         <span className="text-4xl font-black text-emerald-600">
                           {Math.round((sessionScore / (selectedLesson.exercises.length * 10)) * 100)}
                         </span>
                         <span className="text-emerald-400 ml-1 font-bold">%</span>
                       </div>
                    </div>
                  </div>

                  {(() => {
                    if (!selectedTheme || !currentGradeData) return null;
                    
                    const lessonIndex = selectedTheme.lessons.findIndex(l => l.id === selectedLesson?.id);
                    const isLastLesson = lessonIndex === selectedTheme.lessons.length - 1;
                    
                    const themeIndex = currentGradeData.themes.findIndex(t => t.id === selectedTheme.id);
                    const isLastTheme = themeIndex === currentGradeData.themes.length - 1;

                    if (!isLastLesson) {
                      const nextLesson = selectedTheme.lessons[lessonIndex + 1];
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleShare}
                            className="bg-emerald-50 text-emerald-600 py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 border-2 border-emerald-100"
                          >
                            <Share2 size={24} /> Partager
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedLesson(nextLesson);
                              setIsFinished(false);
                              setCurrentExerciseIndex(0);
                              setSessionScore(0);
                              setIsViewingContent(!!(nextLesson.storyContent || nextLesson.videoUrl));
                            }}
                            className="bg-sky-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/40 transition-all flex items-center justify-center gap-2"
                          >
                            Leçon suivante <ChevronRight size={24} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedLesson(null);
                              setIsFinished(false);
                              setCurrentExerciseIndex(0);
                            }}
                            className="bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3"
                          >
                             Retour au module
                          </motion.button>
                        </div>
                      );
                    } else if (!isLastTheme) {
                      const nextTheme = currentGradeData.themes[themeIndex + 1];
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleShare}
                            className="bg-emerald-50 text-emerald-600 py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 border-2 border-emerald-100"
                          >
                            <Share2 size={24} /> Partager
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedTheme(nextTheme);
                              setSelectedLesson(null);
                              setIsFinished(false);
                              setCurrentExerciseIndex(0);
                              setSessionScore(0);
                            }}
                            className="bg-amber-500 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2"
                          >
                            Module suivant <ChevronRight size={24} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedLesson(null);
                              setSelectedTheme(null);
                              setIsFinished(false);
                              setCurrentExerciseIndex(0);
                            }}
                            className="bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3"
                          >
                             Tous les modules
                          </motion.button>
                        </div>
                      );
                    } else {
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleShare}
                            className="bg-emerald-50 text-emerald-600 py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 border-2 border-emerald-100"
                          >
                            <Share2 size={24} /> Partager
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedLesson(null);
                              setSelectedTheme(null);
                              setIsFinished(false);
                              setCurrentExerciseIndex(0);
                            }}
                            className="bg-sky-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/40 transition-all flex items-center justify-center gap-2"
                          >
                            Tous les modules
                          </motion.button>
                        </div>
                      );
                    }
                  })()}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="mt-20 py-12 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-50 grayscale hover:grayscale-0 transition-all text-center md:text-left">
          <Logo />
          <div className="text-sm font-bold text-slate-500">
            Conçu pour le Ministère de l'Éducation Nationale du Maroc<br />
            © 2026 YOJA - Créé par Youssef Azellal et Jawad Bella
          </div>
        </div>
      </footer>
    </div>
  );
}
