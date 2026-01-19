import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import {
  Calendar,
  FileText,
  Video,
  Brain,
  Heart,
  Clock,
  Star,
  Send,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";

// ----------------- TYPES -----------------
interface Metadata {
  myNewField?: number;
  timestamp?: string;
  source?: string;
}

interface AIResponse {
  summary: string;
  metadata?: Metadata;
}

interface BackendResponse {
  success: boolean;
  medicines: AIResponse[];
}

// ----------------- MOCK DATA -----------------
const mockRecords = [
  {
    id: 1,
    date: "2024-01-20",
    doctor: "Dr. Sarah Johnson",
    type: "Consultation",
    diagnosis: "Routine Checkup",
    notes: "Patient in good health, blood pressure normal",
  },
  {
    id: 2,
    date: "2024-01-15",
    doctor: "Dr. Emily Rodriguez",
    type: "Lab Results",
    diagnosis: "Blood Work",
    notes: "All lab values within normal range",
  },
  {
    id: 3,
    date: "2024-01-10",
    doctor: "Dr. Mike Thompson",
    type: "Prescription",
    diagnosis: "Allergy Treatment",
    notes: "Prescribed antihistamine for seasonal allergies",
  },
];

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Practice",
    rating: 4.9,
    available: true,
  },
  {
    id: 2,
    name: "Dr. Emily Rodriguez",
    specialty: "Cardiology",
    rating: 4.8,
    available: false,
  },
  {
    id: 3,
    name: "Dr. Mike Thompson",
    specialty: "Dermatology",
    rating: 4.7,
    available: true,
  },
  {
    id: 4,
    name: "Dr. Lisa Chen",
    specialty: "Pediatrics",
    rating: 4.9,
    available: true,
  },
];

