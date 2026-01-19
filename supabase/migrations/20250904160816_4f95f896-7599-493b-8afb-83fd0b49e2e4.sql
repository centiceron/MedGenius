-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'doctor', 'patient', 'pharmacy');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'patient',
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patients table for medical information
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  gender TEXT,
  blood_type TEXT,
  allergies TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  medical_history TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create doctors table
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  specialty TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  years_experience INTEGER,
  consultation_fee DECIMAL(10,2),
  available BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pharmacies table
CREATE TABLE public.pharmacies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pharmacy_name TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  operating_hours JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  type TEXT NOT NULL DEFAULT 'consultation',
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'in-progress')),
  notes TEXT,
  prescription TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health records table
CREATE TABLE public.health_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES auth.users(id),
  record_type TEXT NOT NULL CHECK (record_type IN ('consultation', 'lab_results', 'prescription', 'diagnosis', 'vaccination')),
  title TEXT NOT NULL,
  description TEXT,
  diagnosis TEXT,
  prescription TEXT,
  notes TEXT,
  attachments JSONB,
  record_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create medicines table
CREATE TABLE public.medicines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  generic_name TEXT,
  dosage TEXT NOT NULL,
  form TEXT NOT NULL CHECK (form IN ('tablet', 'capsule', 'syrup', 'injection', 'cream', 'drops')),
  category TEXT NOT NULL,
  description TEXT,
  side_effects TEXT[],
  contraindications TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pharmacy inventory table
CREATE TABLE public.pharmacy_inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pharmacy_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  expiry_date DATE,
  available BOOLEAN DEFAULT true,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(pharmacy_id, medicine_id)
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  instructions TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  prescribed_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacy_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for patients
CREATE POLICY "Patients can view their own data" ON public.patients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Patients can update their own data" ON public.patients FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Patients can insert their own data" ON public.patients FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Doctors can view their patients data" ON public.patients FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.appointments 
    WHERE doctor_id = auth.uid() AND patient_id = patients.user_id
  )
);

-- Create RLS policies for doctors
CREATE POLICY "Doctors can view their own profile" ON public.doctors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Doctors can update their own profile" ON public.doctors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Doctors can insert their own profile" ON public.doctors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Everyone can view doctor profiles" ON public.doctors FOR SELECT USING (true);

-- Create RLS policies for pharmacies
CREATE POLICY "Pharmacies can view their own profile" ON public.pharmacies FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Pharmacies can update their own profile" ON public.pharmacies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Pharmacies can insert their own profile" ON public.pharmacies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Everyone can view pharmacy profiles" ON public.pharmacies FOR SELECT USING (true);

-- Create RLS policies for appointments
CREATE POLICY "Users can view their own appointments" ON public.appointments FOR SELECT USING (auth.uid() = patient_id OR auth.uid() = doctor_id);
CREATE POLICY "Patients can create appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Users can update their own appointments" ON public.appointments FOR UPDATE USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

-- Create RLS policies for health records
CREATE POLICY "Patients can view their own health records" ON public.health_records FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Doctors can view their patients health records" ON public.health_records FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors can create health records" ON public.health_records FOR INSERT WITH CHECK (auth.uid() = doctor_id);
CREATE POLICY "Doctors can update health records they created" ON public.health_records FOR UPDATE USING (auth.uid() = doctor_id);

-- Create RLS policies for medicines (public read access)
CREATE POLICY "Everyone can view medicines" ON public.medicines FOR SELECT USING (true);

-- Create RLS policies for pharmacy inventory
CREATE POLICY "Pharmacies can manage their own inventory" ON public.pharmacy_inventory FOR ALL USING (auth.uid() = pharmacy_id);
CREATE POLICY "Everyone can view pharmacy inventory" ON public.pharmacy_inventory FOR SELECT USING (true);

-- Create RLS policies for prescriptions
CREATE POLICY "Patients can view their own prescriptions" ON public.prescriptions FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Doctors can view prescriptions they created" ON public.prescriptions FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors can create prescriptions" ON public.prescriptions FOR INSERT WITH CHECK (auth.uid() = doctor_id);
CREATE POLICY "Doctors can update prescriptions they created" ON public.prescriptions FOR UPDATE USING (auth.uid() = doctor_id);

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'patient'::public.user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pharmacies_updated_at BEFORE UPDATE ON public.pharmacies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_health_records_updated_at BEFORE UPDATE ON public.health_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medicines_updated_at BEFORE UPDATE ON public.medicines FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample medicines
INSERT INTO public.medicines (name, generic_name, dosage, form, category, description) VALUES
('Amoxicillin 500mg', 'Amoxicillin', '500mg', 'capsule', 'Antibiotics', 'Antibiotic used to treat bacterial infections'),
('Ibuprofen 200mg', 'Ibuprofen', '200mg', 'tablet', 'Pain Relief', 'Anti-inflammatory pain reliever'),
('Lisinopril 10mg', 'Lisinopril', '10mg', 'tablet', 'Blood Pressure', 'ACE inhibitor for high blood pressure'),
('Metformin 850mg', 'Metformin', '850mg', 'tablet', 'Diabetes', 'Medication for type 2 diabetes'),
('Omeprazole 20mg', 'Omeprazole', '20mg', 'capsule', 'Gastric', 'Proton pump inhibitor for acid reflux'),
('Aspirin 100mg', 'Aspirin', '100mg', 'tablet', 'Cardiovascular', 'Blood thinner and pain reliever'),
('Vitamin D3 1000IU', 'Cholecalciferol', '1000IU', 'tablet', 'Vitamins', 'Vitamin D supplement'),
('Insulin Pen', 'Human Insulin', '100U/mL', 'injection', 'Diabetes', 'Fast-acting insulin for diabetes management');