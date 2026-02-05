import React, { useState, useEffect } from 'react';
import { Eye, Award, RefreshCw, ChevronRight, Target, Wind, Zap } from 'lucide-react';

const AITEnhanced = () => {
  const [profile, setProfile] = useState(null);
  const [level, setLevel] = useState(1);
  const [stage, setStage] = useState('modeSelect');
  const [target, setTarget] = useState(null);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [relaxationTimer, setRelaxationTimer] = useState(10);
  const [feedback, setFeedback] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathTimer, setBreathTimer] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [mode, setMode] = useState('normal');
  const [usedTargets, setUsedTargets] = useState([]);
  const [typedAnswer, setTypedAnswer] = useState('');

  const profiles = [
    { id: 'shapes', name: 'Shapes & Forms', desc: 'Focus on geometric patterns' },
    { id: 'colors', name: 'Colors & Tones', desc: 'Sense color vibrations' },
    { id: 'numbers', name: 'Numbers & Symbols', desc: 'Perceive numerical patterns' },
    { id: 'emotions', name: 'Feelings & Emotions', desc: 'Connect with emotional energy' },
    { id: 'locations', name: 'Places & Spaces', desc: 'Visualize environments' }
  ];

  const levels = {
    1: { name: 'Beginner', targets: 5, choices: 2 },
    2: { name: 'Novice', targets: 5, choices: 3 },
    3: { name: 'Learner', targets: 6, choices: 4 },
    4: { name: 'Student', targets: 6, choices: 5 },
    5: { name: 'Practitioner', targets: 7, choices: 6 },
    6: { name: 'Skilled', targets: 7, choices: 7 },
    7: { name: 'Advanced', targets: 8, choices: 8 },
    8: { name: 'Expert', targets: 8, choices: 9 },
    9: { name: 'Master', targets: 9, choices: 10 },
    10: { name: 'Grandmaster', targets: 10, choices: 11 }
  };

  const targetsByProfile = {
    shapes: ['circle', 'triangle', 'square', 'rectangle', 'star', 'diamond', 'oval', 'cross', 'pentagon', 'hexagon', 'octagon', 'spiral', 'wave', 'zigzag', 'arrow', 'heart', 'crescent', 'pyramid', 'cube', 'sphere', 'cylinder', 'cone', 'torus', 'ellipse', 'trapezoid', 'rhombus', 'parallelogram', 'kite', 'arc', 'helix', 'double helix', 'lotus', 'fan', 'wedge', 'ribbon', 'infinity', 'droplet', 'leaf', 'petal', 'crown'],
    colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'white', 'cyan', 'magenta', 'indigo', 'violet', 'crimson', 'azure', 'emerald', 'gold', 'silver', 'bronze', 'turquoise', 'coral', 'lavender', 'maroon', 'navy', 'olive', 'teal', 'lime', 'amber', 'ruby', 'sapphire', 'jade', 'pearl', 'ivory', 'charcoal', 'slate', 'burgundy', 'plum', 'mint', 'peach', 'cream', 'ebony'],
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '11', '22', '33', '44', '55', '66', '77', '88', '99', '100', '111', '222', '333', '444', '555', '666', '777', '888', '999', '1000', '12', '13', '17', '21', '27', '36', '42', '108', '144', '369'],
    emotions: ['joy', 'calm', 'peace', 'love', 'hope', 'courage', 'clarity', 'harmony', 'serenity', 'gratitude', 'wonder', 'excitement', 'curiosity', 'confidence', 'compassion', 'trust', 'contentment', 'bliss', 'awe', 'delight', 'euphoria', 'tranquility', 'ecstasy', 'empathy', 'kindness', 'patience', 'wisdom', 'grace', 'devotion', 'passion', 'tenderness', 'acceptance', 'forgiveness', 'reverence', 'inspiration', 'fulfillment', 'freedom', 'balance', 'radiance', 'vitality'],
    locations: ['beach', 'mountain', 'forest', 'desert', 'city', 'lake', 'valley', 'island', 'river', 'canyon', 'temple', 'bridge', 'waterfall', 'meadow', 'volcano', 'glacier', 'oasis', 'cave', 'garden', 'field', 'ocean', 'jungle', 'plateau', 'cliff', 'dune', 'marsh', 'fjord', 'bay', 'lagoon', 'reef', 'tundra', 'savanna', 'prairie', 'grove', 'delta', 'gorge', 'peninsula', 'archipelago', 'monastery', 'lighthouse']
  };

  useEffect(() => {
    if (stage === 'relaxation') {
      const interval = setInterval(() => {
        setBreathTimer(prev => {
          const next = prev + 0.1;
          if (next >= 4) {
            if (breathPhase === 'inhale') setBreathPhase('hold1');
            else if (breathPhase === 'hold1') setBreathPhase('exhale');
            else if (breathPhase === 'exhale') setBreathPhase('hold2');
            else if (breathPhase === 'hold2') setBreathPhase('inhale');
            return 0;
          }
          return next;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [stage, breathPhase]);

  useEffect(() => {
    if (stage === 'relaxation' && relaxationTimer > 0) {
      const timer = setTimeout(() => setRelaxationTimer(relaxationTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (stage === 'relaxation' && relaxationTimer === 0) {
      startPractice();
    }
  }, [relaxationTimer, stage]);

  const getHintVisualization = (tgt, profileId) => {
    if (profileId === 'shapes') {
      if (tgt === 'circle') return <div className="w-14 h-14 rounded-full border-3 border-gray-600/60" />;
      if (tgt === 'square') return <div className="w-14 h-14 border-3 border-gray-600/60" />;
      if (tgt === 'triangle') return <div className="w-0 h-0 border-l-[28px] border-r-[28px] border-b-[48px] border-l-transparent border-r-transparent border-b-gray-600/60" />;
      if (tgt === 'star') return <div className="text-4xl text-gray-600/60">★</div>;
      return <div className="w-14 h-14 rounded-full border-3 border-gray-600/60" />;
    }
    
    if (profileId === 'colors') {
      const colors = { red: '#ff4444', blue: '#4444ff', green: '#44ff44', yellow: '#ffff44', purple: '#aa44aa', orange: '#ffaa44', pink: '#ffaacc', white: '#888888' };
      const color = colors[tgt] || '#888888';
      return <div className="w-12 h-12 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />;
    }
    
    if (profileId === 'numbers') {
      const num = parseInt(tgt) || 0;
      const displayNum = num > 12 ? Math.floor(num / 10) : num;
      return (
        <div className="flex flex-wrap gap-1 justify-center w-16 h-16 items-center">
          {[...Array(displayNum)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-600/60" />
          ))}
        </div>
      );
    }
    
    return <div className="w-12 h-12 rounded-full bg-gray-600/40" />;
  };

  const selectMode = (selectedMode) => {
    setMode(selectedMode);
    setStage('profiles');
  };

  const selectProfile = (prof) => {
    setProfile(prof);
    setStage('levelSelect');
  };

  const selectLevel = (selectedLevel) => {
    setLevel(selectedLevel);
    setStage('relaxation');
    setRelaxationTimer(10);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startPractice = () => {
    const targets = targetsByProfile[profile.id];
    const numChoices = levels[level].choices;
    
    // Enhanced anti-memorization: Filter out last 8 used targets (increased from 5)
    const availableTargets = targets.filter(t => !usedTargets.includes(t));
    const targetPool = availableTargets.length >= numChoices ? availableTargets : targets;
    
    const randomTarget = targetPool[Math.floor(Math.random() * targetPool.length)];
    
    // Track last 8 targets to prevent repetition
    setUsedTargets(prev => [...prev.slice(-7), randomTarget]);
    
    if (mode === 'hypermode') {
      // Hypermode: No choices, type answer manually
      setTarget(randomTarget);
      setChoices([]);
      setStage('practice');
      setShowHint(false);
      setHintUsed(false);
    } else {
      // Normal mode: Multiple choice
      const otherTargets = targetPool.filter(t => t !== randomTarget);
      const shuffledOthers = shuffleArray(otherTargets);
      const wrongChoices = shuffledOthers.slice(0, numChoices - 1);
      const allChoices = shuffleArray([randomTarget, ...wrongChoices]);
      
      setTarget(randomTarget);
      setChoices(allChoices);
      setStage('practice');
      setShowHint(false);
      setHintUsed(false);
    }
  };

  const submitGuess = (choice) => {
    setSelectedChoice(choice);
    setAttempts(attempts + 1);
    const isCorrect = choice === target || choice.toLowerCase().trim() === target.toLowerCase().trim();
    
    if (isCorrect && !hintUsed) {
      setScore(score + 1);
      setFeedback({ correct: true, message: 'Perfect! Your intuition is strong.' });
    } else if (isCorrect && hintUsed) {
      setScore(score + 0.5);
      setFeedback({ correct: true, message: 'Correct! (Hint used - half points)' });
    } else {
      setFeedback({ correct: false, message: `The target was: ${target}. Keep practicing!` });
    }
    setStage('feedback');
    setTypedAnswer('');
  };

  const nextRound = () => {
    if (attempts >= levels[level].targets) {
      const accuracy = (score / attempts) * 100;
      const requiredAccuracy = 100 / levels[level].choices * 1.5;
      
      if (accuracy >= requiredAccuracy && level < 10) {
        setLevel(level + 1);
        setScore(0);
        setAttempts(0);
      }
      setStage('relaxation');
      setRelaxationTimer(10);
    } else {
      startPractice();
    }
  };

  const resetGame = () => {
    setStage('modeSelect');
    setProfile(null);
    setLevel(1);
    setScore(0);
    setAttempts(0);
    setUsedTargets([]);
  };

  const copyResults = () => {
    const accuracy = Math.round((score / attempts) * 100);
    const text = `AIT Results - ${new Date().toLocaleString()}\nMode: ${mode}\nProfile: ${profile.name}\nLevel: ${level}\nScore: ${score}/${attempts} (${accuracy}%)`;
    navigator.clipboard.writeText(text);
    alert('Results copied!');
  };

  const ProgressBar = () => {
    const percentage = attempts > 0 ? (score / attempts) * 100 : 0;
    return (
      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-900 z-50 flex">
        <div className="bg-red-600 transition-all duration-700" style={{ width: `${100 - percentage}%` }} />
        <div className="bg-green-600 transition-all duration-700" style={{ width: `${percentage}%` }} />
      </div>
    );
  };

  const BreathingIndicator = () => {
    const text = breathPhase === 'inhale' ? 'Breathe In' : breathPhase === 'exhale' ? 'Breathe Out' : 'Hold';
    const scale = breathPhase === 'inhale' ? 1 + (breathTimer / 4) * 0.3 : breathPhase === 'exhale' ? 1.3 - (breathTimer / 4) * 0.3 : 1.15;

    return (
      <div className="fixed left-4 top-16 flex items-center gap-3 bg-gray-800/60 px-4 py-3 rounded-lg border border-gray-700">
        <Wind className="w-6 h-6 text-gray-400" style={{ transform: `scale(${scale})` }} />
        <div>
          <p className="text-gray-400 text-xs">{text}</p>
          <div className="w-16 h-1 bg-gray-700 rounded-full mt-1">
            <div className="h-full bg-gray-400" style={{ width: `${(breathTimer / 4) * 100}%` }} />
          </div>
        </div>
      </div>
    );
  };

  if (stage === 'modeSelect') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <Eye className="w-20 h-20 mx-auto mb-6 text-gray-400 animate-pulse" />
            <h1 className="text-5xl font-light text-gray-200 mb-3">Advanced Intuition Training</h1>
            <p className="text-gray-500 text-sm mb-2">Based on Remote Viewing protocols from CIA Stargate Project</p>
            <p className="text-gray-400 text-lg">Select Your Training Mode</p>
          </div>
          
          <div className="space-y-4">
            <button onClick={() => selectMode('normal')} className="w-full bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg p-6 transition-all duration-500 group">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xl font-medium text-gray-200 mb-1">Normal Mode</h3>
                  <p className="text-gray-400 text-sm">Standard intuition training with progressive levels</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-gray-300" />
              </div>
            </button>

            <button onClick={() => selectMode('hypermode')} className="w-full bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-700 rounded-lg p-6 transition-all duration-500 group">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-medium text-purple-300">Hypermode</h3>
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-gray-400 text-sm">Advanced training for real remote viewers</p>
                </div>
                <ChevronRight className="w-6 h-6 text-purple-500" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'profiles') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <Target className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h1 className="text-5xl font-light text-gray-200 mb-3">Choose Your Focus</h1>
            <p className="text-gray-400 text-lg">Select a perception profile</p>
          </div>
          
          <div className="space-y-4">
            {profiles.map((prof) => (
              <button key={prof.id} onClick={() => selectProfile(prof)} className="w-full bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg p-6 transition-all duration-500 group">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-xl font-medium text-gray-200 mb-1">{prof.name}</h3>
                    <p className="text-gray-400 text-sm">{prof.desc}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-gray-300" />
                </div>
              </button>
            ))}
          </div>
          
          <button onClick={() => setStage('modeSelect')} className="w-full mt-6 bg-gray-700/30 text-gray-400 py-3 rounded-lg">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'levelSelect') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-gray-200 mb-2">Select Your Level</h2>
            <p className="text-gray-400">{profile.name}</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {Object.keys(levels).map((lvl) => (
              <button key={lvl} onClick={() => selectLevel(parseInt(lvl))} className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg p-4">
                <p className="text-2xl font-light text-gray-300 mb-1">{lvl}</p>
                <p className="text-xs text-gray-400 mb-2">{levels[lvl].name}</p>
                <p className="text-xs text-gray-500">{levels[lvl].choices} choices</p>
              </button>
            ))}
          </div>
          
          <button onClick={() => setStage('profiles')} className="w-full bg-gray-700/50 text-gray-300 py-3 rounded-lg">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'relaxation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <BreathingIndicator />
        <div className="max-w-md w-full text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-700/30 border-4 border-gray-600 flex items-center justify-center">
            <span className="text-6xl font-light text-gray-300">{relaxationTimer}</span>
          </div>
          <h2 className="text-3xl font-light text-gray-200 mb-4">Prepare Your Mind</h2>
          <p className="text-gray-400">Close your eyes. Follow your breath. Clear your thoughts. Let your intuition awaken.</p>
        </div>
      </div>
    );
  }

  if (stage === 'practice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <ProgressBar />
        <div className="max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-400 text-sm">
              {mode === 'hypermode' ? 'HYPERMODE' : `Level ${level}: ${levels[level].name}`}
            </div>
            <div className="text-gray-400 text-sm">{attempts + 1} / {levels[level].targets}</div>
          </div>
          
          {mode === 'hypermode' ? (
            // HYPERMODE: Type answer manually, no hints, no choices
            <div>
              <div className="bg-gray-700/30 rounded-lg p-8 border border-gray-600 mb-8 relative overflow-hidden">
                <div className="text-center relative z-20">
                  <Eye className="w-16 h-16 mx-auto mb-4 text-purple-500 animate-pulse" />
                  <p className="text-purple-300 text-xl mb-2">What do you perceive?</p>
                  <p className="text-gray-500 text-sm mb-4">Trust only your remote viewing abilities...</p>
                  <p className="text-purple-400 text-xs">Type your answer below</p>
                </div>
              </div>
              
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && typedAnswer && submitGuess(typedAnswer)}
                placeholder="Type what you sense..."
                className="w-full bg-gray-700/50 border border-purple-700/50 rounded-lg px-6 py-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-600 mb-4 text-center text-xl"
                autoFocus
              />
              
              <button
                onClick={() => submitGuess(typedAnswer)}
                disabled={!typedAnswer}
                className="w-full bg-purple-900/50 hover:bg-purple-800/50 disabled:bg-gray-700 disabled:text-gray-500 text-purple-300 font-medium py-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
              >
                Submit Perception
              </button>
            </div>
          ) : (
            // NORMAL MODE: Multiple choice with hints
              <div>
              <div className="bg-gray-700/30 rounded-lg p-8 border border-gray-600 mb-8 relative overflow-hidden">
                <div className="text-center relative z-10">
                  <div className="relative inline-block mb-4 w-20 h-20 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${showHint ? 'bg-white' : 'bg-transparent'}`} />
                    {showHint && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 blur-sm z-10">
                        {getHintVisualization(target, profile.id)}
                      </div>
                    )}
                    <Eye className={`w-16 h-16 relative z-20 animate-pulse transition-colors duration-300 ${showHint ? 'text-gray-800' : 'text-gray-500'}`} />
                  </div>
                  <p className="text-gray-300 text-xl mb-2">Which one do you sense?</p>
                  <p className="text-gray-500 text-sm mb-4">Trust your first instinct...</p>
                  
                  <button onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsed(true); }} className="bg-gray-800/40 text-gray-600 px-4 py-2 rounded-lg text-xs border border-gray-700/50">
                    {showHint ? 'clear' : 'help'}
                  </button>
                </div>
              </div>
              
              <div className={`grid gap-3 mb-6 ${levels[level].choices <= 3 ? 'grid-cols-1' : levels[level].choices <= 6 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {choices.map((choice, i) => (
                  <button key={i} onClick={() => submitGuess(choice)} className="bg-gray-700/50 hover:bg-gray-600/70 border border-gray-600 rounded-lg p-6 transform hover:scale-105">
                    <p className="text-gray-200 text-lg">{choice}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Accuracy</span>
              <span className="text-gray-300">{attempts > 0 ? Math.round((score / attempts) * 100) : 0}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'feedback') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <ProgressBar />
        <div className="max-w-md w-full text-center">
          <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${feedback.correct ? 'bg-green-900/30 border-4 border-green-700' : 'bg-red-900/30 border-4 border-red-700'}`}>
            {feedback.correct ? <Award className="w-16 h-16 text-green-500" /> : <Eye className="w-16 h-16 text-red-500" />}
          </div>
          
          <h2 className={`text-3xl font-light mb-4 ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
            {feedback.correct ? 'Correct!' : 'Not quite'}
          </h2>
          <p className="text-gray-300 mb-2 text-lg">{feedback.message}</p>
          {!feedback.correct && <p className="text-gray-500 text-sm mb-8">You chose: {selectedChoice}</p>}
          
          <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600 mb-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-gray-400 text-sm mb-1">Score</p>
                <p className="text-gray-200 text-2xl font-light">{score}/{attempts}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Accuracy</p>
                <p className="text-gray-200 text-2xl font-light">{Math.round((score / attempts) * 100)}%</p>
              </div>
            </div>
          </div>
          
          {attempts >= levels[level].targets ? (
            <div className="space-y-3">
              <button onClick={copyResults} className="w-full bg-blue-900/30 border border-blue-800 text-blue-300 py-3 rounded-lg">
                📋 Copy Results
              </button>
              <button onClick={nextRound} className="w-full bg-gray-600 text-gray-200 py-3 rounded-lg">
                Continue Training
              </button>
              <button onClick={resetGame} className="w-full bg-gray-700/50 text-gray-300 py-3 rounded-lg flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Start Over
              </button>
            </div>
          ) : (
            <button onClick={nextRound} className="w-full bg-gray-600 text-gray-200 py-3 rounded-lg">
              Next Target
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default AITEnhanced;
