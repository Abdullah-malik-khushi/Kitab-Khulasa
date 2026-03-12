

```jsx
"use client";
import { useState } from "react";

const initialBooks = [
  {
    id: 1,
    title: "رچ ڈیڈ پور ڈیڈ",
    titleEn: "Rich Dad Poor Dad",
    author: "رابرٹ کیوساکی",
    year: "1997",
    readTime: "15 منٹ",
    rating: 4.8,
    icon: "💰",
    tagline: "امیر لوگ پیسے کے لیے کام نہیں کرتے — پیسہ ان کے لیے کام کرتا ہے",
    overview: "رابرٹ کیوساکی نے یہ کتاب اپنے دو باپوں کے تجربے پر لکھی ہے۔ ایک غریب باپ جو اعلیٰ تعلیم یافتہ تھے اور ایک امیر باپ جو کم پڑھے لیکن بے حد امیر تھے۔ یہ کتاب مالی آزادی کا راستہ دکھاتی ہے۔",
    blinks: [
      { id: 1, icon: "🏫", title: "اسکول پیسہ کمانا نہیں سکھاتا", content: "اسکول میں ہمیں نوکری کرنا سکھایا جاتا ہے، لیکن پیسے کو کیسے کام میں لایا جائے یہ کبھی نہیں سکھایا جاتا۔" },
      { id: 2, icon: "🧠", title: "مالی ذہانت سب سے بڑی دولت ہے", content: "امیر لوگ پیسے کے لیے کام نہیں کرتے، وہ پیسے کو اپنے لیے کام پر لگاتے ہیں۔ Asset اور Liability کا فرق جاننا ضروری ہے۔" },
      { id: 3, icon: "🏠", title: "Asset اور Liability کا فرق", content: "Asset وہ چیز ہے جو آپ کی جیب میں پیسہ ڈالے۔ Liability وہ چیز ہے جو آپ کی جیب سے پیسہ نکالے۔" },
      { id: 4, icon: "💼", title: "اپنا کاروبار بنائیں", content: "نوکری کریں لیکن صرف نوکری پر انحصار نہ کریں۔ اپنا چھوٹا کاروبار شروع کریں۔" },
      { id: 5, icon: "🚀", title: "Rat Race سے نکلیں", content: "خوف اور لالچ سے نکلیں۔ مالی تعلیم حاصل کریں اور آزادی کی طرف بڑھیں۔" },
    ],
    keyLessons: ["پیسے کے لیے کام مت کرو", "Asset خریدو، Liability سے بچو", "مالی تعلیم سب سے بڑی دولت ہے"],
    quote: "غریب اور متوسط طبقہ پیسے کے لیے کام کرتا ہے، امیر لوگوں کے لیے پیسہ کام کرتا ہے۔",
  },
];

async function generateBookSummary(bookName, authorName) {
  const prompt = `آپ ایک ماہر کتاب خلاصہ نویس ہیں۔ نیچے دی گئی کتاب کا مکمل خلاصہ اردو زبان میں JSON format میں دیں۔\n\nکتاب: "${bookName}"\nمصنف: "${authorName}"\n\nصرف یہ JSON واپس کریں:\n{"titleUrdu":"اردو نام","authorUrdu":"مصنف اردو میں","year":"سال","readTime":"X منٹ","rating":4.5,"icon":"emoji","tagline":"مرکزی خیال","overview":"3-4 جملے","blinks":[{"id":1,"icon":"emoji","title":"عنوان","content":"تفصیل"}],"keyLessons":["سبق1","سبق2","سبق3"],"quote":"اقتباس"}`;
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const text = data.content.map((i) => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [view, setView] = useState("library");
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeBlink, setActiveBlink] = useState(null);
  const [completed, setCompleted] = useState({});
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleComplete = (bookId, blinkId) => {
    setCompleted((prev) => { const k = `${bookId}-${blinkId}`; return { ...prev, [k]: !prev[k] }; });
  };
  const getProgress = (book) => {
    const done = book.blinks.filter((b) => completed[`${book.id}-${b.id}`]).length;
    return Math.round((done / book.blinks.length) * 100);
  };
  const handleAddBook = async () => {
    if (!bookName.trim() || !authorName.trim()) { setError("براہ کرم کتاب اور مصنف کا نام لکھیں"); return; }
    setError(""); setLoading(true);
    try {
      const data = await generateBookSummary(bookName, authorName);
      const newBook = { id: Date.now(), title: data.titleUrdu, titleEn: bookName, author: data.authorUrdu, year: data.year, readTime: data.readTime, rating: data.rating, icon: data.icon || "📘", tagline: data.tagline, overview: data.overview, blinks: data.blinks, keyLessons: data.keyLessons, quote: data.quote };
      setBooks((prev) => [newBook, ...prev]);
      setBookName(""); setAuthorName("");
      setSelectedBook(newBook); setView("book");
    } catch { setError("خرابی آ گئی، دوبارہ کوشش کریں"); }
    setLoading(false);
  };

  const s = {
    page: { minHeight:"100vh", background:"#080805", fontFamily:"Georgia,serif", color:"#f0e6d3", direction:"rtl" },
    nav: { background:"linear-gradient(180deg,#120e00,#080805)", borderBottom:"1px solid #2a1f00", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 },
    wrap: { maxWidth:700, margin:"0 auto", padding:"28px 18px" },
    card: { background:"linear-gradient(135deg,#151005,#0d0900)", border:"1px solid #2e2008", borderRadius:18, padding:22, cursor:"pointer", marginBottom:16, transition:"all 0.3s" },
    blink: { background:"linear-gradient(135deg,#131005,#0d0800)", border:"1px solid #2e2008", borderRadius:14, padding:20, cursor:"pointer", marginBottom:12 },
    input: { width:"100%", background:"#111008", border:"1px solid #2e2008", borderRadius:12, padding:"14px 16px", color:"#f0e6d3", fontSize:15, fontFamily:"Georgia,serif", outline:"none", direction:"rtl", marginBottom:20 },
    btnGold: { background:"linear-gradient(135deg,#c9920a,#a07008)", color:"#000", border:"none", borderRadius:12, padding:"14px 28px", fontSize:16, fontFamily:"Georgia,serif", cursor:"pointer", fontWeight:"bold", width:"100%" },
    navBtn: { background:"rgba(201,146,10,0.08)", border:"1px solid #2e2008", color:"#c9920a", borderRadius:10, padding:"8px 16px", cursor:"pointer", fontFamily:"Georgia,serif", fontSize:14 },
    gold: { color:"#f0a500" },
    dim: { color:"#7a6a4a" },
  };

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .hov:hover { border-color:#c9920a !important; transform:translateY(-3px); box-shadow:0 8px 30px rgba(201,146,10,0.12); }
        .bhov:hover { border-color:#c9920a !important; transform:translateX(-3px); }
        .nbhov:hover { background:rgba(201,146,10,0.15) !important; border-color:#c9920a !important; }
        .prog { height:5px; background:#1a1408; border-radius:3px; overflow:hidden; }
        .progf { height:100%; background:linear-gradient(90deg,#c9920a,#f0c040); border-radius:3px; transition:width 0.5s; }
        .cbtn { background:none; border:1.5px solid #3d2e0a; border-radius:50%; width:26px; height:26px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; flex-shrink:0; color:transparent; }
        .cbtn.done { background:#c9920a; border-color:#c9920a; color:#000; }
        @keyframes fi { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fi { animation:fi 0.4s ease forwards; }
        @keyframes sp { to{transform:rotate(360deg)} }
        .sp { animation:sp 1s linear infinite; display:inline-block; }
      `}</style>

      {/* NAV */}
      <div style={s.nav}>
        <div onClick={() => setView("library")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:24 }}>📚</span>
          <span style={{ fontFamily:"'Amiri',serif", fontSize:20, color:"#f0a500" }}>کتاب خلاصہ</span>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button style={s.navBtn} className="nbhov" onClick={() => setView("library")}>🏠 لائبریری</button>
          <button style={s.navBtn} className="nbhov" onClick={() => setView("add")}>➕ نئی کتاب</button>
        </div>
      </div>

      <div style={s.wrap}>

        {/* LIBRARY */}
        {view === "library" && (
          <div className="fi">
            <h1 style={{ fontFamily:"'Amiri',serif", fontSize:28, color:"#f0a500", marginBottom:6 }}>آپ کی لائبریری</h1>
            <p style={{ color:"#7a6a4a", fontSize:14, marginBottom:24 }}>{books.length} کتابیں موجود ہیں</p>
            {books.map((book) => (
              <div key={book.id} style={s.card} className="hov" onClick={() => { setSelectedBook(book); setActiveBlink(null); setView("book"); }}>
                <div style={{ display:"flex", gap:18, alignItems:"flex-start" }}>
                  <div style={{ width:64, height:80, borderRadius:10, background:"linear-gradient(135deg,#c9920a,#7a5500)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0, boxShadow:"4px 4px 14px rgba(0,0,0,0.4)" }}>{book.icon}</div>
                  <div style={{ flex:1 }}>
                    <h3 style={{ fontFamily:"'Amiri',serif", fontSize:19, color:"#f0a500", marginBottom:4 }}>{book.title}</h3>
                    <div style={{ color:"#7a6a4a", fontSize:13, marginBottom:10 }}>{book.author} • ⏱ {book.readTime} • ⭐ {book.rating}</div>
                    <p style={{ fontSize:13, color:"#a09070", lineHeight:1.7, fontFamily:"'Amiri',serif" }}>{book.tagline}</p>
                    <div style={{ marginTop:12 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ color:"#7a6a4a", fontSize:11 }}>پیشرفت</span>
                        <span style={{ color:"#f0a500", fontSize:11 }}>{getProgress(book)}%</span>
                      </div>
                      <div className="prog"><div className="progf" style={{ width:`${getProgress(book)}%` }} /></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div onClick={() => setView("add")} style={{ border:"2px dashed #2e2008", borderRadius:18, padding:28, textAlign:"center", cursor:"pointer" }} className="hov">
              <div style={{ fontSize:32, marginBottom:8 }}>➕</div>
              <div style={{ fontFamily:"'Amiri',serif", fontSize:17, color:"#f0a500" }}>نئی کتاب شامل کریں</div>
              <div style={{ color:"#7a6a4a", fontSize:13, marginTop:4 }}>AI خود اردو خلاصہ بنائے گا</div>
            </div>
          </div>
        )}

        {/* ADD */}
        {view === "add" && (
          <div className="fi">
            <button style={s.navBtn} className="nbhov" onClick={() => setView("library")} style={{ marginBottom:16, ...s.navBtn }}>← واپس</button>
            <h1 style={{ fontFamily:"'Amiri',serif", fontSize:26, color:"#f0a500", marginBottom:6, marginTop:16 }}>نئی کتاب شامل کریں</h1>
            <p style={{ color:"#7a6a4a", fontSize:14, marginBottom:24 }}>AI خود اردو خلاصہ بنائے گا</p>
            <div style={{ background:"#111008", border:"1px solid #2e2008", borderRadius:20, padding:32 }}>
              <label style={{ display:"block", fontFamily:"'Amiri',serif", fontSize:16, color:"#f0a500", marginBottom:8 }}>📖 کتاب کا نام</label>
              <input style={s.input} placeholder="مثال: Atomic Habits" value={bookName} onChange={(e) => setBookName(e.target.value)} />
              <label style={{ display:"block", fontFamily:"'Amiri',serif", fontSize:16, color:"#f0a500", marginBottom:8 }}>✍️ مصنف کا نام</label>
              <input style={s.input} placeholder="مثال: James Clear" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
              {error && <div style={{ background:"rgba(200,50,50,0.1)", border:"1px solid rgba(200,50,50,0.3)", borderRadius:10, padding:"12px 16px", marginBottom:16, color:"#e08080", fontFamily:"'Amiri',serif", fontSize:14 }}>{error}</div>}
              <button style={s.btnGold} onClick={handleAddBook} disabled={loading}>
                {loading ? <span><span className="sp">⚙️</span> AI خلاصہ بنا رہا ہے...</span> : "🤖 AI سے خلاصہ بنوائیں"}
              </button>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginTop:20 }}>
              {[["Atomic Habits","James Clear"],["The Alchemist","Paulo Coelho"],["Think and Grow Rich","Napoleon Hill"]].map(([b,a]) => (
                <button key={b} onClick={() => { setBookName(b); setAuthorName(a); }} style={{ background:"rgba(201,146,10,0.07)", border:"1px solid #2e2008", borderRadius:20, padding:"6px 14px", color:"#c9920a", cursor:"pointer", fontFamily:"'Amiri',serif", fontSize:13 }}>{b}</button>
              ))}
            </div>
          </div>
        )}

        {/* BOOK */}
        {view === "book" && selectedBook && (
          <div className="fi">
            <button style={{ ...s.navBtn, marginBottom:20 }} className="nbhov" onClick={() => setView("library")}>← لائبریری</button>
            <div style={{ background:"linear-gradient(135deg,#1a1200,#0d0900)", border:"1px solid #3d2e0a", borderRadius:22, padding:"32px 28px", marginBottom:24 }}>
              <div style={{ display:"flex", gap:22, alignItems:"flex-start" }}>
                <div style={{ width:80, height:105, borderRadius:10, background:"linear-gradient(135deg,#c9920a,#7a5500)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, flexShrink:0 }}>{selectedBook.icon}</div>
                <div style={{ flex:1 }}>
                  <h1 style={{ fontFamily:"'Amiri',serif", fontSize:24, color:"#f0a500", lineHeight:1.5 }}>{selectedBook.title}</h1>
                  <div style={{ color:"#7a6a4a", fontSize:13, margin:"6px 0 12px" }}>{selectedBook.author} • {selectedBook.year}</div>
                  <div style={{ background:"rgba(201,146,10,0.08)", border:"1px solid rgba(201,146,10,0.2)", borderRadius:10, padding:"10px 14px", fontFamily:"'Amiri',serif", fontSize:14, color:"#d4b87a", lineHeight:1.8 }}>"{selectedBook.tagline}"</div>
                </div>
              </div>
            </div>
            <div style={{ background:"#0f0c05", border:"1px solid #2a1f00", borderRadius:16, padding:22, marginBottom:22 }}>
              <h2 style={{ fontFamily:"'Amiri',serif", fontSize:18, color:"#f0a500", marginBottom:10 }}>📋 مختصر جائزہ</h2>
              <p style={{ lineHeight:2, fontSize:14, color:"#b8a070", fontFamily:"'Amiri',serif" }}>{selectedBook.overview}</p>
            </div>
            <h2 style={{ fontFamily:"'Amiri',serif", fontSize:20, color:"#f0a500", marginBottom:16 }}>✨ اہم اسباق</h2>
            {selectedBook.blinks.map((blink) => (
              <div key={blink.id} style={s.blink} className="bhov" onClick={() => setActiveBlink(activeBlink === blink.id ? null : blink.id)}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:10, background:"rgba(201,146,10,0.1)", border:"1px solid rgba(201,146,10,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{blink.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <h3 style={{ fontFamily:"'Amiri',serif", fontSize:16, color:"#e8d5a0" }}>{blink.title}</h3>
                      <button className={`cbtn${completed[`${selectedBook.id}-${blink.id}`] ? " done" : ""}`} onClick={(e) => { e.stopPropagation(); toggleComplete(selectedBook.id, blink.id); }}>✓</button>
                    </div>
                    {activeBlink === blink.id && <p style={{ marginTop:10, lineHeight:2, fontSize:14, color:"#a89060", fontFamily:"'Amiri',serif", borderTop:"1px solid #2a1f00", paddingTop:10 }} className="fi">{blink.content}</p>}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ background:"linear-gradient(135deg,#1a1200,#0d0900)", border:"2px solid #c9920a", borderRadius:18, padding:28, marginTop:24, marginBottom:24, textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>💬</div>
              <blockquote style={{ fontFamily:"'Amiri',serif", fontSize:18, lineHeight:2, color:"#f0c040", fontStyle:"italic" }}>"{selectedBook.quote}"</blockquote>
              <div style={{ color:"#7a6a4a", marginTop:10, fontSize:13 }}>— {selectedBook.author}</div>
            </div>
            <div style={{ background:"#0f0c05", border:"1px solid #2a1f00", borderRadius:16, padding:22, marginBottom:32 }}>
              <h2 style={{ fontFamily:"'Amiri',serif", fontSize:18, color:"#f0a500", marginBottom:14 }}>🎯 یاد رکھنے والی باتیں</h2>
              {selectedBook.keyLessons.map((lesson, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom: i < selectedBook.keyLessons.length-1 ? "1px solid #1a1200" : "none" }}>
                  <span style={{ color:"#c9920a", fontSize:16, flexShrink:0 }}>◆</span>
                  <span style={{ fontFamily:"'Amiri',serif", fontSize:14, color:"#c4b090", lineHeight:1.7 }}>{lesson}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```
