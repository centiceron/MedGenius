import React, { useState } from "react";
import {
  Calendar,
  Video,
  FileText,
  Clock,
  Users,
  Phone,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";

const mockPatients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    condition: "Hypertension",
    nextAppointment: "2024-01-25 10:00",
    status: "urgent",
    lastVisit: "2024-01-15",
  },
  {
    id: 2,
    name: "Maria Garcia",
    age: 32,
    condition: "Diabetes Type 2",
    nextAppointment: "2024-01-25 14:30",
    status: "scheduled",
    lastVisit: "2024-01-10",
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 58,
    condition: "Heart Disease",
    nextAppointment: "2024-01-26 09:15",
    status: "follow-up",
    lastVisit: "2024-01-12",
  },
  {
    id: 4,
    name: "Lisa Chen",
    age: 28,
    condition: "Anxiety",
    nextAppointment: "2024-01-26 16:00",
    status: "new-patient",
    lastVisit: null,
  },
];

const DoctorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      icon: Calendar,
      color: "primary",
    },
    { title: "Total Patients", value: "247", icon: Users, color: "success" },
    { title: "Pending Reviews", value: "8", icon: FileText, color: "warning" },
    { title: "Video Calls", value: "45", icon: Video, color: "accent" },
  ];

  const startVideoCall = () => {
    navigate(`/room/123`); // will open Zego meeting with patient
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-muted/30'>
      <Header />

      <div className='container max-w-screen-2xl mx-auto p-6'>
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Doctor Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Manage your patients and consultations
          </p>
        </div>
        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          <Card className='bg-gradient-card shadow-card border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-primary/10'>
                  <FileText className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    Write Prescription
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Create new prescriptions
                  </p>
                </div>
              </div>
              <Button variant='outline' className='w-full mt-4'>
                New Prescription
              </Button>
            </CardContent>
          </Card>

          <Card className='bg-gradient-card shadow-card border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-success/10'>
                  <Calendar className='h-6 w-6 text-success' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    Schedule Appointment
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Manage your calendar
                  </p>
                </div>
              </div>
              <Button variant='outline' className='w-full mt-4'>
                Open Calendar
              </Button>
            </CardContent>
          </Card>

          <Card className='bg-gradient-card shadow-card border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-accent/10'>
                  <Users className='h-6 w-6 text-accent' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    Patient Records
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    View medical histories
                  </p>
                </div>
              </div>
              <Button variant='outline' className='w-full mt-4'>
                Browse Records
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Patient List */}
          <Card className='bg-gradient-card shadow-medical border-0'>
            <CardHeader>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <CardTitle className='text-xl font-semibold'>
                  My Patients
                </CardTitle>
                <Button variant='medical' className='flex items-center gap-2'>
                  <Plus className='h-4 w-4' />
                  Add Patient
                </Button>
              </div>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search patients...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className='flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <h3 className='font-semibold text-foreground'>
                          {patient.name}
                        </h3>
                        <Badge
                          variant={
                            patient.status === "urgent"
                              ? "destructive"
                              : patient.status === "new-patient"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {patient.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        Age: {patient.age} • {patient.condition}
                      </p>
                      <div className='flex items-center gap-2 mt-2 text-xs text-muted-foreground'>
                        <Clock className='h-3 w-3' />
                        {patient.nextAppointment}
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Button
                        variant='medical'
                        size='sm'
                        onClick={() => startVideoCall()}
                        className='flex items-center gap-2'
                      >
                        <Video className='h-4 w-4' />
                        Call
                      </Button>
                      <Button
                        onClick={() => navigate("/prescription")}
                        variant='outline'
                        size='sm'
                      >
                        Records
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className='bg-gradient-card shadow-medical border-0'>
            <CardHeader>
              <CardTitle className='text-xl font-semibold'>
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[
                  {
                    time: "09:00",
                    patient: "John Smith",
                    type: "Follow-up",
                    duration: "30 min",
                  },
                  {
                    time: "10:00",
                    patient: "Maria Garcia",
                    type: "Consultation",
                    duration: "45 min",
                  },
                  {
                    time: "11:30",
                    patient: "Robert Johnson",
                    type: "Check-up",
                    duration: "30 min",
                  },
                  {
                    time: "14:00",
                    patient: "Lisa Chen",
                    type: "New Patient",
                    duration: "60 min",
                  },
                  {
                    time: "15:30",
                    patient: "David Wilson",
                    type: "Follow-up",
                    duration: "30 min",
                  },
                ].map((appointment, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='text-center'>
                        <div className='font-semibold text-primary'>
                          {appointment.time}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          {appointment.duration}
                        </div>
                      </div>
                      <div>
                        <div className='font-medium text-foreground'>
                          {appointment.patient}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {appointment.type}
                        </div>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <Calendar className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
