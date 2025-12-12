import { Link, useParams } from 'react-router-dom';
import { getInstrumentById, Instrument } from '@/data/instruments';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function InstrumentDetailPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [sampleName, setSampleName] = useState('')
    const [sampleWeight, setSampleWeight] = useState('')
    const [numSamples, setNumSamples] = useState('1')
    const [purpose, setPurpose] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [bookingError, setBookingError] = useState<string | null>(null)
  const { id } = useParams();

  if (!id) return <div className="container py-12">Instrument not found.</div>;

  const instrument: Instrument | undefined = getInstrumentById(id);

  if (!instrument) {
    return (
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Instrument not found</h2>
        <p className="mb-4">We couldn't find the instrument you're looking for.</p>
        <div className="flex gap-2">
          <Link to="/instruments">
            <Button variant="outline">Go Back</Button>
          </Link>
          <Link to="/instruments" className="btn btn-ghost">
            Browse Instruments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link to="/instruments" className="text-sm text-muted-foreground underline">
          ← Back to instruments
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          {instrument.image && (
            <img src={instrument.image} alt={instrument.name} className="w-full h-64 object-cover rounded-md" />
          )}
          <div className="mt-4">
            <h1 className="text-3xl font-bold">{instrument.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{instrument.category}</p>
          </div>
        </div>

        <div className="lg:col-span-2 prose">
          <h2>Overview</h2>
          <p>{instrument.summary}</p>

          {instrument.applications && (
            <>
              <h3>Applications</h3>
              <ul>
                {instrument.applications.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </>
          )}

          {instrument.specs && (
            <>
              <h3>Specifications</h3>
              <ul>
                {instrument.specs.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}

          {instrument.sampleRequirements && (
            <>
              <h3>Sample Requirements</h3>
              <p>{instrument.sampleRequirements}</p>
            </>
          )}

          {instrument.pricingNote && (
            <>
              <h3>Pricing</h3>
              <p>{instrument.pricingNote}</p>
            </>
          )}

          {instrument.contactEmail && (
            <>
              <h3>Contact</h3>
              <p>
                For booking or questions, email{' '}
                <a href={`mailto:${instrument.contactEmail}`} className="underline">
                  {instrument.contactEmail}
                </a>
              </p>
              <div className="mt-4">
                <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                  <DialogTrigger asChild>
                    <Button>Book this instrument</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Booking Request</DialogTitle>
                      <DialogDescription>Provide sample details before booking.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="sampleName">Sample Name</Label>
                        <Input id="sampleName" value={sampleName} onChange={(e) => setSampleName(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="sampleWeight">Sample Weight (g)</Label>
                        <Input id="sampleWeight" type="number" value={sampleWeight} onChange={(e) => setSampleWeight(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="numSamples">Number of Samples</Label>
                        <Input id="numSamples" type="number" value={numSamples} onChange={(e) => setNumSamples(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="purpose">Purpose</Label>
                        <Textarea id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="userEmail">Your Email</Label>
                        <Input id="userEmail" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                      </div>
                      {bookingError && <div className="text-sm text-red-600">{bookingError}</div>}
                    </div>
                    <DialogFooter>
                      <div className="flex gap-2">
                        <DialogClose asChild>
                          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => {
                          setBookingError(null)
                          if (!userEmail.trim()) return setBookingError('Your email is required')
                          const num = Number(numSamples || 0)
                          if (!Number.isFinite(num) || num <= 0) return setBookingError('Number of samples must be a positive number')
                          if (sampleWeight && (isNaN(Number(sampleWeight)) || Number(sampleWeight) < 0)) return setBookingError('Sample weight must be a non-negative number')
                          const subject = `Booking Request: ${instrument.name} (${sampleName || 'sample'})`
                          const body = `Hi,%0A%0AI would like to book the ${instrument.name}.%0A%0ASample name: ${sampleName}%0ASample weight (g): ${sampleWeight}%0ANumber of samples: ${numSamples}%0APurpose: ${purpose}%0AContact Email: ${userEmail}%0A%0AThanks,%0A${userEmail}`
                          const mailto = `mailto:${instrument.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                          // close dialog and redirect
                          setIsOpen(false)
                          window.location.href = mailto
                        }}>Send Email</Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
