import React, { useEffect } from 'react';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRestaurant } from '../context/RestaurantContext';

export default function ContactPage() {
  const { restaurantInfo } = useRestaurant();
  const { t, i18n } = useTranslation();

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('contact.title')}</h1>
          <p className="text-lg md:text-xl text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">{t('contact.getInTouch')}</h2>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-4 p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('contact.phone')}</h3>
                  <a 
                    href={`tel:${restaurantInfo.phone}`} 
                    className="text-gray-600 hover:text-orange-600 text-lg transition-colors"
                  >
                    {restaurantInfo.phone}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">{t('contact.clickToCall')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-green-100 p-3 rounded-xl">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('contact.whatsapp')}</h3>
                  <a 
                    href={`https://wa.me/${restaurantInfo.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-600 text-lg transition-colors"
                  >
                    {restaurantInfo.whatsapp}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">{t('contact.messageWhatsApp')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('contact.address')}</h3>
                  <p className="text-gray-600">{restaurantInfo.address}</p>
                  <p className="text-sm text-gray-500 mt-1">{t('contact.downtown')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('contact.openingHours')}</h3>
                  {restaurantInfo.openingHours.map((schedule, index) => (
                    <div key={index} className="text-gray-600 mb-1 text-sm md:text-base">
                      <span className="font-medium">{schedule.day}:</span> {schedule.hours}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-4 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t('contact.callNowToOrder')}
              </a>
              
              <a
                href={`https://wa.me/${restaurantInfo.whatsapp.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {t('contact.messageOnWhatsApp')}
              </a>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">{t('contact.findUs')}</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-64 md:h-96">
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
              <div className="p-4 md:p-6">
                <h3 className="font-semibold text-lg mb-2">{t('contact.directions')}</h3>
                <p className="text-gray-600 mb-4">{restaurantInfo.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(restaurantInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                >
                  {t('contact.getDirections')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 md:mt-16 bg-white rounded-2xl p-6 md:p-8 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">{t('contact.specialEvent')}</h2>
          <p className="text-gray-600 text-center mb-6 text-sm md:text-base">
            {t('contact.catering')}
          </p>
          <div className="text-center">
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t('contact.callToDiscuss')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}