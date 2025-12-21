
import React, { useState } from 'react';
import { Compass, MapPin, Book, HelpCircle, ChevronDown, CheckSquare } from 'lucide-react';

const FreshmenGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    { title: 'ثبت‌نام اینترنتی', desc: 'آپلود مدارک در سامانه گلستان', done: true },
    { title: 'دریافت شماره دانشجویی', desc: 'ارسال شده با پیامک', done: true },
    { title: 'انتخاب واحد', desc: 'شنبه آینده ساعت ۱۰ صبح', done: false },
    { title: 'دریافت کارت تغذیه', desc: 'مراجعه به امور دانشجویی', done: false },
  ];

  const faqs = [
    { q: 'چطور وارد سامانه گلستان بشم؟', a: 'نام کاربری شماره دانشجویی و رمز عبور کد ملی شماست.' },
    { q: 'حذف اضطراری چیه؟', a: 'اگر فکر می‌کنید درسی را می‌افتید، تا دو هفته قبل از امتحانات می‌توانید یک درس (تئوری) را حذف کنید بدون اینکه در معدل تاثیر بگذارد.' },
    { q: 'سلف دانشگاه کجاست؟', a: 'ضلع جنوبی دانشگاه، کنار مسجد. برای ناهار باید از ۴۸ ساعت قبل رزرو کنید.' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 text-center py-6">
          <div className="inline-flex p-4 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <Compass className="w-8 h-8 text-emerald-100" />
          </div>
          <h1 className="text-3xl font-black mb-4">ترم اولی عزیز، خوش اومدی! 👋</h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto">
            گیج شدی؟ نگران نباش. اینجا همه چی رو برات مرحله به مرحله توضیح دادیم تا مثل یه سال‌بالایی حرفه‌ای شروع کنی.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checklist */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-500" />
            چک‌لیست شروع
          </h3>
          <div className="space-y-6 relative before:absolute before:right-[1.15rem] before:top-2 before:h-full before:w-0.5 before:bg-slate-100">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-4">
                <div className={`z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${step.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {step.done ? <CheckSquare className="w-5 h-5" /> : <span className="text-sm font-bold">{i+1}</span>}
                </div>
                <div className="pt-2">
                  <h4 className={`font-bold ${step.done ? 'text-emerald-700 line-through decoration-emerald-500/50' : 'text-slate-800'}`}>{step.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-colors text-right group">
              <MapPin className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-blue-900">نقشه دانشگاه</h4>
              <p className="text-xs text-blue-600 mt-1">پیدا کردن ساختمان کلاس‌ها</p>
            </button>
            <button className="p-6 bg-purple-50 rounded-2xl border border-purple-100 hover:bg-purple-100 transition-colors text-right group">
              <Book className="w-8 h-8 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-purple-900">دیکشنری اصطلاحات</h4>
              <p className="text-xs text-purple-600 mt-1">معنی «پاس» و «پیش‌نیاز»</p>
            </button>
          </div>

          {/* FAQ */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              سوالات پرتکرار
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-right"
                  >
                    <span className="font-bold text-slate-700 text-sm">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="p-4 bg-white text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshmenGuide;
