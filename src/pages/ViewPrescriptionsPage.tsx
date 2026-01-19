import React, { useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { FileText, ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Prescription {
  id: string;
  doctor_name: string;
  patient_name: string;
  disease_name: string;
  image_url: string;
  medication?: string;
  dosage?: string;
  instructions?: string;
}

const SUPABASE_URL=import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY=import.meta.env.VITE_SUPABASE_KEY;
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const Card = ({ children }) => (
  <div className='rounded-xl border border-gray-200 bg-gradient-to-br from-white/80 to-gray-100/80 p-6 shadow-medical w-full max-w-4xl mx-auto font-sans'>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className='flex items-center gap-2 mb-4 text-2xl font-semibold text-[#001BB7]'>
    {children}
  </div>
);

const ViewPrescriptionsPage: React.FC = () => {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("prescriptions")
        .select(
          "id, doctor_name, patient_name, disease_name, medication, dosage, instructions, image_url"
        );

      if (error) {
        setError(error.message);
        console.error("Error fetching prescriptions:", error.message);
      } else if (data) {
        setPrescriptions(data as Prescription[]);
      }
      setLoading(false);
    };

    fetchPrescriptions();
  }, []);

  // ✅ Download function
  const handleDownload = async (prescription: Prescription) => {
    if (prescription.image_url) {
      // Download image file
      const response = await fetch(prescription.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prescription-${prescription.id}.png`; // default filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      // Download text file with details
      const textContent = `
Doctor: ${prescription.doctor_name}
Patient: ${prescription.patient_name}
Disease: ${prescription.disease_name}
Medication: ${prescription.medication || "N/A"}
Dosage: ${prescription.dosage || "N/A"}
Instructions: ${prescription.instructions || "N/A"}
      `;
      const blob = new Blob([textContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prescription-${prescription.id}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center p-8 font-sans'>
        <div className='flex items-center space-x-2 text-gray-700'>
          <div className='animate-spin rounded-full h-8 w-8 border-4 border-gray-400 border-t-gray-800' />
          <span>Loading prescriptions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center p-8 font-sans text-red-600'>
        Error: {error}
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-200/30 p-8 flex flex-col items-center justify-center font-sans'>
      <Card>
        {/* Header with Close Button */}
        <div className='flex items-center justify-between mb-6'>
          <CardHeader>
            <FileText className='h-8 w-8' />
            Your Prescriptions
          </CardHeader>
          <button
            onClick={() => navigate("/patient")}
            className='flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium'
          >
            <ArrowLeft className='h-5 w-5' />
            Close
          </button>
        </div>

        {prescriptions.length === 0 ? (
          <p className='text-center text-gray-500'>No prescriptions found.</p>
        ) : (
          <div className='grid gap-6'>
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className='rounded-lg border border-gray-300 p-6 bg-white shadow-sm'
              >
                <h3 className='font-semibold text-xl text-[#001BB7] mb-4 border-b pb-2'>
                  Prescription Details
                </h3>
                <div className='space-y-2 text-gray-700'>
                  <p>
                    <strong>Doctor Name:</strong> {prescription.doctor_name}
                  </p>
                  <p>
                    <strong>Patient Name:</strong> {prescription.patient_name}
                  </p>
                  <p>
                    <strong>Disease:</strong> {prescription.disease_name}
                  </p>
                  <p>
                    <strong>Medication:</strong>{" "}
                    {prescription.medication || "N/A"}
                  </p>
                  <p>
                    <strong>Dosage:</strong> {prescription.dosage || "N/A"}
                  </p>
                  <p>
                    <strong>Instructions:</strong>{" "}
                    {prescription.instructions || "N/A"}
                  </p>
                </div>
                {prescription.image_url && (
                  <div className='mt-6 text-center'>
                    <a
                      href={prescription.image_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-block'
                    >
                      <img
                        src={prescription.image_url}
                        alt={`Prescription from Dr. ${prescription.doctor_name}`}
                        className='max-w-full h-auto rounded-md border border-gray-200 shadow-sm'
                      />
                    </a>
                  </div>
                )}

                {/* ✅ Download Button */}
                <div className='mt-4 flex justify-end'>
                  <button
                    onClick={() => handleDownload(prescription)}
                    className='flex items-center gap-2 px-4 py-2 bg-[#001BB7] text-white rounded-lg shadow hover:bg-blue-800 transition'
                  >
                    <Download className='h-4 w-4' />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ViewPrescriptionsPage;
