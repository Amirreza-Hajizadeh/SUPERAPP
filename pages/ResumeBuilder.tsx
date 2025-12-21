
import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Plus, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Hexagon,
  Languages,
  Award,
  Palette,
  LayoutTemplate,
  Check
} from 'lucide-react';

// Local X Icon Import
import { X } from 'lucide-react';

interface Experience {
  id: number;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  university: string;
  year: string;
}

type ResumeTheme = 'modern' | 'classic' | 'minimal' | 'creative' | 'technical';
type ColorTheme = 'slate' | 'emerald' | 'blue' | 'rose' | 'violet' | 'amber';

const ResumeBuilder: React.FC = () => {
  // State for Resume Data
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'آرمان دانش‌پژوه',
    title: 'مهندس نرم‌افزار و توسعه‌دهنده وب',
    email: 'arman.student@uni.ac.ir',
    phone: '09123456789',
    location: 'تهران، ایران',
    website: 'linkedin.com/in/arman',
    summary: 'دانشجوی سال آخر مهندسی کامپیوتر با اشتیاق بالا به یادگیری تکنولوژی‌های جدید. تجربه‌مند در توسعه فرانت‌اند با React و علاقه‌مند به هوش مصنوعی. دارای روحیه کار تیمی و حل مسئله.'
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, role: 'کارآموز فرانت‌اند', company: 'شرکت فناوران امید', startDate: '1401', endDate: '1402', description: 'توسعه رابط کاربری با استفاده از React و Tailwind CSS. همکاری در تیم اسکرام.' }
  ]);

  const [educations, setEducations] = useState<Education[]>([
    { id: 1, degree: 'کارشناسی مهندسی کامپیوتر', university: 'دانشگاه صنعتی شریف', year: '1398 - اکنون' }
  ]);

  const [skills, setSkills] = useState<string[]>(['React.js', 'TypeScript', 'Tailwind CSS', 'Git', 'Python', 'Scrum']);
  const [newSkill, setNewSkill] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ResumeTheme>('modern');
  const [selectedColor, setSelectedColor] = useState<ColorTheme>('emerald');

  // UI State
  const [activeSection, setActiveSection] = useState<string | null>('personal');

  // Color Mapping
  const colorMap: Record<ColorTheme, { text: string, bg: string, border: string, ring: string, lightBg: string, hex: string }> = {
    slate: { text: 'text-slate-800', bg: 'bg-slate-800', border: 'border-slate-800', ring: 'ring-slate-800', lightBg: 'bg-slate-100', hex: '#1e293b' },
    emerald: { text: 'text-emerald-600', bg: 'bg-emerald-600', border: 'border-emerald-500', ring: 'ring-emerald-500', lightBg: 'bg-emerald-50', hex: '#059669' },
    blue: { text: 'text-blue-600', bg: 'bg-blue-600', border: 'border-blue-500', ring: 'ring-blue-500', lightBg: 'bg-blue-50', hex: '#2563eb' },
    rose: { text: 'text-rose-600', bg: 'bg-rose-600', border: 'border-rose-500', ring: 'ring-rose-500', lightBg: 'bg-rose-50', hex: '#e11d48' },
    violet: { text: 'text-violet-600', bg: 'bg-violet-600', border: 'border-violet-500', ring: 'ring-violet-500', lightBg: 'bg-violet-50', hex: '#7c3aed' },
    amber: { text: 'text-amber-600', bg: 'bg-amber-600', border: 'border-amber-500', ring: 'ring-amber-500', lightBg: 'bg-amber-50', hex: '#d97706' },
  };

  const currentColor = colorMap[selectedColor];

  // Handlers
  const handleDownloadPDF = () => {
    setIsDownloading(true);
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 0,
      filename: `Resume-${personalInfo.fullName.replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 1 }, // Max quality
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    if (window.html2pdf) {
      // @ts-ignore
      window.html2pdf().set(opt).from(element).save().then(() => {
        setIsDownloading(false);
      });
    } else {
      window.print();
      setIsDownloading(false);
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now(), role: '', company: '', startDate: '', endDate: '', description: '' }]);
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: number, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const addEducation = () => {
    setEducations([...educations, { id: Date.now(), degree: '', university: '', year: '' }]);
  };

  const removeEducation = (id: number) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      
      {/* --- EDITOR PANEL (Left/Top) --- */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              رزومه‌ساز حرفه‌ای
            </h2>
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
            >
              {isDownloading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <Download className="w-4 h-4" />
              )}
              دانلود PDF
            </button>
          </div>

          {/* Theme Selector */}
          <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
             <div>
                <label className="text-xs font-bold text-slate-500 mb-2 block flex items-center gap-1">
                    <LayoutTemplate className="w-4 h-4" />
                    انتخاب قالب
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {['modern', 'classic', 'minimal', 'creative', 'technical'].map((theme) => (
                        <button 
                        key={theme}
                        onClick={() => setSelectedTheme(theme as ResumeTheme)}
                        className={`p-2 rounded-xl text-xs font-bold transition-all border-2 capitalize ${selectedTheme === theme ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:bg-white'}`}
                        >
                        {theme === 'modern' ? 'مدرن (تیره)' : theme === 'classic' ? 'کلاسیک' : theme === 'minimal' ? 'مینیمال' : theme === 'creative' ? 'خلاقانه' : 'فنی'}
                        </button>
                    ))}
                </div>
             </div>

             <div>
                <label className="text-xs font-bold text-slate-500 mb-2 block flex items-center gap-1">
                    <Palette className="w-4 h-4" />
                    رنگ تم
                </label>
                <div className="flex flex-wrap gap-2">
                    {(Object.keys(colorMap) as ColorTheme[]).map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${selectedColor === color ? 'border-slate-600 scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: colorMap[color].hex }}
                        >
                            {selectedColor === color && <Check className="w-4 h-4 text-white" />}
                        </button>
                    ))}
                </div>
             </div>
          </div>

          <div className="space-y-4">
            {/* Personal Info Accordion */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveSection(activeSection === 'personal' ? null : 'personal')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <User className="w-5 h-5" />
                  اطلاعات فردی
                </div>
                {activeSection === 'personal' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {activeSection === 'personal' && (
                <div className="p-4 space-y-3 bg-white animate-in slide-in-from-top-2">
                  <input type="text" placeholder="نام و نام خانوادگی" value={personalInfo.fullName} onChange={e => setPersonalInfo({...personalInfo, fullName: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:border-indigo-500 outline-none text-slate-900" />
                  <input type="text" placeholder="عنوان شغلی (مثلاً: برنامه‌نویس وب)" value={personalInfo.title} onChange={e => setPersonalInfo({...personalInfo, title: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:border-indigo-500 outline-none text-slate-900" />
                  <input type="text" placeholder="ایمیل" value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:border-indigo-500 outline-none text-slate-900" />
                  <input type="text" placeholder="شماره تماس" value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:border-indigo-500 outline-none text-slate-900" />
                  <input type="text" placeholder="محل سکونت" value={personalInfo.location} onChange={e => setPersonalInfo({...personalInfo, location: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:border-indigo-500 outline-none text-slate-900" />
                  <textarea placeholder="درباره من (خلاصه رزومه)" rows={4} value={personalInfo.summary} onChange={e => setPersonalInfo({...personalInfo, summary: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:border-indigo-500 outline-none text-slate-900" />
                </div>
              )}
            </div>

            {/* Experience Accordion */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveSection(activeSection === 'experience' ? null : 'experience')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <Briefcase className="w-5 h-5" />
                  سوابق شغلی
                </div>
                {activeSection === 'experience' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {activeSection === 'experience' && (
                <div className="p-4 bg-white space-y-6 animate-in slide-in-from-top-2">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative p-4 border border-slate-100 rounded-xl bg-slate-50">
                      <button onClick={() => removeExperience(exp.id)} className="absolute top-2 left-2 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      <h4 className="text-xs font-bold text-slate-400 mb-2">موقعیت شغلی {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" placeholder="عنوان شغلی" value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} className="w-full p-2 bg-white rounded-lg text-sm border border-slate-200 outline-none text-slate-900" />
                        <input type="text" placeholder="نام شرکت" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className="w-full p-2 bg-white rounded-lg text-sm border border-slate-200 outline-none text-slate-900" />
                        <div className="flex gap-2">
                          <input type="text" placeholder="سال شروع" value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} className="w-1/2 p-2 bg-white rounded-lg text-sm border border-slate-200 outline-none text-slate-900" />
                          <input type="text" placeholder="سال پایان" value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} className="w-1/2 p-2 bg-white rounded-lg text-sm border border-slate-200 outline-none text-slate-900" />
                        </div>
                        <textarea placeholder="توضیحات و دستاوردها" value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} className="w-full p-2 bg-white rounded-lg text-sm border border-slate-200 outline-none text-slate-900" />
                      </div>
                    </div>
                  ))}
                  <button onClick={addExperience} className="w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold text-sm hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    افزودن سابقه جدید
                  </button>
                </div>
              )}
            </div>

            {/* Education Accordion */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveSection(activeSection === 'education' ? null : 'education')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <GraduationCap className="w-5 h-5" />
                  تحصیلات
                </div>
                {activeSection === 'education' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {activeSection === 'education' && (
                <div className="p-4 bg-white space-y-6 animate-in slide-in-from-top-2">
                   {educations.map((edu, index) => (
                    <div key={edu.id} className="relative p-4 border border-slate-100 rounded-xl bg-slate-50">
                      <button onClick={() => removeEducation(edu.id)} className="absolute top-2 left-2 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      <h4 className="text-xs font-bold text-slate-400 mb-2">مدرک تحصیلی {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" placeholder="مقطع و رشته (مثلاً: کارشناسی کامپیوتر)" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} className="w-full p-2 bg-white rounded-lg text-sm border border-slate-200 outline-none text-slate-900" />
                        <input type="text" placeholder="نام دانشگاه" value={edu.university} onChange={e => updateEducation(edu.id, 'university', e.target.value)} className="w-full p-2 bg-white rounded-lg text-sm border border-slate-200 outline-none text-slate-900" />
                        <input type="text" placeholder="سال تحصیلی (مثلاً: 1398 - 1402)" value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} className="w-full p-2 bg-white rounded-lg text-sm border border-slate-200 outline-none text-slate-900" />
                      </div>
                    </div>
                  ))}
                  <button onClick={addEducation} className="w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold text-sm hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    افزودن مدرک جدید
                  </button>
                </div>
              )}
            </div>

            {/* Skills Accordion */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveSection(activeSection === 'skills' ? null : 'skills')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <Cpu className="w-5 h-5" />
                  مهارت‌ها
                </div>
                {activeSection === 'skills' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {activeSection === 'skills' && (
                <div className="p-4 bg-white space-y-4 animate-in slide-in-from-top-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addSkill()}
                      placeholder="مهارت جدید..." 
                      className="flex-1 p-2 bg-slate-50 rounded-xl text-sm border border-slate-200 outline-none text-slate-900" 
                    />
                    <button onClick={addSkill} className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm flex items-center gap-2">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* --- GRAPHICAL PREVIEW PANEL (A4 Size) --- */}
      <div className="flex-1 bg-slate-200 p-4 md:p-8 flex justify-center overflow-auto custom-scrollbar">
        {/* Scrollable Container for Mobile */}
        <div className="min-w-fit">
            <div 
            id="resume-preview" 
            className="bg-white w-[210mm] min-h-[297mm] shadow-2xl overflow-hidden relative"
            style={{ fontFamily: 'Vazirmatn' }}
            >
            {/* ================= MODERN THEME ================= */}
            {selectedTheme === 'modern' && (
                <div className="grid grid-cols-12 min-h-[297mm] h-full relative z-10">
                {/* SIDEBAR */}
                <div className={`col-span-4 ${currentColor.bg} text-white p-8 flex flex-col relative z-10`}>
                    <div className="flex flex-col items-center mb-12">
                    <div className="w-32 h-32 rounded-full border-4 border-white/30 p-1 mb-4 relative">
                        <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                        <User className="w-16 h-16 text-white/70" />
                        </div>
                    </div>
                    </div>

                    <div className="space-y-6 mb-12">
                    <div className="border-b border-white/20 pb-2 mb-4">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                            <User className="w-4 h-4 opacity-80" />
                            تماس
                        </h4>
                    </div>
                    <div className="space-y-4 text-xs text-white/90">
                        <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 shrink-0" />
                        <span className="dir-ltr">{personalInfo.phone}</span>
                        </div>
                        <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span className="break-all">{personalInfo.email}</span>
                        </div>
                        <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>{personalInfo.location}</span>
                        </div>
                        <div className="flex items-start gap-3">
                        <Globe className="w-4 h-4 shrink-0" />
                        <span className="break-all">{personalInfo.website}</span>
                        </div>
                    </div>
                    </div>

                    <div className="space-y-6 mb-12">
                    <div className="border-b border-white/20 pb-2 mb-4">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                            <Cpu className="w-4 h-4 opacity-80" />
                            مهارت‌ها
                        </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-black/20 text-white rounded-lg text-xs font-bold border border-white/10">
                            {skill}
                        </span>
                        ))}
                    </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="col-span-8 p-10 flex flex-col relative z-10">
                    <div className="mb-10 pt-4">
                        <h1 className="text-5xl font-black text-slate-800 mb-2 leading-tight">{personalInfo.fullName}</h1>
                        <h2 className={`text-xl font-medium ${currentColor.text} tracking-wide uppercase`}>{personalInfo.title}</h2>
                    </div>

                    {personalInfo.summary && (
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                            <span className={`w-8 h-8 ${currentColor.lightBg} rounded-lg flex items-center justify-center text-slate-600`}>
                                <User className={`w-5 h-5 ${currentColor.text}`} />
                            </span>
                            درباره من
                            </h3>
                            <p className={`text-sm text-slate-600 leading-7 text-justify border-r-2 ${currentColor.border} pr-4`}>
                            {personalInfo.summary}
                            </p>
                        </div>
                    )}

                    {experiences.length > 0 && (
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                            <span className={`w-8 h-8 ${currentColor.lightBg} rounded-lg flex items-center justify-center text-slate-600`}>
                                <Briefcase className={`w-5 h-5 ${currentColor.text}`} />
                            </span>
                            سوابق شغلی
                            </h3>
                            <div className="space-y-8 border-r border-slate-200 mr-4 pr-6">
                            {experiences.map(exp => (
                                <div key={exp.id} className="relative">
                                    <div className={`absolute -right-[1.9rem] top-1.5 w-3 h-3 rounded-full ${currentColor.bg} ring-4 ring-white`}></div>
                                    <h4 className="font-bold text-slate-800 text-lg">{exp.role}</h4>
                                    <div className="flex justify-between items-center text-sm text-slate-500 mt-1 mb-2">
                                        <span className={`font-semibold ${currentColor.text}`}>{exp.company}</span>
                                        <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed text-justify">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                            </div>
                        </div>
                    )}

                    {educations.length > 0 && (
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                            <span className={`w-8 h-8 ${currentColor.lightBg} rounded-lg flex items-center justify-center text-slate-600`}>
                                <GraduationCap className={`w-5 h-5 ${currentColor.text}`} />
                            </span>
                            تحصیلات
                            </h3>
                            <div className="space-y-6">
                            {educations.map(edu => (
                                <div key={edu.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                                        <p className="text-sm text-slate-500 mt-1">{edu.university}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`block text-xs font-bold ${currentColor.text} ${currentColor.lightBg} px-3 py-1 rounded-full mb-1`}>فارغ‌التحصیل</span>
                                        <span className="text-xs text-slate-400 font-mono">{edu.year}</span>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    )}
                </div>
                </div>
            )}

            {/* ================= CLASSIC THEME ================= */}
            {selectedTheme === 'classic' && (
                <div className="p-12 min-h-[297mm] h-full text-slate-900 font-serif">
                    {/* Header */}
                    <div className="border-b-2 border-slate-800 pb-6 mb-8 text-center">
                    <h1 className="text-4xl font-black mb-2 uppercase tracking-wide">{personalInfo.fullName}</h1>
                    <h2 className="text-lg font-bold text-slate-600 uppercase mb-4">{personalInfo.title}</h2>
                    <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-600 font-mono">
                        <span>{personalInfo.phone}</span> • 
                        <span>{personalInfo.email}</span> • 
                        <span>{personalInfo.location}</span>
                    </div>
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                    <div className="mb-8">
                        <h3 className="font-bold text-lg uppercase border-b border-slate-300 mb-3 pb-1">خلاصه رزومه</h3>
                        <p className="text-sm leading-7 text-justify">{personalInfo.summary}</p>
                    </div>
                    )}

                    {/* Experience */}
                    {experiences.length > 0 && (
                    <div className="mb-8">
                        <h3 className="font-bold text-lg uppercase border-b border-slate-300 mb-4 pb-1">سوابق شغلی</h3>
                        <div className="space-y-6">
                            {experiences.map(exp => (
                                <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-md">{exp.role}</h4>
                                    <span className="text-xs font-bold font-mono">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-semibold text-slate-700 italic mb-2">{exp.company}</div>
                                <p className="text-sm leading-6 text-justify">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}

                    {/* Education */}
                    {educations.length > 0 && (
                    <div className="mb-8">
                        <h3 className="font-bold text-lg uppercase border-b border-slate-300 mb-4 pb-1">تحصیلات</h3>
                        <div className="space-y-4">
                            {educations.map(edu => (
                                <div key={edu.id} className="flex justify-between">
                                <div>
                                    <h4 className="font-bold text-md">{edu.degree}</h4>
                                    <p className="text-sm text-slate-600">{edu.university}</p>
                                </div>
                                <span className="text-xs font-bold font-mono">{edu.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}

                    {/* Skills */}
                    <div className="mb-8">
                        <h3 className="font-bold text-lg uppercase border-b border-slate-300 mb-4 pb-1">مهارت‌ها</h3>
                        <div className="grid grid-cols-3 gap-y-2 text-sm">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                                {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= MINIMAL THEME ================= */}
            {selectedTheme === 'minimal' && (
                <div className="p-16 min-h-[297mm] h-full text-slate-700 bg-slate-50/30">
                    <div className="flex gap-12 h-full">
                    {/* Left Column (Info) */}
                    <div className="w-1/3 border-l border-slate-200 pl-8 order-2">
                        <div className="mb-10">
                            <h4 className="font-bold text-slate-900 mb-4 text-sm tracking-wider uppercase">تماس</h4>
                            <div className="space-y-3 text-xs text-slate-500">
                                <div className="block">{personalInfo.phone}</div>
                                <div className="block break-all">{personalInfo.email}</div>
                                <div className="block">{personalInfo.location}</div>
                                <div className="block break-all">{personalInfo.website}</div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h4 className="font-bold text-slate-900 mb-4 text-sm tracking-wider uppercase">مهارت‌ها</h4>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-10">
                            <h4 className="font-bold text-slate-900 mb-4 text-sm tracking-wider uppercase">تحصیلات</h4>
                            <div className="space-y-4">
                                {educations.map(edu => (
                                    <div key={edu.id}>
                                    <div className="font-bold text-xs text-slate-800">{edu.degree}</div>
                                    <div className="text-[10px] text-slate-500 mb-1">{edu.university}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Content) */}
                    <div className="w-2/3 order-1 pr-4">
                        <div className="mb-12">
                            <h1 className="text-4xl font-light text-slate-900 mb-2">{personalInfo.fullName}</h1>
                            <h2 className={`text-sm font-bold ${currentColor.text} uppercase tracking-widest`}>{personalInfo.title}</h2>
                        </div>

                        {personalInfo.summary && (
                            <div className="mb-10">
                                <p className="text-sm leading-7 text-slate-600 text-justify">{personalInfo.summary}</p>
                            </div>
                        )}

                        {experiences.length > 0 && (
                            <div>
                                <h3 className="font-bold text-slate-900 mb-6 text-sm tracking-wider uppercase">تجربیات کاری</h3>
                                <div className="space-y-8">
                                {experiences.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="font-bold text-lg text-slate-800">{exp.role}</h4>
                                            <span className="text-xs text-slate-400 font-mono">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className={`text-sm ${currentColor.text} font-medium mb-3`}>{exp.company}</div>
                                        <p className="text-sm leading-6 text-slate-500 text-justify">{exp.description}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
            )}

            {/* ================= CREATIVE THEME ================= */}
            {selectedTheme === 'creative' && (
                <div className="min-h-[297mm] h-full flex flex-col">
                    {/* Header */}
                    <div className={`${currentColor.bg} p-12 text-white`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-black mb-2">{personalInfo.fullName}</h1>
                            <h2 className="text-xl opacity-90">{personalInfo.title}</h2>
                        </div>
                        <div className="w-32 h-32 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center">
                            <User className="w-16 h-16 opacity-80" />
                        </div>
                    </div>
                    <div className="flex gap-6 mt-8 text-sm opacity-80 font-mono">
                        <span>{personalInfo.email}</span>
                        <span>|</span>
                        <span>{personalInfo.phone}</span>
                        <span>|</span>
                        <span>{personalInfo.location}</span>
                    </div>
                    </div>

                    <div className="flex-1 p-12 grid grid-cols-3 gap-12 bg-white">
                    <div className="col-span-2 space-y-10">
                        {personalInfo.summary && (
                            <section>
                                <h3 className={`text-xl font-black ${currentColor.text} mb-4 flex items-center gap-2`}>
                                <span className={`w-8 h-2 ${currentColor.bg} rounded-full`}></span>
                                درباره من
                                </h3>
                                <p className="text-slate-600 leading-8 text-justify">{personalInfo.summary}</p>
                            </section>
                        )}

                        {experiences.length > 0 && (
                            <section>
                                <h3 className={`text-xl font-black ${currentColor.text} mb-6 flex items-center gap-2`}>
                                <span className={`w-8 h-2 ${currentColor.bg} rounded-full`}></span>
                                تجربیات کاری
                                </h3>
                                <div className="space-y-8">
                                {experiences.map(exp => (
                                    <div key={exp.id} className="pl-4 border-l-2 border-slate-100">
                                        <h4 className="font-bold text-lg text-slate-800">{exp.role}</h4>
                                        <div className="flex justify-between text-sm mt-1 mb-2">
                                            <span className="font-medium text-slate-500">{exp.company}</span>
                                            <span className={`font-mono font-bold ${currentColor.text}`}>{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="col-span-1 space-y-10">
                        <section className="bg-slate-50 p-6 rounded-2xl">
                            <h3 className={`font-bold text-slate-800 mb-4 pb-2 border-b-2 ${currentColor.border}`}>مهارت‌ها</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
                                    {skill}
                                </span>
                                ))}
                            </div>
                        </section>

                        {educations.length > 0 && (
                            <section>
                                <h3 className={`font-bold text-slate-800 mb-4 pb-2 border-b-2 ${currentColor.border}`}>تحصیلات</h3>
                                <div className="space-y-4">
                                {educations.map(edu => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-sm text-slate-800">{edu.degree}</div>
                                        <div className="text-xs text-slate-500">{edu.university}</div>
                                        <div className="text-xs text-slate-400 font-mono mt-1">{edu.year}</div>
                                    </div>
                                ))}
                                </div>
                            </section>
                        )}
                    </div>
                    </div>
                </div>
            )}

            {/* ================= TECHNICAL THEME ================= */}
            {selectedTheme === 'technical' && (
                <div className="p-10 min-h-[297mm] h-full text-slate-800 font-sans">
                    <div className="flex justify-between items-end border-b-4 border-slate-800 pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-black mb-1 uppercase">{personalInfo.fullName}</h1>
                        <h2 className="text-lg font-mono text-slate-600">{personalInfo.title}</h2>
                    </div>
                    <div className="text-right text-xs font-mono text-slate-600 space-y-1">
                        <div>{personalInfo.email}</div>
                        <div>{personalInfo.phone}</div>
                        <div>{personalInfo.website}</div>
                    </div>
                    </div>

                    <div className="space-y-2 mb-8">
                    <h3 className="font-bold uppercase text-sm tracking-wider border-b border-slate-300 pb-1">Skills</h3>
                    <div className="font-mono text-sm leading-6">
                        {skills.join('  //  ')}
                    </div>
                    </div>

                    {experiences.length > 0 && (
                    <div className="space-y-6 mb-8">
                        <h3 className="font-bold uppercase text-sm tracking-wider border-b border-slate-300 pb-1">Professional Experience</h3>
                        {experiences.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-md">{exp.role} <span className="font-normal text-slate-500">@ {exp.company}</span></h4>
                                <span className="font-mono text-xs font-bold">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="text-sm leading-6 text-slate-700 text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                    )}

                    {educations.length > 0 && (
                    <div className="space-y-6 mb-8">
                        <h3 className="font-bold uppercase text-sm tracking-wider border-b border-slate-300 pb-1">Education</h3>
                        {educations.map(edu => (
                            <div key={edu.id} className="flex justify-between">
                                <div>
                                <div className="font-bold text-sm">{edu.university}</div>
                                <div className="text-sm italic">{edu.degree}</div>
                                </div>
                                <div className="font-mono text-xs font-bold">{edu.year}</div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            )}

            {/* Footer Decoration (Common) */}
            <div className="absolute bottom-0 w-full text-center pb-4 opacity-20 pointer-events-none">
                <Hexagon className="w-8 h-8 mx-auto text-slate-400" />
            </div>

            </div>
        </div>
      </div>
      
      {/* Local X Icon */}
      <style>{`
         .dir-ltr { direction: ltr; }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
