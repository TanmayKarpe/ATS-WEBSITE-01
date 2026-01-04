import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Instrument } from '@/data/instruments';

type Props = {
  instrument: Instrument;
};

export function InstrumentCard({ instrument }: Props) {
  const SUPABASE_PUBLIC_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public`;
  const imageUrl = instrument.image_filenames
    ? `${SUPABASE_PUBLIC_URL}/instrument_raw/${encodeURIComponent(instrument.image_filenames)}`
    : `/placeholder.svg`;

  console.log(instrument.name, instrument.image_filenames);

  return (
    <Card className="group h-full overflow-hidden border border-muted bg-card shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex flex-col h-full">
        <div className="px-4 pt-4">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
            {instrument.name}
          </span>
        </div>

        <div className="relative mt-3 px-4">
          <div className="relative overflow-hidden rounded-lg bg-muted" style={{ height: '220px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={instrument.name}
              className="h-full w-full object-cover object-center filter saturate-[0.92] contrast-[0.98] blur-[0.2px]"
              onError={(e) => {
                e.currentTarget.src = `/placeholder.svg`;
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col pt-6 gap-4">
          <h3 className="font-bold text-lg text-foreground leading-tight">{instrument.name}</h3>
          <div className="mt-auto">
            <Link to={`/instruments/${instrument.id}`} className="block w-full">
              <Button className="w-full" variant="default">View details</Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default InstrumentCard;
