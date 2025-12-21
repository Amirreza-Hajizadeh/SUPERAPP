
import React, { useState, useRef, useEffect } from 'react';
import { 
  NotebookPen, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  Image as ImageIcon, 
  Mic, 
  X, 
  Save, 
  Search,
  StickyNote,
  Tag,
  Mic2,
  StopCircle,
  Play,
  Pause,
  AlertCircle
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
}

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  images: string[]; // Base64 strings
  audio?: string; // Blob URL
}

const Notebook: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'tasks'>('notes');
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Task State ---
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'تحویل تمرین ریاضی', completed: false, dueDate: '1402/10/12', priority: 'High', category: 'درس' },
    { id: 2, title: 'خرید کتاب زبان', completed: true, dueDate: '1402/10/10', priority: 'Medium', category: 'شخصی' },
    { id: 3, title: 'ثبت‌نام خوابگاه', completed: false, dueDate: '1402/10/20', priority: 'High', category: 'خوابگاه' },
  ]);
  const [newTask, setNewTask] = useState<Partial<Task>>({ priority: 'Medium', category: 'درس' });

  // --- Note State ---
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: 'ایده پروژه پایانی', content: 'استفاده از هوش مصنوعی برای تحلیل رفتار کاربران در شبکه‌های اجتماعی...', date: '1402/10/05', category: 'ایده', images: [] },
    { id: 2, title: 'لیست خرید', content: 'ماکارونی، سویا، روغن، نان تست', date: '1402/10/04', category: 'شخصی', images: [] },
  ]);
  const [newNote, setNewNote] = useState<Partial<Note>>({ category: 'عمومی', images: [] });
  
  // --- Media State ---
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- Handlers ---

  const handleAddTask = () => {
    if (newTask.title) {
      setTasks([...tasks, { 
        id: Date.now(), 
        title: newTask.title, 
        completed: false, 
        dueDate: newTask.dueDate || 'تعیین نشده', 
        priority: newTask.priority || 'Medium',
        category: newTask.category || 'عمومی'
      } as Task]);
      setNewTask({ priority: 'Medium', category: 'درس' });
      setShowModal(false);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddNote = () => {
    if (newNote.title || newNote.content) {
      const note: Note = {
        id: Date.now(),
        title: newNote.title || 'بدون عنوان',
        content: newNote.content || '',
        date: new Date().toLocaleDateString('fa-IR'),
        category: newNote.category || 'عمومی',
        images: newNote.images || [],
        audio: newNote.audio
      };
      setNotes([note, ...notes]);
      setNewNote({ category: 'عمومی', images: [] });
      setShowModal(false);
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  // --- Image Upload ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewNote(prev => ({ ...prev, images: [...(prev.images || []), reader.result as string] }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Audio Recording ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setNewNote(prev => ({ ...prev, audio: url }));
        setAudioChunks([]);
      };
      
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      alert('دسترسی به میکروفون امکان‌پذیر نیست.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleAudioPlay = (url: string) => {
    if (playingAudio === url) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setPlayingAudio(null);
      audio.play();
      setPlayingAudio(url);
    }
  };

  // --- Filtering ---
  const filteredTasks = tasks.filter(t => t.title.includes(searchQuery));
  const filteredNotes = notes.filter(n => n.title.includes(searchQuery) || n.content.includes(searchQuery));

  return (
    <div className="space-y-8 animate-in fade-in pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <NotebookPen className="w-10 h-10" />
              دفترچه یادداشت و تسک
            </h1>
            <p className="opacity-90 text-lg">
              جایی برای ایده‌ها، برنامه‌ها و کارهای روزمره شما.
            </p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-orange-600 px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-orange-50 transition-all flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            {activeTab === 'notes' ? 'یادداشت جدید' : 'تسک جدید'}
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-4 z-20">
        <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200 flex gap-1 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('notes')}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'notes' ? 'bg-amber-100 text-amber-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <StickyNote className="w-5 h-5" />
            یادداشت‌ها
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'tasks' ? 'bg-amber-100 text-amber-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <CheckSquare className="w-5 h-5" />
            وظایف (Tasks)
          </button>
        </div>

        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 w-full md:w-80 flex items-center">
          <Search className="w-5 h-5 text-slate-400 mx-3" />
          <input 
            type="text" 
            placeholder="جستجو..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-700"
          />
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-20 text-slate-400 bg-white rounded-[2.5rem] border border-slate-100">
              <CheckSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>لیست کارها خالی است. یک تسک جدید اضافه کنید!</p>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              {filteredTasks.map((task, idx) => (
                <div 
                  key={task.id} 
                  className={`flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors ${task.completed ? 'bg-slate-50/50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-400'}`}
                    >
                      {task.completed && <CheckSquare className="w-4 h-4 text-white" />}
                    </button>
                    <div>
                      <h4 className={`font-bold text-lg transition-all ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className={`px-2 py-0.5 rounded ${
                          task.priority === 'High' ? 'bg-red-50 text-red-600' : 
                          task.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {task.priority === 'High' ? 'فوری' : task.priority === 'Medium' ? 'معمولی' : 'پایین'}
                        </span>
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                          <Calendar className="w-3 h-3" /> {task.dueDate}
                        </span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded">{task.category}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 masonry-grid">
          {filteredNotes.length === 0 ? (
             <div className="col-span-full text-center py-20 text-slate-400 bg-white rounded-[2.5rem] border border-slate-100">
               <StickyNote className="w-16 h-16 mx-auto mb-4 opacity-30" />
               <p>هنوز یادداشتی ندارید.</p>
             </div>
          ) : (
            filteredNotes.map(note => (
              <div key={note.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-lg transition-all group flex flex-col h-full relative break-inside-avoid mb-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-amber-50 text-amber-700 text-[10px] px-2 py-1 rounded-lg font-bold">{note.category}</span>
                  <button onClick={() => deleteNote(note.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="font-bold text-lg text-slate-800 mb-2">{note.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-line">{note.content}</p>
                
                {/* Images */}
                {note.images && note.images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
                    {note.images.map((img, i) => (
                      <img key={i} src={img} className="w-16 h-16 rounded-xl object-cover border border-slate-200" alt="attachment" />
                    ))}
                  </div>
                )}

                {/* Audio */}
                {note.audio && (
                  <div className="mb-4 bg-slate-50 p-2 rounded-xl flex items-center gap-2">
                    <button 
                      onClick={() => toggleAudioPlay(note.audio!)}
                      className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white hover:bg-amber-600 transition-colors"
                    >
                      {playingAudio === note.audio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                       <div className={`h-full bg-amber-500 ${playingAudio === note.audio ? 'animate-pulse w-2/3' : 'w-0'}`}></div>
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  {note.date}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* --- ADD MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl animate-in zoom-in-95">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
            
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              {activeTab === 'notes' ? <StickyNote className="w-6 h-6 text-amber-500"/> : <CheckSquare className="w-6 h-6 text-amber-500"/>}
              {activeTab === 'notes' ? 'افزودن یادداشت' : 'افزودن وظیفه'}
            </h3>

            {activeTab === 'tasks' ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="عنوان کار (مثلاً: پروژه درس شبکه)" 
                  value={newTask.title || ''}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                  autoFocus
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-slate-500 mb-1 block">تاریخ سررسید</label>
                    <input 
                      type="text" 
                      placeholder="1402/xx/xx"
                      value={newTask.dueDate || ''}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      className="w-full p-3 bg-slate-50 rounded-xl outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-slate-500 mb-1 block">اولویت</label>
                    <select 
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                      className="w-full p-3 bg-slate-50 rounded-xl outline-none"
                    >
                      <option value="High">فوری (High)</option>
                      <option value="Medium">معمولی (Medium)</option>
                      <option value="Low">کم (Low)</option>
                    </select>
                  </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 mb-1 block">دسته‌بندی</label>
                    <input 
                      type="text" 
                      placeholder="درس، شخصی، ..."
                      value={newTask.category || ''}
                      onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                      className="w-full p-3 bg-slate-50 rounded-xl outline-none"
                    />
                </div>
                <button 
                  onClick={handleAddTask}
                  className="w-full py-4 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-600 transition-colors mt-4 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> افزودن تسک
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="عنوان یادداشت" 
                  value={newNote.title || ''}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-800"
                />
                <textarea 
                  placeholder="متن خود را اینجا بنویسید..." 
                  rows={5}
                  value={newNote.content || ''}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-amber-500 resize-none text-slate-700"
                ></textarea>
                
                <div className="flex gap-2 overflow-x-auto">
                   <div className="flex-1 min-w-[120px]">
                      <input 
                        type="text" 
                        placeholder="دسته‌بندی..."
                        value={newNote.category || ''}
                        onChange={(e) => setNewNote({...newNote, category: e.target.value})}
                        className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none"
                      />
                   </div>
                   
                   {/* Image Upload */}
                   <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 p-3 rounded-xl transition-colors flex items-center justify-center">
                      <ImageIcon className="w-5 h-5" />
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                   </label>

                   {/* Audio Recorder */}
                   <button 
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-3 rounded-xl transition-colors flex items-center justify-center ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                   >
                      {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                   </button>
                </div>

                {/* Previews */}
                {(newNote.images?.length || 0) > 0 && (
                   <div className="flex gap-2 overflow-x-auto pb-1">
                      {newNote.images?.map((img, i) => (
                         <img key={i} src={img} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                      ))}
                   </div>
                )}
                {newNote.audio && (
                   <div className="text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl flex items-center gap-2">
                      <CheckSquare className="w-3 h-3" /> فایل صوتی ضبط شد
                   </div>
                )}

                <button 
                  onClick={handleAddNote}
                  className="w-full py-4 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-600 transition-colors mt-2 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> ذخیره یادداشت
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notebook;
