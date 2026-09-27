import Navbar from "../Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
            <Navbar />
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </main>
            <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white/50 backdrop-blur-xs">
                <p>TaskFlow &copy; {new Date().getFullYear()} — Built for efficiency and clarity</p>
            </footer>
        </div>
    );
};

export default RootLayout;

