import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Square } from 'lucide-react';
import '../styles/flashcards.css';
import '../styles/progress.css';

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const flipSoundRef = useRef(new Audio('/flip.mp3'));

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    } else {
      console.warn("Speech Synthesis API no es compatible con este navegador.");
    }

    // Actualizar CSS variable para la barra de progreso
    document.documentElement.style.setProperty(
      '--progress-width',
      `${((currentCard + 1) / flashcards.length) * 100}%`
    );
  }, [currentCard]);

  const speakText = (text: string, lang = 'en-US') => {
    if (speechSupported) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const flipCard = () => {
    flipSoundRef.current.play().catch(err => console.log('Error playing sound:', err));
    setShowAnswer(!showAnswer);
  };

  const flashcards = [
    {
      id: 1,
      category: "Introduction",
      flag: "🌏",
      question: "How do you start the presentation?",
      answer: "Hi everyone! Today I'm going to tell you about how friendship is celebrated in different cultures around the world, focusing on Japan, India, and Latin America.",
      pronunciation: "[Jái évriwan! Tudéi aim góing tu tél yu abáut jáu fréndship is sélebreited in dífrent cálchurs aráund de wórld, fócusing on Yapán, Índia, and Látin Amérika.]"
    },
    {
      id: 2,
      category: "Japan",
      flag: "🇯🇵",
      question: "What is Kizuna and how is it expressed?",
      answer: "Kizuna (絆) is the Japanese word for 'bond' or 'emotional tie.' Friends get together on special occasions (for example, when someone starts a new job or moves to a new home) and exchange small, handwritten thank-you cards highlighting qualities they appreciate in each other.",
      pronunciation: "[Kízuna is de Yápanís wórd for bónd or emóushonal tái. Frénds guét togéder on spéshal okéishons (for egzámpl, wuen sámwán stárts a niú yób or múvs tu a niú jóum) and ékschéinch smól, hándríten zánk-iú cards, jáilaighting cóalitis déi apríshiéit in ích óder.]"
    },
    {
      id: 3,
      category: "Japan",
      flag: "🇯🇵",
      question: "What is Hanami and its importance to friendship?",
      answer: "In spring, many friend groups organize hanami (cherry-blossom viewing) outings, reinforcing their sense of community.",
      pronunciation: "[In spríng, méni frénd grúps órganáiz hanámi (chéri blósom víuwing) áutings, ríinforzing déir sens of comiúni-ti.]"
    },
    {
      id: 4,
      category: "India",
      flag: "🇮🇳",
      question: "How do traditional ceremonies include friendship in India?",
      answer: "Although traditionally centered on siblings, in many regions these ceremonies extend to very close friends.",
      pronunciation: "[Olzóu tradíshonali séntered on síblings, in méni ríyons díis sérimonís ékstend tu véri clóus frénds.]"
    },
    {
      id: 5,
      category: "India",
      flag: "🇮🇳",
      question: "What is Rakhi and its significance?",
      answer: "A decorated thread (rakhi) is tied around the wrist of the other person as a symbol of protection and affection. The recipient in turn offers sweets and a small gift.",
      pronunciation: "[A décoreited thred (ráki) is táid arraund de ríst of di óder pérson as a símbol of protékshon and afékshon. De resípient in térn ófers suíits and a smól guíft.]"
    },
    {
      id: 6,
      category: "India",
      flag: "🇮🇳",
      question: "How is Bhai Dooj connected to friendship?",
      answer: "While celebrating brother-sister bonds, deep friendships sometimes take part, exchanging blessings and presents.",
      pronunciation: "[Wáil celébreiting bróder-síster bónds, díip fréndships sámtáims teik párt, ékschéinching blésings and présents.]"
    },
    {
      id: 7,
      category: "Mexico & Latin America",
      flag: "🇲🇽",
      question: "What are Friendship Bracelets and their meaning?",
      answer: "Hand-woven strands of colored thread, each color symbolizing a value (loyalty, joy, hope...). They are woven and gifted at farewells (for example, graduating from school), with the belief that the receiver makes a wish when it's tied on, and when it eventually falls off—worn through—the wish will come true.",
      pronunciation: "[Jánd wóven strands of cólord thred, ích cólor símboláizing a váliú (lóyalti, yóy, hóup...) Déi ar wóven and guífted at férwels (for egzámpl, grádueiting from skuul), wíd de belíf dát de resíver méiks a wísh wuen its táid on, and wuen it éventchuali fôls óf—wórn thru—de wísh wíl com trú.]"
    },
    {
      id: 8,
      category: "Mexico & Latin America",
      flag: "🇲🇽",
      question: "How do Friendship Bracelets build community?",
      answer: "'Bracelet-making workshops' are common at festivals and youth camps, strengthening camaraderie by creating together.",
      pronunciation: "[Brácelet méiking wórkshops ar cómon at féstivals and yúz cáamps, stréngthening camarádari bai créiiting togéder.]"
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const resetCards = () => {
    setCurrentCard(0);
    setShowAnswer(false);
  };

  const currentFlashcard = flashcards[currentCard];

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">
          Friendship Around the World - Flashcards
        </h1>
        <p className="subtitle">Click the card to flip it and see the answer!</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-text">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm text-gray-600">
            {currentCard + 1} of {flashcards.length}
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill"
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="flashcard">
        <div 
          className="flashcard-inner"
          onClick={flipCard}
        >
          {/* Category Header */}
          <div className="card-header">
            <div className="header-left">
              <span className="text-3xl">{currentFlashcard.flag}</span>
              <span className="category-badge">
                {currentFlashcard.category}
              </span>
            </div>
            <div className="audio-controls">
              <button
                className="audio-button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (speechSupported) {
                    speakText(currentFlashcard.answer, 'en-US');
                  }
                }}
                disabled={!speechSupported}
                title="Escuchar pronunciación"
              >
                <Volume2 size={20} />
              </button>
              <button
                className="audio-button"
                onClick={(e) => {
                  e.stopPropagation();
                  stopSpeech();
                }}
                title="Detener audio"
              >
                <Square size={20} />
              </button>
            </div>
          </div>

          {/* Card Content */}
          <div className="card-content">
            {!showAnswer ? (
              <div>
                <h2 className="question">
                  {currentFlashcard.question}
                </h2>
                <div className="flip-hint">
                  Click to see answer
                </div>
              </div>
            ) : (
              <div className="answer-section">
                <div className="answer-box english">
                  <h3 className="answer-title english">English:</h3>
                  <p className="answer-text">
                    {currentFlashcard.answer}
                  </p>
                </div>
                
                <div className="answer-box pronunciation">
                  <h3 className="answer-title pronunciation">Pronunciation:</h3>
                  <p className="answer-text font-mono">
                    {currentFlashcard.pronunciation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button 
          onClick={prevCard}
          className="control-button prev"
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </button>
        
        <button 
          onClick={flipCard}
          className="control-button flip"
        >
          <RotateCcw size={20} />
          <span>Flip Card</span>
        </button>
        
        <button 
          onClick={nextCard}
          className="control-button next"
        >
          <span>Next</span>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Reset Button */}
      <button 
        onClick={resetCards}
        className="reset-button"
      >
        Reset to first card
      </button>

      {/* Study Tips */}
      <div className="study-tips">
        <h3 className="tips-title">💡 Study Tips:</h3>
        <ul className="tips-list">
          <li>• Read the pronunciation guide out loud</li>
          <li>• Practice the hand gestures while speaking</li>
          <li>• Try to memorize the key phrases first</li>
          <li>• Go through all cards 2-3 times for best results</li>
        </ul>
      </div>
    </div>
  );
};

export default Flashcards;
