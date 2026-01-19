import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCog, Stethoscope, User, Pill, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

const roles = [
  {
    id: "admin",
    nameKey: "roles.admin.name",
    icon: UserCog,
    path: "/admin",
    descriptionKey: "roles.admin.description",
  },
  {
    id: "doctor",
    nameKey: "roles.doctor.name",
    icon: Stethoscope,
    path: "/doctor",
    descriptionKey: "roles.doctor.description",
  },
  {
    id: "patient",
    nameKey: "roles.patient.name",
    icon: User,
    path: "/patient",
    descriptionKey: "roles.patient.description",
  },
  {
    id: "pharmacy",
    nameKey: "roles.pharmacy.name",
    icon: Pill,
    path: "/pharmacy",
    descriptionKey: "roles.pharmacy.description",
  },
];

export const RoleSelector = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRoleSelect = (path: string) => {
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='medical' size='lg' className='gap-2'>
          <User className='h-5 w-5' />
          {t("roles.selectRole")}
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='center'
        className='w-64 bg-popover border shadow-medical'
      >
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <DropdownMenuItem
              key={role.id}
              onClick={() => handleRoleSelect(role.path)}
              className='flex items-center gap-3 p-4 cursor-pointer hover:bg-accent rounded-md transition-smooth'
            >
              <div className='flex-shrink-0'>
                <IconComponent className='h-5 w-5 text-primary' />
              </div>
              <div className='flex-1'>
                <div className='font-semibold text-foreground'>
                  {t(role.nameKey)}
                </div>
                <div className='text-sm text-muted-foreground'>
                  {t(role.descriptionKey)}
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
