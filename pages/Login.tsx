
import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, Smartphone, Key, Fingerprint, User } from 'lucide-react';

interface LoginProps {
  onLogin: (studentId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      if (!studentId || !nationalCode) return;
      setIsLoading(true);
      // Simulate API verification and SMS sending
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 1500);
    } else {
      if (!code) return;
      setIsLoading(true);
      setTimeout(() => {
        onLogin(studentId);
      }, 1000);
    }
  };

  const handleGuestLogin = () => {
      // Simulate Guest Login ID
      onLogin('GUEST'); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
        {/* Abstract background decos */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>

        <div className="relative text-center">
          <div className="inline-flex p-5 bg-emerald-600 rounded-3xl text-white mb-8 shadow-xl shadow-emerald-200">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">UniPlus</h1>
          <p className="text-slate-500 mb-10">ورود امن به سوپر اپلیکیشن دانشگاه</p>

          <div className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-right">
                  <label className="text-sm font-bold text-slate-600 mr-2 mb-2 block">شماره دانشجویی</label>
                  <div className="relative">
                    <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input 
                      type="text" 
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="۹۸۱۲۳۴۵۶"
                      className="w-full pr-12 pl-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-center font-mono tracking-widest text-lg text-slate-900"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <label className="text-sm font-bold text-slate-600 mr-2 mb-2 block">کد ملی</label>
                  <div className="relative">
                    <Fingerprint className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input 
                      type="text" 
                      value={nationalCode}
                      onChange={(e) => setNationalCode(e.target.value)}
                      placeholder="۰۰۲۱۲۳۴۵۶۷"
                      className="w-full pr-12 pl-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-center font-mono tracking-widest text-lg text-slate-900"
                    />
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  برای احراز هویت (سطح ۲)، کد تایید به شماره موبایل ثبت شده در سامانه گلستان پیامک خواهد شد.
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="p-4 bg-emerald-50 rounded-2xl mb-4 border border-emerald-100">
                  <p className="text-sm text-emerald-800 font-bold mb-1">کد تایید ارسال شد</p>
                  <p className="text-xs text-emerald-600">پیامک حاوی کد ۵ رقمی به شماره <span dir="ltr">0912***4567</span> ارسال شد.</p>
                </div>

                <div className="text-right">
                  <label className="text-sm font-bold text-slate-600 mr-2 mb-2 block">کد تایید ۵ رقمی</label>
                  <div className="relative">
                    <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input 
                      type="text" 
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="• • • • •"
                      className="w-full pr-12 pl-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-center font-mono text-2xl tracking-[1em] text-slate-900"
                    />
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="text-xs text-emerald-600 hover:underline">ویرایش اطلاعات</button>
              </div>
            )}

            <button 
              onClick={handleNext}
              disabled={isLoading || (step === 1 && (!studentId || !nationalCode)) || (step === 2 && !code)}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{step === 1 ? 'دریافت کد تایید' : 'ورود به سامانه'}</span>
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </button>

            {step === 1 && (
                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-2 text-slate-400">یا</span>
                    </div>
                </div>
            )}

            {step === 1 && (
                <button 
                    onClick={handleGuestLogin}
                    className="w-full py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold border border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                    <User className="w-4 h-4" />
                    <span>ورود به عنوان مهمان (سطح ۱)</span>
                </button>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between text-xs text-slate-400">
            <span>نسخه ۲.۵.۰</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-600">شرایط و قوانین</a>
              <a href="#" className="hover:text-emerald-600">پشتیبانی</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
