import React, { useEffect } from 'react';
import { Award, Users, Heart, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRestaurant } from '../context/RestaurantContext';

export default function AboutPage() {
  const { restaurantInfo } = useRestaurant();
  const { t, i18n } = useTranslation();

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const features = [
    {
      icon: Award,
      title: t('about.qualityIngredients'),
      description: t('about.qualityDesc')
    },
    {
      icon: Users,
      title: t('about.familyTradition'),
      description: t('about.familyDesc')
    },
    {
      icon: Heart,
      title: t('about.madeWithLove'),
      description: t('about.loveDesc')
    },
    {
      icon: Clock,
      title: t('about.timeHonored'),
      description: t('about.timeDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h1>
          <p className="text-lg md:text-xl text-gray-600">{t('about.subtitle')}</p>
        </div>

        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Chef at work"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('about.ourStory')}</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {restaurantInfo.about}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-12 md:mb-16 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">{t('about.meetTeam')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Head Chef"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Marco Giuseppe</h3>
              <p className="text-orange-600 font-medium">{t('about.headChef')}</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sous Chef"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Maria Rossi</h3>
              <p className="text-orange-600 font-medium">{t('about.sousChef')}</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1055270/pexels-photo-1055270.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Manager"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Antonio Bella</h3>
              <p className="text-orange-600 font-medium">{t('about.manager')}</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('about.readyToTaste')}</h2>
          <p className="text-lg md:text-xl mb-6">{t('about.unforgettable')}</p>
          <a
            href={`tel:${restaurantInfo.phone}`}
            className="bg-white text-orange-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('about.callNowToOrder')}
          </a>
        </div>
      </div>
    </div>
  );
}