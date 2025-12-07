import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing & Tariffs</h1>
          <p className="text-xl text-muted-foreground">
            Competitive rates for academic research, industry, and collaborative projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Academic Users</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Special subsidized rates for university researchers and students</p>
              <ul className="space-y-2 text-sm">
                <li>• FE-SEM: Starting from ₹500/hr</li>
                <li>• XRD: Starting from ₹400/hr</li>
                <li>• FTIR: Starting from ₹300/hr</li>
                <li>• UV-Vis: Starting from ₹200/hr</li>
              </ul>
              <Button className="w-full mt-4">Get Detailed Tariff</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industry & R&D</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Professional rates with priority processing</p>
              <ul className="space-y-2 text-sm">
                <li>• FE-SEM: ₹1500/hr</li>
                <li>• XRD: ₹1200/hr</li>
                <li>• FTIR: ₹900/hr</li>
                <li>• UV-Vis: ₹600/hr</li>
              </ul>
              <Button className="w-full mt-4">Request Quote</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk & Packages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Custom pricing for large sample batches</p>
              <ul className="space-y-2 text-sm">
                <li>• Volume discounts available</li>
                <li>• Custom package pricing</li>
                <li>• Flexible billing options</li>
                <li>• Priority turnaround</li>
              </ul>
              <Button className="w-full mt-4">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Sample Preparation</h3>
              <p className="text-sm text-muted-foreground">Professional sample preparation for all analysis types</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Interpretation</h3>
              <p className="text-sm text-muted-foreground">Expert consultation on results and methodology</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Sessions</h3>
              <p className="text-sm text-muted-foreground">Hands-on training workshops on instrumentation</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Report Generation</h3>
              <p className="text-sm text-muted-foreground">Detailed analysis reports with statistical data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
