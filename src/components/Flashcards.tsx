import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Square } from 'lucide-react';
import '../styles/flashcards.css';

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
  }, []);

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
      flag: "🎤",
      question: "How do you start the presentation?",
      answer: `"Hi everyone! Today I'm going to tell you about how friendship is experienced in different parts of the world."`,
      pronunciation: "[Jai evri-wan. Tu-déy aim góuing tu téll iú abáut jáu fréndship is ix-pírienst in dífrent párts of de guóld.]"
    },
    {
      id: 2,
      category: "Japan",
      flag: "🇯🇵",
      question: "How are friendships in Japan described?",
      answer: `"In Japan, friendships are more formal and reserved at first. People build trust slowly, and they tend to avoid talking about personal problems."`,
      pronunciation: "[In Yapan, fréndships ar mór fórmal and risérvd at férst. Pípol bíld trást slóuli, and déi avóid tóking abáut pérsonal próblems.]"
    },
    {
      id: 3,
      category: "Japan",
      flag: "🇯🇵",
      question: "What happens once Japanese friendships become strong?",
      answer: `"But once a friendship is strong, it can last a lifetime. They highly value loyalty and harmony."`,
      pronunciation: "[Bat óns a fréndship is stróng, it can lást a láif-táim. Dey váliú lóialti and jármóni.]"
    },
    {
      id: 4,
      category: "India",
      flag: "🇮🇳",
      question: "How are friendships in India characterized?",
      answer: `"In India, friendships are incredibly warm and close. Friends spend a lot of time together, and it's common to hold hands or show affection."`,
      pronunciation: "[In Índia, fréndships ar véri wórm and clóus. Frénds spénd a lót of táim tugéder, and its nórmal tu jóuld hánds or shóu aféction.]"
    },
    {
      id: 5,
      category: "India",
      flag: "🇮🇳",
      question: "How are friends treated in Indian culture?",
      answer: `"In fact, sometimes friends are even treated like part of the family."`,
      pronunciation: "[In fakt, sámtáims, frénds ar íven tríitid láik párt of de fá-mili.]"
    },
    {
      id: 6,
      category: "Mexico",
      flag: "🇲🇽",
      question: "How do people show friendship in Mexico?",
      answer: `"In Mexico, friendships are very social and expressive. People greet with hugs or cheek kisses, and they absolutely love spending time together."`,
      pronunciation: "[In Méksico, fréndships ar véri sóshal and ixprésiv. Pípol grít wuit jágs or chíik kísez, and déi lóv spénding táim tugéder.]"
    },
    {
      id: 7,
      category: "Mexico",
      flag: "🇲🇽",
      question: "What tradition is important in Mexican friendships?",
      answer: `"There's a strong tradition of sharing food and celebrating together."`,
      pronunciation: "[Dérs a stróng tradíshon of shéring fúd and sélebréiting tugéder.]"
    },
    {
      id: 8,
      category: "Latin America",
      flag: "🌎",
      question: "How are friendships viewed in Latin America generally?",
      answer: `"In Latin America, friendships are very important. People are generally warm and open, and they truly enjoy being in groups."`,
      pronunciation: "[In Látin Amérika, fréndships ar véri impórtant. Pípol ar wórm and óupen, and déi enjói bíing in grúps.]"
    },
    {
      id: 9,
      category: "Latin America",
      flag: "🌎",
      question: "What do friends provide in Latin American culture?",
      answer: `"Friends offer emotional support and share both the good and challenging moments together."`,
      pronunciation: "[Frénds ófer imóushonal sapórt and shér bóth de gúd and chálenying móments tugéder.]"
    },
    {
      id: 10,
      category: "Conclusion",
      flag: "🎯",
      question: "How do you conclude the presentation?",
      answer: `"So, as we can see, while friendship looks different in each culture, one thing is constant: true friends are always important, no matter where you are. Thank you!"`,
      pronunciation: "[So, as wi can sí, wáhil fréndship lúks dífrent in ích cálchur, wán zing is kónstant: trú frénds ar ólways impórtant, nóu máter wér yu ar. Zánk yu!]"
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
            style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
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
