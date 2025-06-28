import React from 'react';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRestaurant } from '../context/RestaurantContext';

export default function Footer() {
  const { restaurantInfo } = useRestaurant();
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('restaurantInfo.name')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <a href={`tel:${restaurantInfo.phone}`} className="hover:text-orange-400 transition-colors">
                  {restaurantInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-orange-400" />
                <a 
                  href={`https://wa.me/${restaurantInfo.whatsapp.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-1" />
                <span className="text-sm">{restaurantInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-400" />
              {t('home.openingHours')}
            </h3>
            <div className="space-y-2">
              {restaurantInfo.openingHours.map((schedule, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{schedule.day}</span>
                  <br />
                  <span className="text-gray-400">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <div className="space-y-2">
              <a href="/menu" className="block text-sm hover:text-orange-400 transition-colors">{t('nav.menu')}</a>
              <a href="/about" className="block text-sm hover:text-orange-400 transition-colors">{t('nav.about')}</a>
              <a href="/gallery" className="block text-sm hover:text-orange-400 transition-colors">{t('nav.gallery')}</a>
              <a href="/contact" className="block text-sm hover:text-orange-400 transition-colors">{t('nav.contact')}</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 {t('restaurantInfo.name')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}