import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { RoleSelector } from "./RoleSelector";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t } = useTranslation();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 max-w-screen-2xl items-center justify-between'>
        <Link
          to='/'
          className='flex items-center gap-2 transition-smooth hover:opacity-80'
        >
          <div className='flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-soft'>
            <Heart className='h-6 w-6 text-white' />
          </div>
          <span className='text-xl font-bold text-foreground'>HealthCare+</span>
        </Link>

        <nav className='flex items-center gap-4'>
          {!isHomePage && (
            <Button variant='ghost' asChild>
              <Link to='/' className='flex items-center gap-2'>
                <Home className='h-4 w-4' />
                {t("header.home")}
              </Link>
            </Button>
          )}

          {isHomePage && <RoleSelector />}
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
};
