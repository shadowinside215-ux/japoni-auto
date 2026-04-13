import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        inventory: 'Inventory',
        whyUs: 'Why Us',
        contact: 'Contact',
        admin: 'Admin'
      },
      hero: {
        badge: 'Premium Showroom Rabat',
        title: 'Find Your Next Car',
        subtitle: 'with Confidence.',
        description: 'Serious cars. Serious buyers. No time wasted. Experience the pinnacle of automotive excellence in Morocco.',
        viewCars: 'View Available Cars',
        whatsapp: 'Contact on WhatsApp'
      },
      inventory: {
        badge: 'Exclusive Inventory',
        title: 'Featured Vehicles',
        description: 'Explore our curated selection of high-performance and luxury vehicles, each inspected to meet our rigorous standards of quality.',
        viewDetails: 'View Details',
        year: 'Year',
        mileage: 'Mileage',
        fuel: 'Fuel'
      },
      whyUs: {
        badge: 'The Japoni Standard',
        title: 'Why Choose Us',
        description: "We don't just sell cars; we provide a premium automotive experience built on trust, quality, and exceptional service.",
        quality: {
          title: 'High-Quality Vehicles',
          desc: 'Every car in our showroom undergoes a rigorous multi-point inspection process.'
        },
        pricing: {
          title: 'Transparent Pricing',
          desc: 'No hidden fees or surprises. We provide clear, honest pricing on every vehicle.'
        },
        process: {
          title: 'Fast & Easy Process',
          desc: 'From viewing to ownership, we streamline every step for a seamless experience.'
        },
        sellers: {
          title: 'Serious Sellers Only',
          desc: 'We curate our inventory from trusted sources to ensure maximum reliability.'
        }
      },
      testimonials: {
        badge: 'Client Stories',
        title: 'What Our Clients Say'
      },
      contact: {
        badge: 'Get In Touch',
        title: 'Ready to Drive Your',
        subtitle: 'Dream Car?',
        callUs: 'Call Us',
        visit: 'Visit Showroom',
        email: 'Email Us',
        whatsappTitle: 'Contact us on WhatsApp',
        whatsappDesc: 'The fastest way to get in touch with our team. Click the button below to start a conversation.',
        chatNow: 'Chat with us now',
        available: 'Available 24/7 for your inquiries'
      },
      footer: {
        desc: 'The premier destination for luxury and high-performance vehicles in Rabat.',
        quickLinks: 'Quick Links',
        inventory: 'Inventory',
        newsletter: 'Newsletter',
        newsletterDesc: 'Subscribe to get notified about our latest arrivals.',
        join: 'Join',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      },
      carDetail: {
        specs: 'Specifications',
        features: 'Features',
        interested: 'Interested in this vehicle?',
        name: 'Your Name',
        phone: 'Phone Number',
        payment: 'Payment Method',
        cash: 'Cash',
        financing: 'Financing',
        when: 'When do you want to buy?',
        immediately: 'Immediately',
        week: 'Within a week',
        month: 'Within a month',
        send: 'Send Inquiry',
        chat: 'Chat on WhatsApp',
        inquireNow: 'Inquire Now'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        inventory: 'Inventaire',
        whyUs: 'Pourquoi Nous',
        contact: 'Contact',
        admin: 'Admin'
      },
      hero: {
        badge: 'Showroom Premium Rabat',
        title: 'Trouvez Votre Prochaine Voiture',
        subtitle: 'en Toute Confiance.',
        description: 'Des voitures sérieuses. Des acheteurs sérieux. Pas de temps perdu. Découvrez le summum de l\'excellence automobile au Maroc.',
        viewCars: 'Voir les Voitures Disponibles',
        whatsapp: 'Contactez-nous sur WhatsApp'
      },
      inventory: {
        badge: 'Inventaire Exclusif',
        title: 'Véhicules en Vedette',
        description: 'Explorez notre sélection de véhicules de luxe et de haute performance, chacun inspecté selon nos normes de qualité rigoureuses.',
        viewDetails: 'Voir les Détails',
        year: 'Année',
        mileage: 'Kilométrage',
        fuel: 'Carburant'
      },
      whyUs: {
        badge: 'Le Standard Japoni',
        title: 'Pourquoi Nous Choisir',
        description: "Nous ne vendons pas seulement des voitures ; nous offrons une expérience automobile premium basée sur la confiance, la qualité et un service exceptionnel.",
        quality: {
          title: 'Véhicules de Haute Qualité',
          desc: 'Chaque voiture de notre showroom subit un processus d\'inspection rigoureux.'
        },
        pricing: {
          title: 'Prix Transparents',
          desc: 'Pas de frais cachés ni de surprises. Nous fournissons des prix clairs et honnêtes.'
        },
        process: {
          title: 'Processus Rapide et Facile',
          desc: 'De la visite à l\'achat, nous simplifions chaque étape pour une expérience fluide.'
        },
        sellers: {
          title: 'Vendeurs Sérieux Uniquement',
          desc: 'Nous sélectionnons notre inventaire auprès de sources fiables pour une fiabilité maximale.'
        }
      },
      testimonials: {
        badge: 'Témoignages Clients',
        title: 'Ce Que Disent Nos Clients'
      },
      contact: {
        badge: 'Contactez-nous',
        title: 'Prêt à Conduire Votre',
        subtitle: 'Voiture de Rêve ?',
        callUs: 'Appelez-nous',
        visit: 'Visitez le Showroom',
        email: 'Envoyez-nous un Email',
        whatsappTitle: 'Contactez-nous sur WhatsApp',
        whatsappDesc: 'Le moyen le plus rapide de contacter notre équipe. Cliquez sur le bouton ci-dessous.',
        chatNow: 'Discutez avec nous',
        available: 'Disponible 24/7 pour vos demandes'
      },
      footer: {
        desc: 'La destination de choix pour les véhicules de luxe et de haute performance à Rabat.',
        quickLinks: 'Liens Rapides',
        inventory: 'Inventaire',
        newsletter: 'Newsletter',
        newsletterDesc: 'Inscrivez-vous pour être informé de nos derniers arrivages.',
        join: 'Rejoindre',
        privacy: 'Politique de Confidentialité',
        terms: 'Conditions d\'Utilisation'
      },
      carDetail: {
        specs: 'Spécifications',
        features: 'Caractéristiques',
        interested: 'Intéressé par ce véhicule ?',
        name: 'Votre Nom',
        phone: 'Numéro de Téléphone',
        payment: 'Mode de Paiement',
        cash: 'Espèces',
        financing: 'Financement',
        when: 'Quand voulez-vous acheter ?',
        immediately: 'Immédiatement',
        week: 'D\'ici une semaine',
        month: 'D\'ici un mois',
        send: 'Envoyer la Demande',
        chat: 'Discuter sur WhatsApp',
        inquireNow: 'S\'enquérir Maintenant'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        inventory: 'المخزون',
        whyUs: 'لماذا نحن',
        contact: 'اتصل بنا',
        admin: 'المسؤول'
      },
      hero: {
        badge: 'معرض متميز بالرباط',
        title: 'جد سيارتك القادمة',
        subtitle: 'بكل ثقة.',
        description: 'سيارات جادة. مشترون جادون. لا وقت ضائع. اختبر قمة التميز في عالم السيارات في المغرب.',
        viewCars: 'عرض السيارات المتاحة',
        whatsapp: 'تواصل عبر واتساب'
      },
      inventory: {
        badge: 'مخزون حصري',
        title: 'السيارات المميزة',
        description: 'استكشف مجموعتنا المختارة من السيارات الفاخرة وعالية الأداء، كل منها مفحوص وفق معايير الجودة الصارمة لدينا.',
        viewDetails: 'عرض التفاصيل',
        year: 'السنة',
        mileage: 'المسافة المقطوعة',
        fuel: 'الوقود'
      },
      whyUs: {
        badge: 'معيار جابوني',
        title: 'لماذا تختارنا',
        description: 'نحن لا نبيع السيارات فحسب؛ بل نقدم تجربة سيارات متميزة مبنية على الثقة والجودة والخدمة الاستثنائية.',
        quality: {
          title: 'سيارات عالية الجودة',
          desc: 'تخضع كل سيارة في معرضنا لعملية فحص دقيقة متعددة النقاط.'
        },
        pricing: {
          title: 'تسعير شفاف',
          desc: 'لا توجد رسوم خفية أو مفاجآت. نحن نقدم تسعيراً واضحاً وصادقاً لكل سيارة.'
        },
        process: {
          title: 'عملية سريعة وسهلة',
          desc: 'من المعاينة إلى الملكية، نقوم بتبسيط كل خطوة لتجربة سلسة.'
        },
        sellers: {
          title: 'بائعون جادون فقط',
          desc: 'نقوم باختيار مخزوننا من مصادر موثوقة لضمان أقصى قدر من الموثوقية.'
        }
      },
      testimonials: {
        badge: 'قصص العملاء',
        title: 'ماذا يقول عملاؤنا'
      },
      contact: {
        badge: 'تواصل معنا',
        title: 'هل أنت مستعد لقيادة',
        subtitle: 'سيارة أحلامك؟',
        callUs: 'اتصل بنا',
        visit: 'زيارة المعرض',
        email: 'راسلنا عبر البريد',
        whatsappTitle: 'تواصل معنا عبر واتساب',
        whatsappDesc: 'أسرع طريقة للتواصل مع فريقنا. اضغط على الزر أدناه لبدء المحادثة.',
        chatNow: 'تحدث معنا الآن',
        available: 'متاحون 24/7 لاستفساراتكم'
      },
      footer: {
        desc: 'الوجهة الأولى للسيارات الفاخرة وعالية الأداء في الرباط.',
        quickLinks: 'روابط سريعة',
        inventory: 'المخزون',
        newsletter: 'النشرة الإخبارية',
        newsletterDesc: 'اشترك لتصلك إشعارات حول أحدث وصولنا.',
        join: 'انضمام',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة'
      },
      carDetail: {
        specs: 'المواصفات',
        features: 'المميزات',
        interested: 'هل أنت مهتم بهذه السيارة؟',
        name: 'اسمك',
        phone: 'رقم الهاتف',
        payment: 'طريقة الدفع',
        cash: 'نقداً',
        financing: 'تمويل',
        when: 'متى تريد الشراء؟',
        immediately: 'فوراً',
        week: 'خلال أسبوع',
        month: 'خلال شهر',
        send: 'إرسال الطلب',
        chat: 'تحدث عبر واتساب',
        inquireNow: 'استفسر الآن'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
