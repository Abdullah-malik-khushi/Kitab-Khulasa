import Link from 'next/link';

const bookSummaries = [
    {
        title: 'Alchemist',
        urduTitle: 'الکیمسٹ',
        author: 'Paulo Coelho',
        urduAuthor: 'پاؤلو کوئیلو',
        summary: 'ایک نوجوان چرواہے کی کہانی جو اپنے خوابوں کی تعبیر کے لیے مصر کے صحرا تک سفر کرتا ہے۔ یہ کتاب ہمیں سکھاتی ہے کہ جب آپ کسی چیز کو دل سے چاہیں تو پوری کائنات آپ کی مدد کرتی ہے۔',
        category: 'فکشن'
    },
    {
        title: 'Atomic Habits',
        urduTitle: 'ایٹامک ہیبٹس',
        author: 'James Clear',
        urduAuthor: 'جیمز کلیئر',
        summary: 'چھوٹی چھوٹی عادات بڑی تبدیلیاں لاتی ہیں۔ یہ کتاب بتاتی ہے کہ کیسے روزمرہ کی معمولی عادات آپ کی زندگی بدل سکتی ہیں۔ ہر دن ایک فیصد بہتری بڑے نتائج دیتی ہے۔',
        category: 'خود سازی'
    },
    {
        title: 'Sapiens',
        urduTitle: 'سیپینز',
        author: 'Yuval Noah Harari',
        urduAuthor: 'یووال نوح ہراری',
        summary: 'انسانی تاریخ کا ایک مختصر بیان — کیسے ہم شکاری قبائل سے ترقی کر کے آج کی جدید تہذیب تک پہنچے۔ یہ کتاب سوچنے پر مجبور کرتی ہے کہ ہم واقعی کیا ہیں۔',
        category: 'تاریخ'
    },
    {
        title: 'Rich Dad Poor Dad',
        urduTitle: 'امیر باپ غریب باپ',
        author: 'Robert Kiyosaki',
        urduAuthor: 'رابرٹ کیوساکی',
        summary: 'مالی آزادی کے بارے میں ایک اہم کتاب۔ دو باپوں کی سوچ کا فرق — ایک پیسے کے لیے کام کرتا ہے، دوسرا پیسے سے کام لیتا ہے۔ مالیات کی بنیادی سمجھ کے لیے ضروری کتاب۔',
        category: 'مالیات'
    },
    {
        title: 'Ikigai',
        urduTitle: 'اکیگائی',
        author: 'Héctor García & Francesc Miralles',
        urduAuthor: 'ہیکٹر گارسیا اور فرانسیسک میرالیس',
        summary: 'جاپانی فلسفے کے مطابق لمبی اور خوشحال زندگی کا راز۔ اپنی زندگی کا مقصد تلاش کرنے کا طریقہ — وہ چیز جو آپ کو صبح اٹھنے کی وجہ دے۔',
        category: 'فلسفہ'
    },
    {
        title: 'The 48 Laws of Power',
        urduTitle: 'طاقت کے 48 قوانین',
        author: 'Robert Greene',
        urduAuthor: 'رابرٹ گرین',
        summary: 'تاریخ کے عظیم رہنماؤں سے سیکھے گئے طاقت کے اصول۔ یہ کتاب سکھاتی ہے کہ دنیا میں اثر و رسوخ کیسے حاصل کیا جائے اور اپنی پوزیشن کیسے مضبوط کی جائے۔',
        category: 'خود سازی'
    },
    {
        title: 'Tao Te Ching',
        urduTitle: 'تاؤ تے چنگ',
        author: 'Lao Tzu',
        urduAuthor: 'لاؤ زو',
        summary: 'قدیم چینی فلسفے کی اہم ترین کتاب۔ زندگی میں سادگی، عاجزی اور فطرت کے ساتھ ہم آہنگی کی تعلیم دیتی ہے۔ کم بولنا، زیادہ سننا اور بہاؤ کے ساتھ چلنا۔',
        category: 'فلسفہ'
    },
    {
        title: 'Deep Work',
        urduTitle: 'ڈیپ ورک',
        author: 'Cal Newport',
        urduAuthor: 'کیل نیوپورٹ',
        summary: 'آج کے دور میں گہری توجہ سب سے قیمتی مہارت ہے۔ یہ کتاب سکھاتی ہے کہ بغیر کسی خلل کے کام کرنے کی صلاحیت کیسے پیدا کی جائے اور زیادہ نتائج کیسے حاصل کیے جائیں۔',
        category: 'پیداواریت'
    },
    {
        title: 'Man\'s Search for Meaning',
        urduTitle: 'زندگی کے معنی کی تلاش',
        author: 'Viktor Frankl',
        urduAuthor: 'وکٹر فرینکل',
        summary: 'نازی حراستی کیمپ میں قید ایک ماہر نفسیات کی کہانی۔ مصنف نے ثابت کیا کہ زندگی میں مقصد تلاش کرنا ہی سب سے بڑی طاقت ہے — حالات کتنے بھی مشکل ہوں۔',
        category: 'نفسیات'
    },
    {
        title: 'Thinking, Fast and Slow',
        urduTitle: 'تیز اور سست سوچ',
        author: 'Daniel Kahneman',
        urduAuthor: 'ڈینیئل کانیمن',
        summary: 'ہمارا دماغ دو طریقوں سے سوچتا ہے — ایک تیز اور بے ساختہ، دوسرا سست اور منطقی۔ یہ کتاب بتاتی ہے کہ ہم فیصلے کیسے کرتے ہیں اور کیوں اکثر غلط فیصلے کرتے ہیں۔',
        category: 'نفسیات'
    }
];

const categories = [...new Set(bookSummaries.map(book => book.category))];

export default function Page() {
    return (
        <div className="flex flex-col gap-12 py-4">
            <section className="text-center">
                <h1 className="mb-4 text-emerald-800">Kitab Khulasa</h1>
                <p className="text-2xl text-stone-600 mb-2 font-semibold" dir="rtl">
                    کتاب خلاصہ — مشہور کتابوں کے مختصر خلاصے
                </p>
                <p className="text-stone-500 max-w-2xl mx-auto" dir="rtl">
                    دنیا کی مشہور و معروف کتابوں کے خلاصے سادہ اردو میں پڑھیں۔ ہر کتاب کا خلاصہ مختصر اور آسان الفاظ میں۔
                </p>
            </section>

            <section>
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {categories.map((cat) => (
                        <span key={cat} className="px-3 py-1 text-sm rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {cat}
                        </span>
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-6">
                {bookSummaries.map((book, index) => (
                    <article key={index} className="bg-white rounded-lg border border-stone-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                            <div>
                                <h2 className="text-lg font-bold text-emerald-800 sm:text-xl">{book.title}</h2>
                                <p className="text-stone-500 text-sm">{book.author}</p>
                            </div>
                            <div className="text-right" dir="rtl">
                                <h3 className="text-lg font-bold text-stone-700">{book.urduTitle}</h3>
                                <p className="text-stone-500 text-sm">{book.urduAuthor}</p>
                            </div>
                        </div>
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-stone-100 text-stone-600 mb-3">
                            {book.category}
                        </span>
                        <p className="text-stone-600 leading-relaxed" dir="rtl">
                            {book.summary}
                        </p>
                    </article>
                ))}
            </section>
        </div>
    );
}
