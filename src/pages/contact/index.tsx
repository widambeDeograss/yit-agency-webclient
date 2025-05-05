import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram,
  Link as LinkIcon,
  Calendar,
  Users
} from "lucide-react"
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"
import { BlobBackground } from "@/components/shared/blob-bg"
import qr from "@/assets/yit-qr.png"
import { useNavigate } from "react-router-dom"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const navigate = useNavigate();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const faqs = [
    {
      question: "How can I join YIT Agency?",
      answer: "You can join by scanning the QR code on our website, visiting our registration link at https://shorturl.at/iR9A5, or filling out the registration form on our website."
    },
    {
      question: "Are your programs only for university students?",
      answer: "No, our programs are designed for all young people interested in technology, both inside and outside universities."
    },
    {
      question: "Do I need previous tech experience to join?",
      answer: "Not at all! We welcome members with all levels of experience, from beginners to advanced."
    },
    {
      question: "Is there a membership fee?",
      answer: "Most of our community activities are free. Some specialized workshops or bootcamps may have a nominal fee to cover resources."
    },
    {
      question: "How can my organization partner with YIT Agency?",
      answer: "We welcome partnerships with businesses, educational institutions, and NGOs. Please contact our CEO directly via email to discuss collaboration opportunities."
    }
  ];

  return (
    <div className="relative overflow-hidden">
      <BlobBackground />
      
      {/* Hero Section */}
      <section className="pt-16 pb-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-2">
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Get in <span className="text-primary">Touch</span> With Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or want to join our community? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Mail className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Email Us</CardTitle>
                  <CardDescription>We'll respond within 24 hours</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <a href="mailto:contactyit@yit-agency.com" className="text-primary hover:underline">
                  contactyit@yit-agency.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Phone className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Call Us</CardTitle>
                  <CardDescription>Mon-Fri, 9am-5pm EAT</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <a href="tel:+255624964962" className="text-primary hover:underline">
                  +255 624 964 962
                </a>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <MapPin className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Visit Us</CardTitle>
                  <CardDescription>Our location in Tanzania</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kinondoni district, Dar es Salaam, Tanzania
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form and Social Media */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="What is this regarding?" 
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="How can we help you?" 
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Connect With Us */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
              
              {/* Registration Card */}
              <Card className="bg-card border border-border shadow-lg mb-8">
                <CardHeader>
                  <CardTitle>Join us on Social Media</CardTitle>
                  <CardDescription>
                    Become part of Tanzania's fastest-growing tech community with 5,000+ members
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <img 
                      src={qr} 
                      alt="QR Code" 
                      className="w-40 h-40"
                    />
                  </div>
                  <p className="text-center text-lg font-medium mb-2">SCAN ME</p>

                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    window.open("https://shorturl.at/iR9A5", "_blank");
                  }
                }
                  >
                     <LinkIcon className="h-4 w-4 mr-1" /> Join us now
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Follow Us</h3>
                <a 
                  href="https://www.instagram.com/youth_in_technology" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Instagram className="h-6 w-6 text-primary" />
                  <span>@Youth in technology</span>
                </a>
                <a 
                  href="https://linktr.ee/youthintechtz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <LinkIcon className="h-6 w-6 text-primary" />
                  <span>linktr.ee/youthintechtz</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {/* <section className="py-16 bg-primary/5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground">
              Join us for our upcoming workshops and events to enhance your tech skills.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="bg-card border border-border shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Next Workshop: AI Fundamentals</CardTitle>
                <CardDescription>Join us for this exciting opportunity to learn about AI!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
                    <Calendar className="h-4 w-4 inline mr-1" /> April 20, 2025
                  </div>
                  <div className="bg-muted px-4 py-2 rounded-full text-muted-foreground font-medium">
                    <Users className="h-4 w-4 inline mr-1" /> 50 spots remaining
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold">Topics Covered:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Web Development', 'UI/UX Design', 'Machine Learning'].map((topic, index) => (
                      <div key={index} className="flex items-center p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                        <div>{topic}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Secure Your Spot
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section> */}

      {/* FAQs */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about YIT Agency and our programs.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Tech Journey?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join YIT Agency today and take your first step toward a successful career in technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
              Join Our Community
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Learn more <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}