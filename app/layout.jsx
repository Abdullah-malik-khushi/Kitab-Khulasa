import '../styles/globals.css';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export const metadata = {
    title: {
        template: '%s | Kitab Khulasa',
        default: 'Kitab Khulasa - کتاب خلاصہ'
    },
    description: 'مشہور کتابوں کے خلاصے اردو میں - Famous book summaries in Urdu'
};

export default function RootLayout({ children }) {
    return (
        <html lang="ur" dir="ltr">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased text-neutral-800 bg-stone-50">
                <div className="flex flex-col min-h-screen px-6 sm:px-12">
                    <div className="flex flex-col w-full max-w-4xl mx-auto grow">
                        <Header />
                        <main className="grow">{children}</main>
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}
