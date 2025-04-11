import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Code, Users, MessageSquare, Mail, FileText, Briefcase, ChevronRight, Laptop, Heart, ExternalLink, Award } from 'lucide-react';
import { Header } from './components/shared/header';
import Footer from './components/shared/footer';
import { Hero } from './components/home/hero';
import About from './components/home/about';
import Team from './components/home/team';
import Ctas from './components/home/ctas';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
       <Header/>
      <div className='flex-1'>
      <Hero/>
       <About/>
       <Team/>
       <Ctas/>
      </div>
     <Footer/>
      </div>)

  }
