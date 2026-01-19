import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Core pages
import Index from "./pages/Index";
import AdminPage from "./pages/AdminPage";
import DoctorPage from "./pages/DoctorPage";
import PatientPage from "./pages/PatientPage";
import PharmacyPage from "./pages/PharmacyPage";
import NotFound from "./pages/NotFound";

// ✅ Extra pages from both versions
import Home from "./pages/Home";
import Videoroom from "./pages/Videoroom";
import Prescription from "./pages/Prescription";
import ViewPrescriptionsPage from "./pages/ViewPrescriptionsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Core routes */}
          <Route path='/' element={<Index />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/doctor' element={<DoctorPage />} />
          <Route path='/patient' element={<PatientPage />} />
          <Route path='/pharmacy' element={<PharmacyPage />} />

          {/* ✅ Routes from App.jsx */}
          <Route path='/home' element={<Home />} />
          <Route path='/room/:roomID' element={<Videoroom />} />

          {/* ✅ Routes from latest App.tsx */}
          <Route path='/prescription' element={<Prescription />} />
          <Route path='/viewprescription' element={<ViewPrescriptionsPage />} />

          {/* Catch-all 404 */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
