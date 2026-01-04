import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin } from 'lucide-react';
import { openEmailDraft } from '@/lib/emailDraft';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactEmail = 'ats@nmu.ac.in';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = [
      'Context: General enquiry',
      '',
      `Name: ${formData.name || 'N/A'}`,
      `Email: ${formData.email || 'N/A'}`,
      `Subject: ${formData.subject || 'N/A'}`,
      'Message:',
      formData.message || 'N/A',
      '',
      'Regards,',
      formData.name || 'ATS Enquiry',
    ].join('\n');

    openEmailDraft('ats@nmu.ac.in', `ATS Enquiry – ${formData.subject || 'Contact Request'}`, body);

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We're here to help. Contact us for inquiries about our services.
          </p>
        </div>

        {/* Main Content: 40/60 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-start gap-8 mb-12">
          {/* Left Column: Contact Info & Coordinator */}
          <div className="space-y-6">
            {/* Coordinator Card */}
            <Card>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <img
                      src={`${import.meta.env.BASE_URL}coats.png`}
                      alt="Dr. Bhushan B. Chaudhari"
                      className="w-40 h-40 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Dr. Bhushan B. Chaudhari</h3>
                    <p className="text-sm text-primary font-semibold">Coordinator, Analytical Testing Services Cell</p>
                  </div>
                  <Link to="/coordinator" className="text-sm text-primary hover:underline font-medium">
                    View Profile →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <Mail className="text-primary shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Coordinator Email</h3>
                      <button
                        type="button"
                        onClick={() => openEmailDraft('ats@nmu.ac.in', 'ATS Enquiry – KBCNMU', 'Hello, I have an enquiry.\n\nThanks,')}
                        className="text-primary hover:underline text-left p-0 bg-transparent border-none"
                      >
                        {contactEmail}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
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
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <Phone className="text-primary shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href="tel:+9102572257250" className="text-primary hover:underline">
                        +91-0257-2257250
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
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
