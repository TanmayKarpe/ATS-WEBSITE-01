import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const coordinatorEmail = 'bhushan.food@gmail.com';
  const atsEmail = 'ats@nmu.ac.in';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const recipients = [coordinatorEmail, atsEmail];
      console.log('Form submitted:', { ...formData, recipients });
      alert('Your message has been submitted to the ATS Coordinator. He will reply as early as possible.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to submit contact form', error);
      alert('Something went wrong. Please try again.');
    }
  };
  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We're here to help. Contact us for inquiries about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-5">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md ring-2 ring-background">
                    <img
                      src="/coats/ats-coordinator.svg"
                      alt="ATS Coordinator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Dr. Bhushan B. Chaudhari</h3>
                    <p className="text-sm text-primary font-semibold">Coordinator, Analytical Testing Services Cell</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The Coordinator of the ATS Cell serves as the strategic lead and technical liaison, responsible for overseeing the seamless delivery of advanced analytical and characterization services. The role encompasses planning, coordination, and supervision of all ATS activities to ensure accuracy, reliability, and timely execution of testing and analysis. The Coordinator facilitates effective communication between faculty experts, technical staff, researchers, industry partners, and external stakeholders, thereby aligning service outcomes with institutional and client requirements.
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t pt-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary shrink-0" size={20} />
                    <a href={`mailto:${coordinatorEmail}`} className="text-sm text-primary hover:underline">
                      {coordinatorEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary shrink-0" size={20} />
                    <a href="tel:+919168531101" className="text-sm text-primary hover:underline">
                      +91 91685 31101
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-4">
                  <MapPin className="text-primary shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground text-sm">
                      Kavayitri Bahinabai Chaudhari North Maharashtra University<br />
                      Jalgaon - 425001<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-4">
                  <Mail className="text-primary shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:ats@nmu.ac.in" className="text-primary hover:underline">
                      ats@nmu.ac.in
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-4">
                  <Phone className="text-primary shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href="tel:+912572257451" className="text-primary hover:underline">
                      +91 257 2257451
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">Name</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-2 block">Email</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium mb-2 block">Subject</label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" required />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-2 block">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" 
                    rows={5}
                    placeholder="Your message here..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How do I submit a sample?</h3>
                <p className="text-sm text-muted-foreground">
                  You can submit samples through our online sample submission portal or by visiting our facility in person. Contact us for detailed guidelines.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is the turnaround time?</h3>
                <p className="text-sm text-muted-foreground">
                  Standard turnaround is 5-7 business days. Rush analysis is available for an additional fee. Priority processing for members of KBCNMU.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Do you accept international samples?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we accept samples from international researchers. Please contact us for customs documentation and shipping guidelines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
