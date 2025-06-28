import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, Image, Phone, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BottomNavigation() {
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.menu'), href: '/menu', icon: UtensilsCrossed },
    { name: t('nav.gallery'), href: '/gallery', icon: Image },
    { name: t('nav.contact'), href: '/contact', icon: Phone },
    { name: t('nav.about'), href: '/about', icon: Info },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-50 md:hidden">
      <div className="flex justify-around items-center py-1 px-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all duration-300 min-w-0 flex-1 ${
                isActive(item.href)
                  ? 'text-orange-600 bg-orange-50 shadow-sm transform scale-105'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50 active:scale-95'
              }`}
            >
              <Icon 
                className={`h-5 w-5 mb-1 transition-colors duration-200 ${
                  isActive(item.href) ? 'text-orange-600' : 'text-gray-600'
                }`} 
              />
              <span 
                className={`text-xs font-medium transition-colors duration-200 truncate ${
                  isActive(item.href) ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}