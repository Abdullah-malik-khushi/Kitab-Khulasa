import Link from 'next/link';

export function Header() {
    return (
        <nav className="flex items-center justify-between pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-stone-200">
            <Link href="/" className="no-underline hover:opacity-80 transition">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-800 tracking-tight">
                    Kitab Khulasa
                </span>
                <span className="block text-sm text-stone-500 font-normal" dir="rtl">
                    کتاب خلاصہ
                </span>
            </Link>
        </nav>
    );
}
