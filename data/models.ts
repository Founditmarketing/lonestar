import { ShedModel } from '../types';

export const MODELS: ShedModel[] = [
  {
    id: '1',
    name: 'Painted Lofted Barn',
    description: 'The classic storage powerhouse. Features a gambrel roof that provides maximum overhead storage. Dual lofts included standard.',
    features: ['Painted LP SmartSide', 'Dual Lofts', 'Double Barn Doors'],
    startPrice: 3850,
    imageUrl: '/images/real/scraped-10.png',
    configKey: 'lofted_barn',
    specs: [
      { label: 'Wall Height', value: '6\' 3" Standard' },
      { label: 'Flooring', value: '5/8" Tongue & Groove' },
      { label: 'Stud Spacing', value: '16" On-Center' },
      { label: 'Loft Space', value: 'Two 4ft Lofts' },
      { label: 'Warranty', value: '50-Year Siding' },
      { label: 'Door Opening', value: '70" Wide Double' }
    ]
  },
  {
    id: '2',
    name: 'Side Utility / Deluxe',
    description: 'Built for durability and ease of access. Features fire-resistant Hardie Plank siding, side-entry double doors, and two 2x3 windows.',
    features: ['Hardie Plank Siding', '2x3 Windows Included', 'Side Entry'],
    startPrice: 4200,
    imageUrl: '/images/real/scraped-32.jpeg',
    configKey: 'utility_side',
    specs: [
      { label: 'Wall Height', value: '7\' 8" Extra Height' },
      { label: 'Siding', value: 'Cement Board (Hardie)' },
      { label: 'Windows', value: '2x3 Screened (x2)' },
      { label: 'Overhang', value: '4" Eaves' },
      { label: 'Roof Pitch', value: '4/12 Gable' },
      { label: 'Ventilation', value: 'Gable Vents' }
    ]
  },
  {
    id: '3',
    name: 'Lofted Garage',
    description: 'The ultimate workshop. Reinforced floors (12" on-center), heavy-duty roll-up door, solid walk-in door, and one 2x3 window.',
    features: ['Roll-Up Garage Door', 'Reinforced Floor', 'Overhead Lofts'],
    startPrice: 6800,
    imageUrl: '/images/real/scraped-63.jpeg',
    configKey: 'garage_lofted',
    specs: [
      { label: 'Floor Joists', value: '12" On-Center Treated' },
      { label: 'Garage Door', value: '9\' x 7\' Roll-Up' },
      { label: 'Walk-in Door', value: '36" Solid Steel' },
      { label: 'Loft', value: 'Heavy Duty Storage' },
      { label: 'Weight Rating', value: 'Vehicular Traffic' },
      { label: 'Threshold', value: 'Diamond Plate' }
    ]
  },
  {
    id: '4',
    name: 'Lofted Cabin',
    description: 'Perfect for a weekend getaway or office. Includes a 4ft or 6ft porch with railing, 3 windows, and a 9-lite entry door.',
    features: ['Front Porch', '3x Windows', 'Cathedral Ceiling'],
    startPrice: 5400,
    imageUrl: '/images/real/scraped-52.jpeg',
    configKey: 'cabin_lofted',
    specs: [
      { label: 'Porch Depth', value: '4ft or 6ft' },
      { label: 'Door', value: '36" 9-Lite Steel' },
      { label: 'Windows', value: '3 Included' },
      { label: 'Loft', value: 'Front & Back Lofts' },
      { label: 'Siding', value: 'LP SmartSide or Hardie' },
      { label: 'Usage', value: 'Office / Guest House' }
    ]
  },
  {
    id: '5',
    name: 'Utility Cabin',
    description: 'A practical, attractive option for an office or studio. Features a gable roof profile with a cozy 4ft front porch.',
    features: ['Front Porch', 'Gable Roof', 'High Sidewalls'],
    startPrice: 5100,
    imageUrl: '/images/real/scraped-19.jpeg',
    configKey: 'cabin_utility',
    specs: [
      { label: 'Porch', value: '4ft Standard' },
      { label: 'Wall Height', value: '7\' 8" Walls' },
      { label: 'Windows', value: '3 Included' },
      { label: 'Door', value: '9-Lite Residential' },
      { label: 'Vents', value: 'Gable Ventilation' },
      { label: 'Usage', value: 'Home Office' }
    ]
  },
  {
    id: '6',
    name: 'Low Wall Barn',
    description: 'Our most economical solution. The classic barn shape in a compact form. Perfect for lawn mowers and garden tools.',
    features: ['Budget Friendly', 'Classic Barn Look', 'Double Doors'],
    startPrice: 2950,
    imageUrl: '/images/real/scraped-4.png',
    configKey: 'low_wall_barn',
    specs: [
      { label: 'Wall Height', value: '4ft Side Walls' },
      { label: 'Peak Height', value: 'Approx 9ft' },
      { label: 'Siding', value: 'Painted LP SmartSide' },
      { label: 'Flooring', value: '5/8" Tongue & Groove' },
      { label: 'Warranty', value: '50-Year Siding' },
      { label: 'Value', value: 'Lowest Price / SqFt' }
    ]
  },
  {
    id: '7',
    name: 'Standard Utility',
    description: 'A versatile A-frame gable roof design. Tall walls allow for shelving and tall equipment. Simple, clean, and functional.',
    features: ['End Entry', 'Gable Roof', 'High Walls'],
    startPrice: 3100,
    imageUrl: '/images/real/scraped-65.jpeg',
    configKey: 'utility_standard',
    specs: [
      { label: 'Wall Height', value: '7\' 8" Walls' },
      { label: 'Roof Style', value: 'Gable' },
      { label: 'Door', value: 'Double Barn Door (End)' },
      { label: 'Siding', value: 'Painted or Metal' },
      { label: 'Vents', value: 'Gable Ventilation' },
      { label: 'Studs', value: '16" On-Center' }
    ]
  }
];