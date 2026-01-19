import React, { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const selectedLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center gap-2 px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-100'
      >
        <Globe className='h-4 w-4' />
        <span className='hidden sm:inline'>{selectedLanguage.name}</span>
        <span className='sm:hidden'>{selectedLanguage.flag}</span>
        <ChevronDown className='h-3 w-3' />
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10'>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className='flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100'
            >
              <span className='text-lg'>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
