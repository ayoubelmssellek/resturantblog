import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRestaurant } from '../context/RestaurantContext';

export default function MenuPage() {
  const { menuItems, restaurantInfo } = useRestaurant();
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const categories = [t('menu.all'), ...Array.from(new Set(menuItems.map(item => item.category)))];
  const filteredItems = selectedCategory === t('menu.all')
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('menu.title')}</h1>
          <p className="text-lg md:text-xl text-gray-600">{t('menu.subtitle')}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-orange-100 hover:text-orange-600 shadow-md hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                  <span className="text-orange-600 font-bold text-lg">${item.price}</span>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-3">{item.description}</p>
                <div className="flex justify-center">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No items found in this category.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16 bg-white rounded-2xl p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('menu.readyToOrder')}</h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">{t('menu.callToPlace')}</p>
          <a
            href={`tel:${restaurantInfo.phone}`}
            className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('menu.callNowToOrder')}
          </a>
        </div>
      </div>
    </div>
  );
}