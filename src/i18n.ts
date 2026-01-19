import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// The 'resources' object contains all your translations.
// This single object holds all translations for all languages.
const resources = {
  en: {
    translation: {
      header: {
        home: "Home",
      },
      roles: {
        selectRole: "Select Role",
        admin: {
          name: "Admin",
          description: "System Administration",
        },
        doctor: {
          name: "Doctor",
          description: "Medical Professional",
        },
        patient: {
          name: "Patient",
          description: "Healthcare Consumer",
        },
        pharmacy: {
          name: "Pharmacy",
          description: "Medicine Provider",
        },
      },
      hero: {
        title: "Your Health, Our Priority",
        description:
          "Access quality healthcare from anywhere. Connect with doctors, manage records, and find medicines - all in one secure platform.",
      },
      stats: {
        patientsServed: "Patients Served",
        securityRating: "Security Rating",
        responseTime: "Response Time",
        uptime: "Uptime",
      },
      features: {
        title: "Comprehensive Healthcare Solutions",
        description:
          "Experience modern healthcare with our integrated platform designed for patients, doctors, and healthcare providers.",
        videoConsultations: {
          title: "Video Consultations",
          description:
            "Connect with healthcare professionals through secure WebRTC-based video calls",
          stats: "24/7 Available",
        },
        healthRecords: {
          title: "Health Records",
          description:
            "Access and manage your medical records offline with automatic synchronization",
          stats: "Secure & Private",
        },
        pharmacyNetwork: {
          title: "Pharmacy Network",
          description:
            "Real-time medicine availability and location tracking for nearby pharmacies",
          stats: "500+ Partners",
        },
        aiSymptomChecker: {
          title: "AI Symptom Checker",
          description:
            "Get preliminary health insights with our lightweight AI diagnostic assistant",
          stats: "95% Accuracy",
        },
      },
      cta: {
        title: "Ready to Transform Your Healthcare Experience?",
        description:
          "Join thousands of users who trust our platform for their healthcare needs. Get started today and experience the future of medicine.",
        getStarted: "Get Started Free",
        learnMore: "Learn More",
      },
      footer: {
        tagline:
          "Transforming healthcare through technology, making quality medical care accessible to everyone.",
        quickLinks: "Quick Links",
        aboutUs: "About Us",
        services: "Services",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        support: "Support",
        helpCenter: "Help Center",
        contactSupport: "Contact Support",
        documentation: "Documentation",
        community: "Community",
        emergencyContacts: "Emergency Contacts",
        emergency: "Emergency",
        supportContact: "Support",
        crisisLine: "Crisis Line",
        poisonControl: "Poison Control",
        copyright: "All rights reserved. | Made with ❤ for better healthcare",
      },
    },
  },
  hi: {
    translation: {
      header: {
        home: "होम",
      },
      roles: {
        selectRole: "भूमिका चुनें",
        admin: {
          name: "व्यवस्थापक",
          description: "सिस्टम एडमिनिस्ट्रेशन",
        },
        doctor: {
          name: "डॉक्टर",
          description: "चिकित्सा पेशेवर",
        },
        patient: {
          name: "रोगी",
          description: "स्वास्थ्य देखभाल उपभोक्ता",
        },
        pharmacy: {
          name: "फार्मेसी",
          description: "दवा प्रदाता",
        },
      },
      hero: {
        title: "आपका स्वास्थ्य, हमारी प्राथमिकता",
        description:
          "कहीं से भी गुणवत्तापूर्ण स्वास्थ्य सेवा प्राप्त करें। डॉक्टरों से जुड़ें, रिकॉर्ड प्रबंधित करें और दवाएं खोजें - सभी एक सुरक्षित प्लेटफॉर्म पर।",
      },
      stats: {
        patientsServed: "सेवा प्राप्त रोगी",
        securityRating: "सुरक्षा रेटिंग",
        responseTime: "प्रतिक्रिया समय",
        uptime: "अपटाइम",
      },
      features: {
        title: "व्यापक स्वास्थ्य देखभाल समाधान",
        description:
          "मरीजों, डॉक्टरों और स्वास्थ्य सेवा प्रदाताओं के लिए डिज़ाइन किए गए हमारे एकीकृत मंच के साथ आधुनिक स्वास्थ्य सेवा का अनुभव करें।",
        videoConsultations: {
          title: "वीडियो परामर्श",
          description:
            "सुरक्षित WebRTC-आधारित वीडियो कॉल के माध्यम से स्वास्थ्य पेशेवरों से जुड़ें",
          stats: "24/7 उपलब्ध",
        },
        healthRecords: {
          title: "स्वास्थ्य रिकॉर्ड",
          description:
            "स्वचालित सिंक्रनाइज़ेशन के साथ अपने मेडिकल रिकॉर्ड को ऑफ़लाइन एक्सेस और प्रबंधित करें",
          stats: "सुरक्षित और निजी",
        },
        pharmacyNetwork: {
          title: "फार्मेसी नेटवर्क",
          description:
            "आस-पास की फार्मेसियों के लिए वास्तविक समय में दवा की उपलब्धता और स्थान ट्रैकिंग",
          stats: "500+ भागीदार",
        },
        aiSymptomChecker: {
          title: "एआई लक्षण जांचकर्ता",
          description:
            "हमारे हल्के एआई निदान सहायक के साथ प्रारंभिक स्वास्थ्य अंतर्दृष्टि प्राप्त करें",
          stats: "95% सटीकता",
        },
      },
      cta: {
        title: "क्या आप अपने स्वास्थ्य सेवा अनुभव को बदलने के लिए तैयार हैं?",
        description:
          "हजारों उपयोगकर्ताओं से जुड़ें जो अपनी स्वास्थ्य सेवा आवश्यकताओं के लिए हमारे मंच पर भरोसा करते हैं। आज ही शुरू करें और चिकित्सा के भविष्य का अनुभव करें।",
        getStarted: "मुफ्त में शुरू करें",
        learnMore: "और जानें",
      },
      footer: {
        tagline:
          "प्रौद्योगिकी के माध्यम से स्वास्थ्य सेवा को बदलना, हर किसी के लिए गुणवत्तापूर्ण चिकित्सा देखभाल को सुलभ बनाना।",
        quickLinks: "त्वरित लिंक",
        aboutUs: "हमारे बारे में",
        services: "सेवाएं",
        privacyPolicy: "गोपनीयता नीति",
        termsOfService: "सेवा की शर्तें",
        support: "समर्थन",
        helpCenter: "सहायता केंद्र",
        contactSupport: "समर्थन से संपर्क करें",
        documentation: "दस्तावेज़ीकरण",
        community: "समुदाय",
        emergencyContacts: "आपातकालीन संपर्क",
        emergency: "आपातकाल",
        supportContact: "समर्थन",
        crisisLine: "संकट रेखा",
        poisonControl: "जहर नियंत्रण",
        copyright:
          "सभी अधिकार सुरक्षित हैं। | बेहतर स्वास्थ्य सेवा के लिए ❤ के साथ बनाया गया",
      },
    },
  },
  bn: {
    translation: {
      header: {
        home: "হোম",
      },
      roles: {
        selectRole: "ভূমিকা নির্বাচন করুন",
        admin: {
          name: "অ্যাডমিন",
          description: "সিস্টেম অ্যাডমিনিস্ট্রেশন",
        },
        doctor: {
          name: "ডাক্তার",
          description: "মেডিকেল পেশাদার",
        },
        patient: {
          name: "রোগী",
          description: "স্বাস্থ্যসেবা ভোক্তা",
        },
        pharmacy: {
          name: "ফার্মেসি",
          description: "ওষুধ সরবরাহকারী",
        },
      },
      hero: {
        title: "আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার",
        description:
          "যে কোনো জায়গা থেকে মানসম্মত স্বাস্থ্যসেবা অ্যাক্সেস করুন। ডাক্তারদের সাথে সংযোগ করুন, রেকর্ড পরিচালনা করুন এবং ওষুধ খুঁজুন - সবকিছু একটি নিরাপদ প্ল্যাটফর্মে।",
      },
      stats: {
        patientsServed: "পরিষেবা প্রাপ্ত রোগী",
        securityRating: "নিরাপত্তা রেটিং",
        responseTime: "প্রতিক্রিয়া সময়",
        uptime: "আপটাইম",
      },
      features: {
        title: "ব্যাপক স্বাস্থ্যসেবা সমাধান",
        description:
          "রোগী, ডাক্তার এবং স্বাস্থ্যসেবা প্রদানকারীদের জন্য ডিজাইন করা আমাদের সমন্বিত প্ল্যাটফর্মের সাথে আধুনিক স্বাস্থ্যসেবার অভিজ্ঞতা নিন।",
        videoConsultations: {
          title: "ভিডিও পরামর্শ",
          description:
            "নিরাপদ WebRTC-ভিত্তিক ভিডিও কলের মাধ্যমে স্বাস্থ্যসেবা পেশাদারদের সাথে সংযোগ করুন",
          stats: "24/7 উপলব্ধ",
        },
        healthRecords: {
          title: "স্বাস্থ্য রেকর্ড",
          description:
            "স্বয়ংক্রিয় সিঙ্ক্রোনাইজেশনের সাথে আপনার মেডিকেল রেকর্ড অফলাইনে অ্যাক্সেস এবং পরিচালনা করুন",
          stats: "নিরাপদ এবং ব্যক্তিগত",
        },
        pharmacyNetwork: {
          title: "ফার্মেসি নেটওয়ার্ক",
          description:
            "কাছাকাছি ফার্মেসির জন্য রিয়েল-টাইম ওষুধের প্রাপ্যতা এবং অবস্থান ট্র্যাকিং",
          stats: "500+ অংশীদার",
        },
        aiSymptomChecker: {
          title: "এআই লক্ষণ পরীক্ষক",
          description:
            "আমাদের হালকা এআই ডায়াগনস্টিক সহকারীর মাধ্যমে প্রাথমিক স্বাস্থ্য অন্তর্দৃষ্টি পান",
          stats: "95% নির্ভুলতা",
        },
      },
      cta: {
        title: "আপনার স্বাস্থ্যসেবা অভিজ্ঞতা পরিবর্তন করতে প্রস্তুত?",
        description:
          "হাজার হাজার ব্যবহারকারীর সাথে যোগ দিন যারা তাদের স্বাস্থ্যসেবার প্রয়োজনের জন্য আমাদের প্ল্যাটফর্মে বিশ্বাস করেন। আজই শুরু করুন এবং ওষুধের ভবিষ্যৎ অভিজ্ঞতা নিন।",
        getStarted: "বিনামূল্যে শুরু করুন",
        learnMore: "আরও জানুন",
      },
      footer: {
        tagline:
          "প্রযুক্তির মাধ্যমে স্বাস্থ্যসেবাকে পরিবর্তন করা, সবার জন্য মানসম্মত চিকিৎসা সেবা সহজলভ্য করা।",
        quickLinks: "দ্রুত লিংক",
        aboutUs: "আমাদের সম্পর্কে",
        services: "পরিষেবা",
        privacyPolicy: "গোপনীয়তা নীতি",
        termsOfService: "পরিষেবার শর্তাবলী",
        support: "সহায়তা",
        helpCenter: "সহায়তা কেন্দ্র",
        contactSupport: "সহায়তার সাথে যোগাযোগ করুন",
        documentation: "ডকুমেন্টেশন",
        community: "সম্প্রদায়",
        emergencyContacts: "জরুরী যোগাযোগ",
        emergency: "জরুরী",
        supportContact: "সহায়তা",
        crisisLine: "সংকট রেখা",
        poisonControl: "বিষ নিয়ন্ত্রণ",
        copyright:
          "সমস্ত অধিকার সংরক্ষিত। | উন্নত স্বাস্থ্যসেবার জন্য ❤ দিয়ে তৈরি",
      },
    },
  },
  pa: {
    translation: {
      header: {
        home: "ਹੋਮ",
      },
      roles: {
        selectRole: "ਭੂਮਿਕਾ ਚੁਣੋ",
        admin: {
          name: "ਪ੍ਰਸ਼ਾਸਕ",
          description: "ਸਿਸਟਮ ਪ੍ਰਸ਼ਾਸਨ",
        },
        doctor: {
          name: "ਡਾਕਟਰ",
          description: "ਮੈਡੀਕਲ ਪੇਸ਼ੇਵਰ",
        },
        patient: {
          name: "ਮਰੀਜ਼",
          description: "ਸਿਹਤ ਸੰਭਾਲ ਖਪਤਕਾਰ",
        },
        pharmacy: {
          name: "ਫਾਰਮੇਸੀ",
          description: "ਦਵਾਈ ਪ੍ਰਦਾਤਾ",
        },
      },
      hero: {
        title: "ਤੁਹਾਡੀ ਸਿਹਤ, ਸਾਡੀ ਤਰਜੀਹ",
        description:
          "ਕਿਤੇ ਵੀ ਬਿਹਤਰ ਸਿਹਤ ਸੰਭਾਲ ਪ੍ਰਾਪਤ ਕਰੋ। ਡਾਕਟਰਾਂ ਨਾਲ ਜੁੜੋ, ਰਿਕਾਰਡ ਪ੍ਰਬੰਧਿਤ ਕਰੋ, ਅਤੇ ਦਵਾਈਆਂ ਲੱਭੋ - ਸਭ ਕੁਝ ਇੱਕ ਸੁਰੱਖਿਅਤ ਪਲੇਟਫਾਰਮ 'ਤੇ।",
      },
      stats: {
        patientsServed: "ਸੇਵਾ ਪ੍ਰਾਪਤ ਮਰੀਜ਼",
        securityRating: "ਸੁਰੱਖਿਆ ਰੇਟਿੰਗ",
        responseTime: "ਪ੍ਰਤੀਕਿਰਿਆ ਸਮਾਂ",
        uptime: "ਅੱਪਟਾਈਮ",
      },
      features: {
        title: "ਵਿਆਪਕ ਸਿਹਤ ਸੰਭਾਲ ਹੱਲ",
        description:
          "ਮਰੀਜ਼ਾਂ, ਡਾਕਟਰਾਂ, ਅਤੇ ਸਿਹਤ ਸੰਭਾਲ ਪ੍ਰਦਾਤਾਵਾਂ ਲਈ ਤਿਆਰ ਕੀਤੇ ਗਏ ਸਾਡੇ ਏਕੀਕ੍ਰਿਤ ਪਲੇਟਫਾਰਮ ਨਾਲ ਆਧੁਨਿਕ ਸਿਹਤ ਸੰਭਾਲ ਦਾ ਅਨੁਭਵ ਕਰੋ।",
        videoConsultations: {
          title: "ਵੀਡੀਓ ਸਲਾਹ",
          description:
            "ਸੁਰੱਖਿਅਤ WebRTC-ਅਧਾਰਿਤ ਵੀਡੀਓ ਕਾਲਾਂ ਰਾਹੀਂ ਸਿਹਤ ਸੰਭਾਲ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਜੁੜੋ",
          stats: "24/7 ਉਪਲਬਧ",
        },
        healthRecords: {
          title: "ਸਿਹਤ ਰਿਕਾਰਡ",
          description:
            "ਆਟੋਮੈਟਿਕ ਸਿੰਕ੍ਰੋਨਾਈਜੇਸ਼ਨ ਨਾਲ ਆਪਣੇ ਮੈਡੀਕਲ ਰਿਕਾਰਡਾਂ ਨੂੰ ਆਫਲਾਈਨ ਐਕਸੈਸ ਅਤੇ ਪ੍ਰਬੰਧਿਤ ਕਰੋ",
          stats: "ਸੁਰੱਖਿਅਤ ਅਤੇ ਨਿੱਜੀ",
        },
        pharmacyNetwork: {
          title: "ਫਾਰਮੇਸੀ ਨੈਟਵਰਕ",
          description:
            "ਨੇੜਲੀਆਂ ਫਾਰਮੇਸੀਆਂ ਲਈ ਰੀਅਲ-ਟਾਈਮ ਦਵਾਈ ਦੀ ਉਪਲਬਧਤਾ ਅਤੇ ਸਥਾਨ ਟਰੈਕਿੰਗ",
          stats: "500+ ਭਾਈਵਾਲ",
        },
        aiSymptomChecker: {
          title: "ਏਆਈ ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
          description:
            "ਸਾਡੇ ਹਲਕੇ ਏਆਈ ਡਾਇਗਨੌਸਟਿਕ ਸਹਾਇਕ ਨਾਲ ਸ਼ੁਰੂਆਤੀ ਸਿਹਤ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ",
          stats: "95% ਸ਼ੁੱਧਤਾ",
        },
      },
      cta: {
        title: "ਕੀ ਤੁਸੀਂ ਆਪਣੇ ਸਿਹਤ ਸੰਭਾਲ ਅਨੁਭਵ ਨੂੰ ਬਦਲਣ ਲਈ ਤਿਆਰ ਹੋ?",
        description:
          "ਉਹਨਾਂ ਹਜ਼ਾਰਾਂ ਉਪਭੋਗਤਾਵਾਂ ਨਾਲ ਜੁੜੋ ਜੋ ਆਪਣੀਆਂ ਸਿਹਤ ਸੰਭਾਲ ਲੋੜਾਂ ਲਈ ਸਾਡੇ ਪਲੇਟਫਾਰਮ 'ਤੇ ਭਰੋਸਾ ਕਰਦੇ ਹਨ। ਅੱਜ ਹੀ ਸ਼ੁਰੂਆਤ ਕਰੋ ਅਤੇ ਦਵਾਈ ਦੇ ਭਵਿੱਖ ਦਾ ਅਨੁਭਵ ਕਰੋ।",
        getStarted: "ਮੁਫ਼ਤ ਵਿੱਚ ਸ਼ੁਰੂ ਕਰੋ",
        learnMore: "ਹੋਰ ਜਾਣੋ",
      },
      footer: {
        tagline:
          "ਤਕਨਾਲੋਜੀ ਰਾਹੀਂ ਸਿਹਤ ਸੰਭਾਲ ਨੂੰ ਬਦਲਨਾ, ਹਰ ਕਿਸੇ ਲਈ ਬਿਹਤਰ ਮੈਡੀਕਲ ਦੇਖਭਾਲ ਨੂੰ ਪਹੁੰਚਯੋਗ ਬਣਾਉਣਾ।",
        quickLinks: "ਤੇਜ਼ ਲਿੰਕ",
        aboutUs: "ਸਾਡੇ ਬਾਰੇ",
        services: "ਸੇਵਾਵਾਂ",
        privacyPolicy: "ਗੋਪਨੀਯਤਾ ਨੀਤੀ",
        termsOfService: "ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ",
        support: "ਸਹਾਇਤਾ",
        helpCenter: "ਸਹਾਇਤਾ ਕੇਂਦਰ",
        contactSupport: "ਸਹਾਇਤਾ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
        documentation: "ਦਸਤਾਵੇਜ਼ੀਕਰਨ",
        community: "ਭਾਈਚਾਰਾ",
        emergencyContacts: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ",
        emergency: "ਐਮਰਜੈਂਸੀ",
        supportContact: "ਸਹਾਇਤਾ",
        crisisLine: "ਸੰਕਟ ਲਾਈਨ",
        poisonControl: "ਜ਼ਹਿਰ ਨਿਯੰਤਰਣ",
        copyright:
          "ਸਾਰੇ ਅਧਿਕਾਰ ਰਾਖਵੇਂ ਹਨ। | ਬਿਹਤਰ ਸਿਹਤ ਸੰਭਾਲ ਲਈ ❤ ਨਾਲ ਬਣਾਇਆ ਗਿਆ",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
