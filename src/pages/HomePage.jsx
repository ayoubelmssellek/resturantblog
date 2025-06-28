import React, { useEffect } from 'react';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRestaurant } from '../context/RestaurantContext';

export default function HomePage() {
  const { restaurantInfo, menuItems } = useRestaurant();
  const { t, i18n } = useTranslation();
  const featuredItems = menuItems.slice(0, 3);

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              {t('restaurantInfo.name')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
              {t('home.tagline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t('home.callToOrder')}
              </a>
              <Link
                to="/menu"
                className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center backdrop-blur-sm hover:backdrop-blur-none transform hover:-translate-y-1"
              >
                {t('home.viewMenu')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('home.featuredDishes')}</h2>
            <p className="text-lg md:text-xl text-gray-600">{t('home.tasteSpecialties')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-orange-600 font-bold text-lg">${item.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t('home.viewFullMenu')}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('home.visitToday')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('home.openingHours')}</h3>
                    {restaurantInfo.openingHours.map((schedule, index) => (
                      <div key={index} className="text-gray-600 mb-1">
                        <span className="font-medium">{schedule.day}:</span> {schedule.hours}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('home.location')}</h3>
                    <p className="text-gray-600">{restaurantInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Phone className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('home.contact')}</h3>
                    <a 
                      href={`tel:${restaurantInfo.phone}`}
                      className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      {restaurantInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(restaurantInfo.address)}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}