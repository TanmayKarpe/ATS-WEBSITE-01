import instrumentFesem from '@/assets/instrument-fesem.jpg';
import instrumentFtir from '@/assets/instrument-ftir.jpg';
import instrumentXrd from '@/assets/instrument-xrd.jpg';
import instrumentUvvis from '@/assets/instrument-uvvis.jpg';
import instrumentGcms from '@/assets/instrument-gcms.jpg';
import instrumentNmr from '@/assets/instrument-nmr.jpg';

export const instruments = [
  {
    name: 'FE-SEM',
    fullName: 'Field Emission Scanning Electron Microscope',
    capability: 'High-resolution surface imaging up to 1nm, EDS analysis for elemental composition',
    image: instrumentFesem,
  },
  {
    name: 'FTIR Spectrometer',
    fullName: 'Fourier Transform Infrared Spectrometer',
    capability: 'Molecular structure analysis, functional group identification, ATR & transmission modes',
    image: instrumentFtir,
  },
  {
    name: 'XRD System',
    fullName: 'X-Ray Diffractometer',
    capability: 'Crystal structure determination, phase identification, thin film analysis',
    image: instrumentXrd,
  },
  {
    name: 'UV-Vis Spectrophotometer',
    fullName: 'UV-Visible Spectrophotometer',
    capability: 'Absorption spectroscopy, concentration determination, optical bandgap analysis',
    image: instrumentUvvis,
  },
  {
    name: 'GC-MS',
    fullName: 'Gas Chromatography Mass Spectrometry',
    capability: 'Volatile compound separation & identification, purity analysis, trace detection',
    image: instrumentGcms,
  },
  {
    name: 'NMR',
    fullName: 'Nuclear Magnetic Resonance Spectrometer',
    capability: 'Molecular structure elucidation, 1H and 13C NMR, 2D experiments',
    image: instrumentNmr,
  },
];
