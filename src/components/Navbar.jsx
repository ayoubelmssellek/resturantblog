import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRestaurant } from '../context/RestaurantContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const location = useLocation();
  const { restaurantInfo } = useRestaurant();
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.menu'), href: '/menu' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-orange-600 rounded-xl group-hover:bg-orange-700 transition-colors">
                <Utensils className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900 hidden sm:block">
                {t('restaurantInfo.name')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-orange-600 bg-orange-50 shadow-sm'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher />
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-2.5 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ml-4"
            >
              {t('nav.callNow')}
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-200 text-sm shadow-lg"
            >
              📞 {t('nav.callNow').replace('📞 ', '')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}