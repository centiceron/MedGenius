import React from "react";
import {
  VideoIcon,
  FileText,
  MapPin,
  Brain,
  Calendar,
  Shield,
  Clock,
  Users,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import healthcareHero from "@/assets/healthcare-hero.jpg";
import videoConsultationIcon from "@/assets/video-consultation-icon.jpg";
import healthRecordsIcon from "@/assets/health-records-icon.jpg";
import pharmacyIcon from "@/assets/pharmacy-icon.jpg";

const features = [
  {
    icon: VideoIcon,
    title: "Video Consultations",
    description:
      "Connect with healthcare professionals through secure WebRTC-based video calls",
    image: videoConsultationIcon,
    stats: "24/7 Available",
  },
  {
    icon: FileText,
    title: "Health Records",
    description:
      "Access and manage your medical records offline with automatic synchronization",
    image: healthRecordsIcon,
    stats: "Secure & Private",
  },
  {
    icon: MapPin,
    title: "Pharmacy Network",
    description:
      "Real-time medicine availability and location tracking for nearby pharmacies",
    image: pharmacyIcon,
    stats: "500+ Partners",
  },
  {
    icon: Brain,
    title: "AI Symptom Checker",
    description:
      "Get preliminary health insights with our lightweight AI diagnostic assistant",
    image: null,
    stats: "95% Accuracy",
  },
];

const stats = [
  { icon: Users, label: "Patients Served", value: "10,000+" },
  { icon: Shield, label: "Security Rating", value: "A+" },
  { icon: Clock, label: "Response Time", value: "<5min" },
  { icon: Calendar, label: "Uptime", value: "99.9%" },
];

const Index = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-accent-light/20 to-background'>
      <Header />

      {/* Hero Section */}
      <section className='relative py-20 px-4'>
        <div className='container max-w-screen-xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <h1 className='text-4xl lg:text-6xl font-bold leading-tight'>
                  <span className='text-foreground'>Your Health,</span>
                  <br />
                  <span className='bg-gradient-hero bg-clip-text text-transparent'>
                    Our Priority
                  </span>
                </h1>
                <p className='text-xl text-muted-foreground max-w-lg'>
                  Access quality healthcare from anywhere. Connect with doctors,
                  manage records, and find medicines - all in one secure
                  platform.
                </p>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8'>
                {stats.map((stat) => (
                  <div key={stat.label} className='text-center'>
                    <div className='flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-gradient-primary rounded-lg shadow-soft'>
                      <stat.icon className='h-6 w-6 text-white' />
                    </div>
                    <div className='font-bold text-lg text-foreground'>
                      {stat.value}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='relative'>
              <div className='relative rounded-2xl overflow-hidden shadow-medical'>
                <img
                  src={healthcareHero}
                  alt='Healthcare professionals using technology'
                  className='w-full h-[600px] object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent' />
              </div>

              {/* Floating Cards */}
              <Card className='absolute -bottom-4 -left-4 w-48 bg-gradient-card shadow-medical border-0'>
                <CardContent className='p-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-3 h-3 bg-success rounded-full animate-pulse' />
                    <div>
                      <div className='font-semibold text-sm'>
                        24/7 Available
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        Emergency Support
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='absolute -top-4 -right-4 w-40 bg-gradient-card shadow-medical border-0'>
                <CardContent className='p-4'>
                  <div className='text-center'>
                    <div className='font-bold text-primary text-lg'>99.9%</div>
                    <div className='text-xs text-muted-foreground'>
                      Uptime Guarantee
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-4 bg-muted/30'>
        <div className='container max-w-screen-xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4'>
              Comprehensive Healthcare Solutions
            </h2>
            <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
              Experience modern healthcare with our integrated platform designed
              for patients, doctors, and healthcare providers.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='group hover:shadow-medical transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0'
              >
                <CardContent className='p-6'>
                  {feature.image ? (
                    <div className='relative mb-4 rounded-lg overflow-hidden'>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className='w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute inset-0 bg-primary/10' />
                    </div>
                  ) : (
                    <div className='flex items-center justify-center w-16 h-16 mb-4 bg-gradient-secondary rounded-lg shadow-soft'>
                      <feature.icon className='h-8 w-8 text-white' />
                    </div>
                  )}

                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-semibold text-lg text-foreground'>
                        {feature.title}
                      </h3>
                      <span className='text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full font-medium'>
                        {feature.stats}
                      </span>
                    </div>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4'>
        <div className='container max-w-screen-xl mx-auto'>
          <Card className='bg-gradient-hero text-center p-12 shadow-medical border-0'>
            <CardContent className='space-y-8'>
              <div className='space-y-4'>
                <h2 className='text-3xl lg:text-4xl font-bold text-white'>
                  Ready to Transform Your Healthcare Experience?
                </h2>
                <p className='text-xl text-white/90 max-w-2xl mx-auto'>
                  Join thousands of users who trust our platform for their
                  healthcare needs. Get started today and experience the future
                  of medicine.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button
                  variant='secondary'
                  size='xl'
                  className='bg-white text-primary hover:bg-white/90'
                >
                  Get Started Free
                </Button>
                <Button
                  variant='outline'
                  size='xl'
                  className='border-white text-white hover:bg-white/10'
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-foreground text-white py-12 px-4'>
        <div className='container max-w-screen-xl mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg'>
                  <Heart className='h-6 w-6 text-white' />
                </div>
                <span className='text-xl font-bold'>HealthCare+</span>
              </div>
              <p className='text-white/70'>
                Transforming healthcare through technology, making quality
                medical care accessible to everyone.
              </p>
            </div>

            <div className='space-y-4'>
              <h4 className='font-semibold text-lg'>Quick Links</h4>
              <ul className='space-y-2 text-white/70'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Services
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h4 className='font-semibold text-lg'>Support</h4>
              <ul className='space-y-2 text-white/70'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Documentation
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h4 className='font-semibold text-lg'>Emergency Contacts</h4>
              <ul className='space-y-2 text-white/70'>
                <li>Emergency: 911</li>
                <li>Support: 1-800-HEALTH</li>
                <li>Crisis Line: 988</li>
                <li>Poison Control: 1-800-222-1222</li>
              </ul>
            </div>
          </div>

          <div className='border-t border-white/20 mt-8 pt-8 text-center text-white/70'>
            <p>
              &copy; 2024 HealthCare+. All rights reserved. | Made with ❤️ for
              better healthcare
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
