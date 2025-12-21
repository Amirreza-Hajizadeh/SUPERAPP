
import React, { useState, useRef, useEffect } from 'react';
import { Mic2, Play, Pause, Download, Volume2, Settings2, Loader2, Music4, Square } from 'lucide-react';
import { gemini } from '../services/geminiService';

const PodcastStudio: React.FC = () => {
  const [text, setText] = useState('');
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Audio Playback State
  const [pausedAt, setPausedAt] = useState(0);
  const [startTime, setStartTime] = useState(0);
  
  // Audio Controls
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const [pitch, setPitch] = useState(1); // 0.5 to 2.0
  const [speed, setSpeed] = useState(1); // 0.5 to 2.0
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const isStoppedManually = useRef(false);

  const voices = [
    { name: 'Kore', gender: 'Female', desc: 'آرام و طبیعی' },
    { name: 'Puck', gender: 'Male', desc: 'عمیق و جدی' },
    { name: 'Charon', gender: 'Male', desc: 'بم و راوی‌گونه' },
    { name: 'Fenrir', gender: 'Male', desc: 'سریع و پرانرژی' },
    { name: 'Aoede', gender: 'Female', desc: 'رسمی و دقیق' },
  ];

  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    
    // Stop previous audio if playing
    handleStop();
    
    setAudioBuffer(null);
    setPausedAt(0);

    try {
      const base64Audio = await gemini.generateSpeech(text, selectedVoice);
      if (base64Audio) {
        const binaryString = window.atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const buffer = await audioContextRef.current.decodeAudioData(bytes.buffer);
        setAudioBuffer(buffer);
      }
    } catch (err) {
      console.error("Error generating/decoding audio", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioBuffer || !audioContextRef.current) return;

    if (isPlaying) {
      // PAUSE Logic
      isStoppedManually.current = true;
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      // Calculate where we paused
      const elapsed = audioContextRef.current.currentTime - startTime;
      setPausedAt(pausedAt + elapsed); // Accumulate time if multiple pauses
      setIsPlaying(false);
    } else {
      // PLAY Logic
      isStoppedManually.current = false;
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = speed;
      source.detune.value = (pitch - 1) * 1200;
      source.connect(audioContextRef.current.destination);
      
      // Determine start offset
      // If finished, reset to 0
      let offset = pausedAt;
      if (offset >= audioBuffer.duration) {
          offset = 0;
          setPausedAt(0);
      }

      source.start(0, offset);
      setStartTime(audioContextRef.current.currentTime); // Reset relative start time
      
      source.onended = () => {
          if (!isStoppedManually.current) {
              // Natural end
              setIsPlaying(false);
              setPausedAt(0);
          }
      };
      
      sourceNodeRef.current = source;
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
      if (!audioBuffer) return;
      isStoppedManually.current = true;
      if (sourceNodeRef.current) {
          sourceNodeRef.current.stop();
      }
      setIsPlaying(false);
      setPausedAt(0);
  };

  // Helper for accumulated time during play for progress bar (omitted for brevity, but logic is ready)
  // We use pausedAt for resume position. Note: the startTime logic in handlePlayPause above 
  // needs to account for the fact that we might be resuming. 
  // If resuming from 5s: 
  // source.start(0, 5).
  // Visual tracking: currentTime - startTime + 5.
  // My logic above: setStartTime(currentTime). Then elapsed = currentTime - startTime.
  // So when pausing: setPausedAt(pausedAt + elapsed). Correct.

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
            <Mic2 className="w-8 h-8" />
            استودیو پادکست هوشمند
          </h1>
          <p className="opacity-90 max-w-2xl text-lg">
            متن جزوه‌ها یا مقالات رو بده، پادکست تحویل بگیر! با قابلیت انتخاب صدای گوینده و تنظیم سرعت.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
             <label className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-violet-600" />
                متن پادکست
             </label>
             <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="متن خود را اینجا بنویسید یا کپی کنید..."
                className="w-full h-64 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-violet-500 resize-none text-slate-700 leading-relaxed text-lg"
             ></textarea>
          </div>
        </div>

        <div className="space-y-6">
           {/* Voice Settings */}
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Volume2 className="w-5 h-5 text-violet-600" />
                 تنظیمات صدا
              </h3>
              
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-slate-500 mb-2 block">انتخاب گوینده</label>
                    <div className="grid grid-cols-1 gap-2">
                       {voices.map(v => (
                          <button
                             key={v.name}
                             onClick={() => setSelectedVoice(v.name)}
                             className={`flex items-center justify-between p-3 rounded-xl transition-all ${selectedVoice === v.name ? 'bg-violet-100 text-violet-700 border border-violet-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                          >
                             <div className="flex flex-col text-right">
                                <span className="font-bold text-sm">{v.name}</span>
                                <span className="text-[10px] opacity-70">{v.desc}</span>
                             </div>
                             <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm">{v.gender}</span>
                          </button>
                       ))}
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-xs font-bold text-slate-500">سرعت پخش</label>
                        <span className="text-xs font-mono text-violet-600">{speed}x</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="2" step="0.1" 
                      value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full accent-violet-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                 </div>

                 <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-xs font-bold text-slate-500">زیر و بمی (Pitch)</label>
                        <span className="text-xs font-mono text-violet-600">{pitch}</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="1.5" step="0.1" 
                      value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))}
                      className="w-full accent-violet-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                 </div>
              </div>
           </div>

           <button 
              onClick={handleGenerate}
              disabled={isLoading || !text}
              className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
           >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Music4 className="w-5 h-5" />}
              تولید پادکست
           </button>
        </div>
      </div>

      {/* Player Section */}
      {audioBuffer && (
         <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center gap-6 animate-in slide-in-from-bottom-4">
             <div className="flex gap-4">
                 <button 
                    onClick={handlePlayPause}
                    className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center hover:bg-violet-400 transition-colors shadow-lg shadow-violet-900/50"
                 >
                    {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                 </button>
                 <button 
                    onClick={handleStop}
                    className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors shadow-lg"
                 >
                    <Square className="w-6 h-6 fill-white" />
                 </button>
             </div>
             
             <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">پادکست تولید شده</h3>
                <p className="text-slate-400 text-sm">
                   {isPlaying ? 'در حال پخش...' : 'متوقف شده'} • مدت: {Math.round(audioBuffer.duration)} ثانیه
                </p>
                
                {/* Visualizer Mockup */}
                <div className="mt-4 flex gap-1 h-8 items-end">
                   {[...Array(30)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-violet-500/80 animate-pulse' : 'bg-slate-700'}`}
                        style={{ height: isPlaying ? `${Math.random() * 80 + 20}%` : '20%', animationDelay: `${i * 0.05}s` }}
                      ></div>
                   ))}
                </div>
             </div>
             <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                <Download className="w-6 h-6" />
             </button>
         </div>
      )}
    </div>
  );
};

export default PodcastStudio;
