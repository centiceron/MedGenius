import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Send, ArrowLeft, Upload } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// --- Types ---
interface ComponentProps {
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps extends ComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "outline";
  type?: "button" | "submit" | "reset";
}

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
}

// --- Supabase Config ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL2 || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY2 || "";

// Only initialize if URL exists to prevent crash
const supabase = SUPABASE_URL
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// --- Sub-Components ---
const Card = ({ children, className = "" }: ComponentProps) => (
  <div
    className={`rounded-xl border border-gray-200 bg-gradient-to-br from-white/80 to-gray-100/80 p-6 shadow-md w-full max-w-2xl mx-auto font-sans ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className='flex items-center gap-2 mb-4 text-2xl font-semibold text-[#001BB7]'>
    {children}
  </div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  type = "button",
  className = "",
}: ButtonProps) => {
  const baseClasses =
    "rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#001BB7] focus:ring-offset-2 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#001BB7] text-white hover:bg-[#001BB7]/90 px-4 py-2",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) => (
  <div className='w-full'>
    <label className='text-sm font-medium text-gray-800 mb-1 block'>
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#001BB7]'
    />
  </div>
);

const Textarea = ({ label, placeholder, value, onChange }: InputProps) => (
  <div className='w-full'>
    <label className='text-sm font-medium text-gray-800 mb-1 block'>
      {label}
    </label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={4}
      className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#001BB7]'
    />
  </div>
);

// --- Main Component ---
const Prescription = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const signIn = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) console.error("Error signing in:", error.message);
      else setUser(data.user);
    };
    signIn();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !user) {
      setMessage("Connection error or signing in...");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      let imageUrl = null;
      if (uploadedFile) {
        const fileExtension = uploadedFile.name.split(".").pop();
        const filePath = `${user.id}/${Date.now()}.${fileExtension}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("prescriptions")
          .upload(filePath, uploadedFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("prescriptions")
          .getPublicUrl(uploadData.path);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase.from("prescriptions").insert([
        {
          patient_name: patientName,
          doctor_name: doctorName,
          disease_name: diseaseName,
          medication,
          dosage,
          instructions,
          image_url: imageUrl,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      setMessage("Prescription submitted successfully!");
      // Reset logic
      setPatientName("");
      setDoctorName("");
      setDiseaseName("");
      setMedication("");
      setDosage("");
      setInstructions("");
      setUploadedFile(null);
    } catch (error: any) {
      console.error("Error submitting prescription:", error.message);
      setMessage("Failed to submit prescription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showForm) {
    return (
      <div className='min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center'>
        <Card>
          <CardHeader>
            <FileText /> Write Prescription
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Input
                label="Doctor's Name"
                placeholder='Dr. Smith'
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
              <Input
                label='Patient Name'
                placeholder='Jane Doe'
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
              <Input
                label='Disease Name'
                placeholder='Seasonal Allergies'
                value={diseaseName}
                onChange={(e) => setDiseaseName(e.target.value)}
              />
              <Input
                label='Medication'
                placeholder='Amoxicillin'
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
              />
              <Input
                label='Dosage'
                placeholder='500 mg'
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
              <Textarea
                label='Instructions'
                placeholder='Take with food'
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />

              <div>
                <label
                  htmlFor='file-upload'
                  className='flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50'
                >
                  <Upload className='h-6 w-6 text-[#001BB7]' />
                  <span className='text-sm mt-2'>
                    {uploadedFile ? uploadedFile.name : "Click to upload image"}
                  </span>
                </label>
                <input
                  id='file-upload'
                  type='file'
                  onChange={handleFileChange}
                  className='sr-only'
                />
              </div>

              <div className='flex gap-4'>
                <Button
                  type='submit'
                  disabled={isSubmitting || !patientName || !diseaseName}
                >
                  {isSubmitting ? "Saving..." : "Save Prescription"}
                </Button>
                <Button variant='outline' onClick={() => setShowForm(false)}>
                  Back
                </Button>
              </div>
            </form>
            {message && (
              <div className='mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg'>
                {message}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-8'>
      <Card className='text-center'>
        <CardContent>
          <p className='text-gray-500 mb-6'>
            Manage your patient prescriptions efficiently.
          </p>
          <div className='flex flex-col gap-3'>
            <Button onClick={() => setShowForm(true)}>
              <FileText /> Start New Prescription
            </Button>
            <Button variant='outline' onClick={() => navigate("/doctor")}>
              <ArrowLeft /> Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Prescription;
