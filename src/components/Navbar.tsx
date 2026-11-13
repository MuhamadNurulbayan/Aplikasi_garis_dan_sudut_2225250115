import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId, StudentProfile } from '../types';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  student: StudentProfile;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'dasar', label: 'Dasar & Busur' },
  { id: 'hubungan', label: 'Hubungan Sudut' },
  { id: 'sejajar', label: 'Garis Sejajar' },
  { id: 'latihan', label: 'Latihan' },
];

export default function Navbar({ activeSection, onNavigate, student }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shortName = student.fullName.split(' ')[0];

  const handleSelect = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('beranda')}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
        >
          SudutKita
        </button>

        {/* Zone 2: 5 clean single-line text nav links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi Materi">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-sky-700 border-sky-600 font-semibold'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (Student Rapor & Profil) + Mobile hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('ringkasan')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'ringkasan'
                ? 'bg-slate-900 text-white'
                : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
          >
            Rapor {shortName}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
