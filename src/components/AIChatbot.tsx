import React, { useState, useRef, useEffect } from 'react';
import { CondoUnit } from '../types/property';
import { Bot, Send, Sparkles, X, ShieldCheck, MapPin, Building, Bed, ArrowRight, User, RefreshCw } from 'lucide-react';

interface AIChatbotProps {
  properties: CondoUnit[];
  onSelectProperty: (property: CondoUnit) => void;
  onBookProperty: (property: CondoUnit) => void;
}

interface ChatMessage {
  id: string;
  sender: 'AI' | 'USER';
  text: string;
  timestamp: string;
  recommendedUnits?: CondoUnit[];
}

const QUICK_PROMPTS = [
  '🏢 แนะนำคอนโดเช่าใกล้ BTS งบไม่เกิน 30,000 บาท/เดือน',
  '🔒 ระบบพักเงิน Escrow คุ้มครองเงินมัดจำอย่างไร?',
  '📜 ขั้นตอนการทำสัญญาดิจิทัล e-Sign ถูกกฎหมายไหม?',
  '💎 อยากซื้อคอนโดหรู ยูนิต Verified ใกล้รถไฟฟ้า',
];

export const AIChatbot: React.FC<AIChatbotProps> = ({
  properties,
  onSelectProperty,
  onBookProperty,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'AI',
      text: 'สวัสดีครับ! ผมคือ **Smart Condo AI Assistant** ผู้ช่วยอัจฉริยะประจำแพลตฟอร์ม ยินดีช่วยคุณค้นหาคอนโดที่ใช่ ตอบคำถามเรื่องระบบพักเงิน Escrow และสัญญาเช่าดิจิทัลครับ มีอะไรให้ผมช่วยแนะนำไหมครับ?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // AI Logic Engine
  const generateAIResponse = (userText: string) => {
    const query = userText.toLowerCase();
    let replyText = '';
    let matchedUnits: CondoUnit[] | undefined = undefined;

    // 1. Search & Recommend Condos
    if (
      query.includes('แนะนำ') ||
      query.includes('ค้นหา') ||
      query.includes('ห้อง') ||
      query.includes('คอนโด') ||
      query.includes('bts') ||
      query.includes('mrt') ||
      query.includes('เช่า') ||
      query.includes('ซื้อ')
    ) {
      let filtered = properties;

      if (query.includes('เช่า')) {
        filtered = filtered.filter((p) => p.type === 'RENT');
      } else if (query.includes('ซื้อ') || query.includes('ขาย')) {
        filtered = filtered.filter((p) => p.type === 'SALE');
      }

      if (query.includes('30,000') || query.includes('30000') || query.includes('งบ')) {
        filtered = filtered.filter((p) => p.price <= 35000);
      }

      if (query.includes('ทองหล่อ') || query.includes('เอกมัย')) {
        filtered = filtered.filter((p) => p.btsMrtStation.includes('ทองหล่อ') || p.btsMrtStation.includes('เอกมัย'));
      }

      matchedUnits = filtered.slice(0, 3);

      if (matchedUnits.length > 0) {
        replyText = `ผมได้คัดสรรยูนิตคอนโดคุณภาพที่ตรงกับความต้องการของคุณมาให้ ${matchedUnits.length} รายการครับ ทุกห้องผ่านการยืนยันตัวตนเจ้าของห้อง (e-KYC) และคุ้มครองเงินมัดจำด้วยระบบ Escrow ครับ:`;
      } else {
        replyText = `ขณะนี้ผมพบรายการคอนโดในระบบที่น่าสนใจ สามารถเลือกชมรายละเอียด หรือค้นหาตามสถานีรถไฟฟ้า BTS/MRT เพิ่มเติมได้ครับ:`;
        matchedUnits = properties.slice(0, 2);
      }
    }
    // 2. Escrow & Security Explanation
    else if (query.includes('escrow') || query.includes('มัดจำ') || query.includes('โกง') || query.includes('ปลอดภัย')) {
      replyText = `🔒 **ระบบคุ้มครองเงินมัดจำ Smart Escrow ทำงานอย่างไร?**\n\n1. **กักเงินปลอดภัย:** เงินมัดจำของคุณจะถูกเก็บไว้ในบัญชีพักเงินกลางของแพลตฟอร์ม ไม่โอนเข้าบัญชีส่วนตัวของเจ้าของห้องโดยตรง\n2. **ตรวจรับห้องก่อนจ่าย:** เงินค่าเช่าจะถูกโอนให้เจ้าของเมื่อคุณทำรายการตรวจรับห้อง (Move-in Checklist) วันย้ายเข้าสำเร็จ\n3. **คืนเงินมัดจำชัวร์:** คืนเงินประกันครบถ้วนเมื่อครบอายุสัญญาตามกฎหมาย สคบ. ครับ`;
    }
    // 3. e-Contract & Legal Explanation
    else if (query.includes('สัญญา') || query.includes('contract') || query.includes('กฎหมาย') || query.includes('เซ็น')) {
      replyText = `📜 **สัญญาเช่าดิจิทัล (e-Contract) มีผลทางกฎหมายอย่างไร?**\n\n• สัญญาเช่าถูกสร้างตามมาตรฐาน พ.ร.บ. ธุรกรรมทางอิเล็กทรอนิกส์\n• มีการประทับตราดิจิทัล (Digital Signature Certificate) พร้อม Timestamp ห้ามแก้ไขย้อนหลัง\n• เซ็นอนุมัติผ่าน OTP มือถือ ไม่ต้องเดินทางมาพบกัน สัญญามีผลผูกพันทางกฎหมาย 100% ครับ`;
    }
    // 4. General Friendly Helper
    else {
      replyText = `ผมพร้อมช่วยเหลือคุณทุกเรื่องเกี่ยวกับการเช่า/ซื้อคอนโดครับ! คุณสามารถพิมพ์สอบถามเกี่ยวกับ ทำเลรถไฟฟ้า, งบประมาณ, สัญญาเช่า e-Sign หรือระบบพักเงิน Escrow ได้เลยนะครับ 😊`;
    }

    return { replyText, matchedUnits };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const { replyText, matchedUnits } = generateAIResponse(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedUnits: matchedUnits,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-800 hover:from-sky-700 hover:to-indigo-900 text-white rounded-full shadow-2xl shadow-sky-600/40 border border-white/20 transition-all transform hover:scale-105 group"
          title="คุยกับ Smart Condo AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-sky-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-bold tracking-wide">ถาม AI ผู้ช่วยอัจฉริยะ</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </button>
      )}

      {/* AI Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-600/30 border border-sky-400/30 flex items-center justify-center text-sky-300">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold">Smart Condo AI</h3>
                  <span className="text-[9px] bg-emerald-500 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-sky-200/80">ผู้ช่วยค้นหาคอนโด & Escrow Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'AI' && (
                  <div className="w-7 h-7 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[84%] space-y-2">
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'USER'
                        ? 'bg-sky-600 text-white font-medium rounded-tr-none shadow-md'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/90 shadow-sm whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Recommended Units Card Widget inside Chat */}
                  {msg.recommendedUnits && msg.recommendedUnits.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {msg.recommendedUnits.map((unit) => (
                        <div
                          key={unit.id}
                          className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 transition flex items-center gap-3"
                        >
                          <img
                            src={unit.images[0]}
                            alt=""
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-sky-700 block truncate">
                              {unit.projectName}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 mt-0.5">
                              <span>฿{unit.price.toLocaleString()}</span>
                              <span className="text-[10px] text-slate-400 font-normal">
                                {unit.type === 'RENT' ? '/เดือน' : 'บาท'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                              <MapPin className="w-3 h-3 text-sky-500 shrink-0" />
                              <span className="truncate">{unit.btsMrtStation}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              onClick={() => {
                                onSelectProperty(unit);
                                setIsOpen(false);
                              }}
                              className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                            >
                              ดูห้อง
                            </button>
                            <button
                              onClick={() => {
                                onBookProperty(unit);
                                setIsOpen(false);
                              }}
                              className="px-2.5 py-1 text-[10px] font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition"
                            >
                              จองทันที
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className={`text-[10px] text-slate-400 block ${msg.sender === 'USER' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'USER' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-9">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-600" />
                <span>Smart AI กำลังประมวลผลคำตอบ...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-100 rounded-full text-[11px] font-medium whitespace-nowrap shrink-0 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="พิมพ์คำถามหรือค้นหาคอนโดที่นี่..."
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl shadow-md transition disabled:bg-slate-200 disabled:shadow-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
