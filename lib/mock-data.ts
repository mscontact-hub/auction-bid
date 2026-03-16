import { Vehicle, Bid } from '../store/useAuctionStore';

export const MOCK_AUCTIONS: Vehicle[] = [
  {
    id: '1',
    slug: '1994-toyota-supra-turbo',
    make: 'Toyota',
    model: 'Supra Turbo',
    year: 1994,
    currentBid: 85000,
    reservePrice: 90000,
    reserveMet: false,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days
    image: 'https://picsum.photos/seed/supra/800/600',
    images: [
      'https://picsum.photos/seed/supra1/800/600',
      'https://picsum.photos/seed/supra2/800/600',
      'https://picsum.photos/seed/supra3/800/600',
      'https://picsum.photos/seed/supra4/800/600',
    ],
    bidsCount: 14,
    region: 'California, USA',
    seller: 'JDM_Collector',
    description: 'A pristine 1994 Toyota Supra Turbo with only 45,000 miles. Original paint, unmodified engine, and clean title.',
  },
  {
    id: '2',
    slug: '2021-porsche-911-gt3',
    make: 'Porsche',
    model: '911 GT3',
    year: 2021,
    currentBid: 195000,
    reservePrice: 180000,
    reserveMet: true,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), // 5 hours
    image: 'https://picsum.photos/seed/porsche/800/600',
    images: [
      'https://picsum.photos/seed/porsche1/800/600',
      'https://picsum.photos/seed/porsche2/800/600',
    ],
    bidsCount: 28,
    region: 'Stuttgart, Germany',
    seller: 'PorscheCenter',
    description: 'Shark Blue 2021 Porsche 911 GT3. Track-ready, ceramic brakes, and carbon fiber bucket seats.',
  },
  {
    id: '3',
    slug: '1967-ford-mustang-fastback',
    make: 'Ford',
    model: 'Mustang Fastback',
    year: 1967,
    currentBid: 42000,
    reservePrice: 50000,
    reserveMet: false,
    endTime: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 mins
    image: 'https://picsum.photos/seed/mustang/800/600',
    images: [
      'https://picsum.photos/seed/mustang1/800/600',
      'https://picsum.photos/seed/mustang2/800/600',
    ],
    bidsCount: 9,
    region: 'Texas, USA',
    seller: 'ClassicRestos',
    description: 'Beautifully restored 1967 Mustang Fastback. 289 V8, automatic transmission, and stunning red interior.',
  }
];

export const MOCK_BIDS: Record<string, Bid[]> = {
  '1': [
    { id: 'b1', auctionId: '1', bidderName: 'SpeedyG', amount: 85000, timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    { id: 'b2', auctionId: '1', bidderName: 'CarLover', amount: 84500, timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  ],
  '2': [
    { id: 'b3', auctionId: '2', bidderName: 'TrackKing', amount: 195000, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 'b4', auctionId: '2', bidderName: 'Flat6Fan', amount: 194000, timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  ],
  '3': [
    { id: 'b5', auctionId: '3', bidderName: 'MuscleMan', amount: 42000, timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
  ]
};
