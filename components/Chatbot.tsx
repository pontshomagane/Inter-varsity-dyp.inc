import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { ChallengeCategory } from '../types';

interface ChatbotProps {
  userScore: number;
  challenges: ChallengeCategory[];
  onCompleteMicroChallenge: (challengeId: string, points: number) => void;
}

type ChallengeType = 'password-strength' | 'phishing-awareness';

interface ActiveMicroChallenge {
    challengeId: string;
    type: ChallengeType;
    stage: 'offered' | 'prompted' | 'answered';
    prompt: string;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  interactive?: {
      type: 'accept_challenge';
      challengeId: string;
      challengeType: ChallengeType;
  }
}

const Chatbot: React.FC<ChatbotProps> = ({ userScore, challenges, onCompleteMicroChallenge }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMicroChallenge, setActiveMicroChallenge] = useState<ActiveMicroChallenge | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasOfferedChallenge = useRef(false);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const getInitialMessage = (score: number): string => {
    if (score <= 30) return "Welcome! I'm your AI Security Coach. Ask me anything about phishing or basic security, and I'll help you out!";
    if (score <= 70) return "Great progress! You're ready for more advanced topics. Ask me about social engineering or multi-factor authentication.";
    return "You're doing fantastic! Ask me about complex threats or specific security strategies.";
  };

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);
  
  const offerMicroChallenge = () => {
      const weakArea = challenges.find(c => 
        (c.id === 'password-strength' || c.id === 'phishing-awareness') && 
        !c.content.tasks.every(t => t.completed)
      );

      if (weakArea && !hasOfferedChallenge.current) {
          hasOfferedChallenge.current = true;
          const offerMessage: Message = {
              sender: 'bot',
              text: `I noticed you're working on the ${weakArea.title} module. How about a quick, custom challenge to sharpen your skills?`,
              interactive: {
                  type: 'accept_challenge',
                  challengeId: weakArea.id,
                  challengeType: weakArea.id as ChallengeType,
              }
          };
          setMessages(prev => [...prev, offerMessage]);
      }
  }

  useEffect(() => {
    const baseMessage: Message = { sender: 'bot', text: getInitialMessage(userScore) };
    setMessages([baseMessage]);
    hasOfferedChallenge.current = false;
    setActiveMicroChallenge(null);
  }, [userScore]);

  useEffect(() => {
    if (isOpen && messages.length === 1) {
        offerMicroChallenge();
    }
  }, [isOpen, messages]);

  const handleAcceptChallenge = async (challengeId: string, type: ChallengeType) => {
      setMessages(prev => prev.filter(m => !m.interactive));
      setIsLoading(true);

      try {
          const generationPrompt = type === 'password-strength'
              ? "Generate a single, tricky task for a user learning about strong passwords. The task must be a creative rule they have to follow and be verifiable. For example: 'Your password must include a day of the week spelled backwards.' or 'Your password must contain a punctuation mark inside a word, like 'secu.rity'. Return ONLY the task description as a single sentence."
              : "Generate a single, tricky phishing message component for a user to analyze, like a subject line or a short sentence from an email body. It must contain a subtle red flag (like a typo, odd grammar, or suspicious link text). For example: 'Subject: Urgent Accont Verification Requiered' or 'Please click the link to www.yourbank-secure.com to update details.'. Return ONLY the phishing text.";
          
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: generationPrompt,
          });

          const challengePrompt = response.text;
          
          const promptMessageText = type === 'password-strength'
              ? `Great! Here is your challenge: ${challengePrompt} Type a password that follows this rule.`
              : `Awesome! Analyze this text and tell me what's suspicious about it: "${challengePrompt}"`;

          setMessages(prev => [...prev, { sender: 'bot', text: promptMessageText }]);
          setActiveMicroChallenge({ challengeId, type, prompt: challengePrompt, stage: 'prompted' });

      } catch (error) {
          console.error("Error generating challenge:", error);
          setMessages(prev => [...prev, { sender: 'bot', text: "I'm having trouble creating a challenge right now. Please ask me a question instead." }]);
      } finally {
          setIsLoading(false);
      }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);
    
    if (activeMicroChallenge?.stage === 'prompted') {
        // Handle micro-challenge answer
        try {
            const validationPrompt = activeMicroChallenge.type === 'password-strength'
              ? `A user was given this password rule: '${activeMicroChallenge.prompt}'. They submitted this password: '${currentInput}'. Does the password likely follow the rule? Start your response with 'Correct!' or 'Incorrect.'. Then, provide a one-sentence explanation.`
              : `A user was asked to find the suspicious part of this text: '${activeMicroChallenge.prompt}'. They responded: '${currentInput}'. Is their response accurate? Start your response with 'Correct!' or 'Incorrect.'. Then, provide a one-sentence explanation.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: validationPrompt,
            });

            const feedbackText = response.text;
            setMessages(prev => [...prev, { sender: 'bot', text: feedbackText }]);
            if (feedbackText.toLowerCase().startsWith('correct')) {
                onCompleteMicroChallenge(activeMicroChallenge.challengeId, 25);
                setMessages(prev => [...prev, { sender: 'bot', text: "Excellent work! I've added 25 XP to your progress." }]);
            }
        } catch(error) {
            console.error("Error validating answer:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I couldn't verify your answer. Let's try again later." }]);
        } finally {
            setActiveMicroChallenge(null);
            setIsLoading(false);
        }
    } else {
        // Handle normal conversation
        try {
            const context = "The user has completed some training modules on cybersecurity.";
            const prompt = `System Instruction: You are a friendly and encouraging cybersecurity coach. Your goal is to provide personalized, actionable security tips. Keep your responses concise (2-3 sentences). Do not reveal that you are an AI model.
    
            User Progress Context: ${context}
            User's Question: "${userMessage.text}"
    
            Based on the context and question, provide a helpful and relevant security tip.`;
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            const botMessage: Message = { sender: 'bot', text: response.text };
            setMessages(prev => [...prev, botMessage]);
    
        } catch (error) {
            console.error("Error fetching AI response:", error);
            const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again in a moment." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }
  };

  return (
    <>
      <div className={`fixed bottom-5 right-5 z-40 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <button onClick={() => setIsOpen(true)} className="bg-cyan-600 dark:bg-cyan-500 text-white rounded-full p-4 shadow-lg hover:bg-cyan-500 dark:hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900" aria-label="Open security coach chat">
          <svg xmlns="http://www.w.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        </button>
      </div>

      <div className={`fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 rounded-t-lg">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">AI Security Coach</h3>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index}>
                <div className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600/20 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 flex items-center justify-center text-sm font-bold">AI</div>}
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === 'user'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm'
                }`}>
                    {msg.text}
                </div>
                </div>
                {msg.interactive?.type === 'accept_challenge' && (
                    <div className="flex justify-start pl-10 mt-2">
                        <button 
                            onClick={() => handleAcceptChallenge(msg.interactive.challengeId, msg.interactive.challengeType)}
                            className="px-4 py-1.5 text-sm font-bold rounded-md transition-all bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-900 dark:hover:bg-cyan-400"
                        >
                            Accept Challenge
                        </button>
                    </div>
                )}
            </div>
          ))}
          {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600/20 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 flex items-center justify-center text-sm font-bold">AI</div>
                  <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm">
                      <div className="flex items-center gap-1.5 py-1">
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                  </div>
              </div>
          )}
           <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={isLoading ? 'Coach is thinking...' : 'Ask a question...'}
            disabled={isLoading || !!activeMicroChallenge}
            className="flex-grow bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50"
            aria-label={activeMicroChallenge ? 'Enter your answer to the challenge' : 'Ask a question'}
          />
          <button type="submit" className="bg-cyan-600 text-white rounded-md p-2 hover:bg-cyan-500 disabled:bg-slate-400 dark:disabled:bg-slate-600" disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;