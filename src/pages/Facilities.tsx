export default function FacilitiesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Facilities</h1>
        <p className="text-lg text-muted-foreground mb-8">
          SAIF at KBCNMU Jalgaon is equipped with world-class analytical instrumentation, providing state-of-the-art facilities for research and industrial analysis.
        </p>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">Advanced Instrumentation</h2>
            <p className="text-muted-foreground">
              Our facility houses a comprehensive suite of analytical instruments including scanning electron microscopy, X-ray diffraction, spectroscopy systems, and more. Each instrument is maintained to the highest standards by trained technical staff.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Technical Support</h2>
            <p className="text-muted-foreground">
              Our experienced team of scientists and technical staff provide expert guidance on sample preparation, methodology, data interpretation, and troubleshooting to ensure successful analysis and meaningful results.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Sample Preparation Labs</h2>
            <p className="text-muted-foreground">
              Complete sample preparation facilities are available, including areas for grinding, mixing, dissolution, and other pre-analysis treatments required for different types of samples.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Training Programs</h2>
            <p className="text-muted-foreground">
              Regular hands-on training workshops and seminars are conducted to help users understand instrument operation, best practices, and advanced techniques for optimal results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
