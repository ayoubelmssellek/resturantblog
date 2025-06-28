import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the custom banner only on mobile
      if (isMobile) {
        setShowBanner(true);
      }
    };

    // Listen for the app being installed
    const handleAppInstalled = () => {
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isMobile]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Hide the banner regardless of user choice
    setShowBanner(false);
    setDeferredPrompt(null);

    // Log the outcome for debugging (optional)
    console.log(`User response to the install prompt: ${outcome}`);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Keep the deferredPrompt in case user wants to install later
  };

  // Don't show banner if not mobile or no prompt available
  if (!showBanner || !isMobile || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:hidden">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 mx-auto max-w-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-100 p-2 rounded-xl">
              <Download className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl">📱</div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-800 font-medium text-sm leading-relaxed" dir="rtl">
            {t('pwa.addToHomeScreen')}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-3 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-200 text-sm shadow-lg"
            dir="rtl"
          >
            {t('pwa.addNow')}
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
          >
            {t('pwa.later')}
          </button>
        </div>
      </div>
    </div>
  );
}