// ----------------- COMPONENT -----------------
const PatientPage: React.FC = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<AIResponse[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    setAiResponse(null);

    try {
      const { data } = await axios.post<BackendResponse>(
        "http://localhost:3001/api/search/medicine",
        { chatInput: symptoms }
      );

      if (data.success && Array.isArray(data.medicines)) {
        setAiResponse(data.medicines);
      } else {
        setAiResponse([
          { summary: "Unexpected response from AI service.", metadata: {} },
        ]);
      }
    } catch (err) {
      console.error("❌ Error fetching AI response:", err);
      setAiResponse([
        {
          summary: "Failed to analyze symptoms. Please try again later.",
          metadata: {},
        },
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const makeCall = async () => {
    try {
      const res = await axios.post(
        "https://n8n-dzxs.onrender.com/webhook/call"
      );
      alert("📞 Call triggered successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("❌ Error triggering call:", error);
      alert("Failed to trigger call.");
    }
  };

  const handleJoin = () => {
    // Navigate to room with doctorId (or fallback)
    navigate(`/room/123`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-muted/30'>
      <Header />

      <div className='container max-w-screen-2xl mx-auto p-6'>
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Patient Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Manage your health and connect with healthcare providers
          </p>
        </div>

        {/* ✅ Quick Actions moved to top */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card className='bg-gradient-card shadow-card border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-primary/10'>
                  <Calendar className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    Book Appointment
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Schedule with a doctor
                  </p>
                </div>
              </div>
              <Button variant='outline' className='w-full mt-4'>
                Schedule Now
              </Button>
            </CardContent>
          </Card>

          <Card className='bg-gradient-card shadow-card border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-success/10'>
                  <Heart className='h-6 w-6 text-success' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    Health Tracker
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Monitor vital signs
                  </p>
                </div>
              </div>
              <Button variant='outline' className='w-full mt-4'>
                Track Health
              </Button>
            </CardContent>
          </Card>

          <Card className='bg-gradient-card shadow-card border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-accent/10'>
                  <FileText className='h-6 w-6 text-accent' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    Prescriptions
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    View active medications
                  </p>
                </div>
              </div>
              <Button
                variant='outline'
                className='w-full mt-4'
                onClick={() => navigate("/viewprescription")}
                size='sm'
              >
                View Prescriptions
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className='grid lg:grid-cols-2 gap-8 mb-8'>
          {/* AI Symptom Checker */}
          <Card className='bg-gradient-card shadow-medical border-0'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Brain className='h-6 w-6 text-primary' />
                AI Symptom Checker
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-foreground mb-2 block'>
                  Describe your symptoms
                </label>
                <Textarea
                  placeholder="Please describe what you're experiencing... (e.g., headache, fever, cough)"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className='min-h-20'
                />
              </div>

              {/* OR Divider */}
              <div className='flex items-center gap-2'>
                <div className='flex-1 h-px bg-border/50'></div>
                <span className='text-xs text-muted-foreground font-medium'>
                  OR
                </span>
                <div className='flex-1 h-px bg-border/50'></div>
              </div>

              {/* 🤖 Analyze Symptoms Button */}
              <Button
                variant='medical'
                onClick={analyzeSymptoms}
                disabled={!symptoms.trim() || isAnalyzing}
                className='w-full flex items-center gap-2'
              >
                {isAnalyzing ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent' />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className='h-4 w-4' />
                    Analyze Symptoms
                  </>
                )}
              </Button>

              {/* OR Divider */}
              <div className='flex items-center gap-2'>
                <div className='flex-1 h-px bg-border/50'></div>
                <span className='text-xs text-muted-foreground font-medium'>
                  OR
                </span>
                <div className='flex-1 h-px bg-border/50'></div>
              </div>

              {/* 📞 Make Call Button */}
              <Button
                variant='outline'
                onClick={makeCall}
                className='w-full flex items-center gap-2 bg-green-500 text-white hover:bg-green-600'
              >
                <Phone className='h-4 w-4' />
                Make a Call
              </Button>

              {/* AI Response Section */}
              {aiResponse && (
                <div className='bg-muted/50 p-4 rounded-lg border border-border/50 space-y-4'>
                  <h4 className='font-semibold text-foreground mb-2 flex items-center gap-2'>
                    <Brain className='h-4 w-4 text-primary' />
                    AI Analysis Results
                  </h4>

                  {aiResponse.map((item, idx) => (
                    <div key={idx} className='space-y-2'>
                      {/* ✅ Render Markdown properly */}
                      <div className='prose prose-sm sm:prose lg:prose-lg max-w-none text-foreground'>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {item.summary}
                        </ReactMarkdown>
                      </div>

                      {item.metadata && (
                        <div className='text-xs text-muted-foreground'>
                          {item.metadata.source && (
                            <p>
                              <strong>Source:</strong> {item.metadata.source}
                            </p>
                          )}
                          {item.metadata.timestamp && (
                            <p>
                              <strong>Timestamp:</strong>{" "}
                              {new Date(
                                item.metadata.timestamp
                              ).toLocaleString()}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Doctors */}
          <Card className='bg-gradient-card shadow-medical border-0'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Calendar className='h-6 w-6 text-primary' />
                Available Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {mockDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className='flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h4 className='font-semibold text-foreground'>
                          {doctor.name}
                        </h4>
                        <Badge
                          variant={doctor.available ? "default" : "secondary"}
                        >
                          {doctor.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {doctor.specialty}
                      </p>
                      <div className='flex items-center gap-1 mt-1'>
                        <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                        <span className='text-xs text-muted-foreground'>
                          {doctor.rating}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Button
                        variant={doctor.available ? "medical" : "outline"}
                        size='sm'
                        disabled={!doctor.available}
                        className='flex items-center gap-2'
                        onClick={() => handleJoin()}
                      >
                        <Video className='h-4 w-4' />
                        {doctor.available ? "Book" : "Unavailable"}
                      </Button>
                      {doctor.available && (
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex items-center gap-2'
                        >
                          <Phone className='h-4 w-4' />
                          Call
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Records */}
        <Card className='bg-gradient-card shadow-medical border-0'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='h-6 w-6 text-primary' />
                My Health Records
              </CardTitle>
              <Button variant='outline' size='sm'>
                Sync Records
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {mockRecords.map((record) => (
                <div
                  key={record.id}
                  className='flex items-start justify-between p-4 bg-background/50 rounded-lg border border-border/50'
                >
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='font-semibold text-foreground'>
                        {record.diagnosis}
                      </div>
                      <Badge variant='outline'>{record.type}</Badge>
                    </div>
                    <div className='text-sm text-muted-foreground mb-2'>
                      <div className='flex items-center gap-4'>
                        <span>{record.doctor}</span>
                        <span className='flex items-center gap-1'>
                          <Clock className='h-3 w-3' />
                          {record.date}
                        </span>
                      </div>
                    </div>
                    <p className='text-sm text-foreground'>{record.notes}</p>
                  </div>
                  <Button variant='ghost' size='sm'>
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          <Card className='bg-gradient-card shadow-card border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-primary/10'>
                  <Calendar className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    Book Appointment
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Schedule with a doctor
                  </p>
                </div>
              </div>
              <Button variant='outline' className='w-full mt-4'>
                Schedule Now
              </Button>
            </CardContent>
          </Card>

          <Card className='bg-gradient-card shadow-card border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-success/10'>
                  <Heart className='h-6 w-6 text-success' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    Health Tracker
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Monitor vital signs
                  </p>
                </div>
              </div>
              <Button variant='outline' className='w-full mt-4'>
                Track Health
              </Button>
            </CardContent>
          </Card>

          <Card className='bg-gradient-card shadow-card border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-accent/10'>
                  <FileText className='h-6 w-6 text-accent' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    Prescriptions
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    View active medications
                  </p>
                </div>
              </div>
              <Button variant='outline' className='w-full mt-4'>
                View Prescriptions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
