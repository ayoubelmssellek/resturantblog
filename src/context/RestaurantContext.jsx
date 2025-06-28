import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RestaurantContext = createContext(undefined);

const getDefaultRestaurantInfo = (t) => ({
  name: t('restaurantInfo.name'),
  tagline: t('restaurantInfo.tagline'),
  phone: "+1-555-0123",
  whatsapp: "+15550123",
  address: "123 Main Street, Downtown, NY 10001",
  coordinates: { lat: 40.7128, lng: -74.0060 },
  openingHours: [
    { day: t('restaurantInfo.openingHours.mondayThursday'), hours: "11:00 AM - 10:00 PM" },
    { day: t('restaurantInfo.openingHours.fridaySaturday'), hours: "11:00 AM - 11:00 PM" },
    { day: t('restaurantInfo.openingHours.sunday'), hours: "12:00 PM - 9:00 PM" }
  ],
  about: t('restaurantInfo.about')
});

const getDefaultMenuItems = (t) => [
  {
    id: '1',
    name: t('menuItems.margheritaPizza'),
    description: t('menuItems.margheritaDesc'),
    price: 18,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: t('categories.Pizza')
  },
  {
    id: '2',
    name: t('menuItems.spaghettiCarbonara'),
    description: t('menuItems.carbonaraDesc'),
    price: 22,
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: t('categories.Pasta')
  },
  {
    id: '3',
    name: t('menuItems.ossoBuco'),
    description: t('menuItems.ossoBucoDesc'),
    price: 35,
    image: 'https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: t('categories.Main Course')
  },
  {
    id: '4',
    name: t('menuItems.tiramisu'),
    description: t('menuItems.tiramisuDesc'),
    price: 12,
    image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: t('categories.Dessert')
  },
  {
    id: '5',
    name: t('menuItems.caesarSalad'),
    description: t('menuItems.caesarDesc'),
    price: 14,
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: t('categories.Salads')
  },
  {
    id: '6',
    name: t('menuItems.beefBurger'),
    description: t('menuItems.burgerDesc'),
    price: 16,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: t('categories.Burgers')
  }
];

const defaultGalleryImages = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Restaurant interior'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Fresh pasta preparation'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Wood fired pizza oven'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Chef preparing dishes'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Beautiful plated dessert'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Restaurant dining area'
  }
];

export function RestaurantProvider({ children }) {
  const { t, i18n } = useTranslation();
  const [restaurantInfo, setRestaurantInfo] = useState(() => getDefaultRestaurantInfo(t));
  const [menuItems, setMenuItems] = useState(() => getDefaultMenuItems(t));
  const [galleryImages, setGalleryImages] = useState(defaultGalleryImages);

  // Update data when language changes
  useEffect(() => {
    setRestaurantInfo(getDefaultRestaurantInfo(t));
    setMenuItems(getDefaultMenuItems(t));
  }, [i18n.language, t]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedInfo = localStorage.getItem('restaurantInfo');
    const savedMenu = localStorage.getItem('menuItems');
    const savedGallery = localStorage.getItem('galleryImages');

    if (savedInfo) {
      try {
        setRestaurantInfo(JSON.parse(savedInfo));
      } catch (e) {
        console.error('Error parsing saved restaurant info:', e);
      }
    }
    if (savedMenu) {
      try {
        setMenuItems(JSON.parse(savedMenu));
      } catch (e) {
        console.error('Error parsing saved menu items:', e);
      }
    }
    if (savedGallery) {
      try {
        setGalleryImages(JSON.parse(savedGallery));
      } catch (e) {
        console.error('Error parsing saved gallery images:', e);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('restaurantInfo', JSON.stringify(restaurantInfo));
  }, [restaurantInfo]);

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
  }, [galleryImages]);

  const updateRestaurantInfo = (info) => {
    setRestaurantInfo(prev => ({ ...prev, ...info }));
  };

  const addMenuItem = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id, item) => {
    setMenuItems(prev => prev.map(menuItem => 
      menuItem.id === id ? { ...menuItem, ...item } : menuItem
    ));
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const addGalleryImage = (image) => {
    const newImage = { ...image, id: Date.now().toString() };
    setGalleryImages(prev => [...prev, newImage]);
  };

  const deleteGalleryImage = (id) => {
    setGalleryImages(prev => prev.filter(image => image.id !== id));
  };

  return (
    <RestaurantContext.Provider value={{
      restaurantInfo,
      menuItems,
      galleryImages,
      updateRestaurantInfo,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addGalleryImage,
      deleteGalleryImage
    }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
}