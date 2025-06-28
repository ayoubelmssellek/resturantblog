import React, { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRestaurant } from '../context/RestaurantContext';

export default function GalleryPage() {
  const { galleryImages, restaurantInfo } = useRestaurant();
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('gallery.title')}</h1>
          <p className="text-lg md:text-xl text-gray-600">{t('gallery.subtitle')}</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  onClick={() => setSelectedImage(image.url)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Gallery image"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:bg-black/70"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16 bg-white rounded-2xl p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('gallery.experienceYourself')}</h2>
          <p className="text-gray-600 mb-6">{t('gallery.callToTaste')}</p>
          <a
            href={`tel:${restaurantInfo.phone}`}
            className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('gallery.callNowToOrder')}
          </a>
        </div>
      </div>
    </div>
  );
}