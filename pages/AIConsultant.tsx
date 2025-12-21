
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, FileText, Music, Languages, Book, Scale } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { Message } from '../types';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'سلام! من دستیار هوشمند UniPlus هستم. چطور می‌تونم در مسیر تحصیلی، قوانین آموزشی یا پژوهش بهت کمک کنم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await gemini.getAcademicCounseling(textToSend);
    const aiMsg: Message = { role: 'model', text: response || 'مشکلی پیش آمد.' };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="bg-emerald-600 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">دستیار هوشمند علمی و حقوقی</h2>
            <div className="flex items-center gap-1 text-emerald-100 text-sm">
              <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
              آنلاین و آماده پاسخگویی
            </div>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="تحلیل فایل PDF">
                <FileText className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="موزیک یاب">
                <Music className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`p-3 rounded-2xl h-fit ${msg.role === 'user' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-3xl leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none shadow-lg' 
                : 'bg-slate-50 border border-slate-100 rounded-tl-none text-slate-800'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 animate-pulse">
            <div className="p-3 rounded-2xl bg-slate-100"><Bot className="w-5 h-5 text-slate-400" /></div>
            <div className="bg-slate-50 w-24 h-10 rounded-3xl"></div>
          </div>
        )}
      </div>

      {/* Quick Suggestions & Input */}
      <div className="p-6 bg-slate-50 border-t space-y-4">
        {/* Regulation Tags */}
        <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <Scale className="w-3 h-3" />
                قوانین و مقررات:
            </div>
            {['شرایط مشروطی', 'قانون حذف ترم', 'کمیته انضباطی', 'سنوات تحصیلی', 'وام دانشجویی'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => handleSend(`قوانین مربوط به ${tag} چیست؟`)}
                  className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                    {tag}
                </button>
            ))}
        </div>

        <div className="flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="سوال خود را اینجا بپرسید (مثلاً: چطور برای کنکور ارشد آماده شوم؟)"
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm text-slate-900"
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading}
            className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 disabled:bg-slate-300 transition-all shadow-lg active:scale-95"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
