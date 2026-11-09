import type { NavItem, Project, Service, Testimonial } from '../types'
import { asset } from '../lib/utils'

export const navItems: NavItem[] = [
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Studio', href: '#studio', section: 'studio' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

export const projects: Project[] = [
  {
    id: 'casa-alba',
    index: '01',
    title: 'Casa Alba',
    location: 'Cotswolds, England',
    category: 'Private Residence',
    year: '2025',
    image: asset('/images/project-casa-alba.webp'),
    alt: 'A calm living room with a cream sofa, pale marble and a wall of glass opening onto an English garden',
    layout: 'feature',
    summary:
      'A stone house reimagined around its garden, where pale marble, lime plaster and low evening light set the pace.',
    story: [
      'Casa Alba began with a simple question: how should a house feel at six o’clock in the evening? The answer shaped every decision that followed. Working with the existing stone shell, we opened the ground floor to the garden and allowed the architecture to recede.',
      'A quiet palette of honed marble, lime plaster and oak runs throughout, punctuated by a small collection of mid-century pieces and commissioned works. Nothing competes. The result is a home that feels at once grounded and weightless.',
    ],
    scope: ['Interior architecture', 'Bespoke joinery', 'Furniture & objects', 'Lighting design'],
    area: '340 m²',
  },
  {
    id: 'maison-verre',
    index: '02',
    title: 'Maison Verre',
    location: 'Paris, France',
    category: 'Private Residence',
    year: '2024',
    image: asset('/images/project-maison-verre.webp'),
    alt: 'Double-height Parisian living room with sheer linen curtains and a pale stone floor',
    layout: 'offset',
    summary:
      'A double-height apartment in the 7th, softened with linen, limestone and a considered play of filtered light.',
    story: [
      'The apartment arrived with extraordinary bones and very little softness. Our task was to temper its scale without diminishing it. Sheer linen curtains now run the full height of the glazing, turning daylight into something gentler.',
      'Limestone floors, a sculptural plaster fireplace and a restrained collection of French and Scandinavian furniture create a sequence of rooms that feel intimate even when the city is bright outside.',
    ],
    scope: ['Interior architecture', 'Window treatments', 'Furniture curation', 'Art advisory'],
    area: '265 m²',
  },
  {
    id: 'the-marlowe',
    index: '03',
    title: 'The Marlowe',
    location: 'Mayfair, London',
    category: "Members' Club",
    year: '2025',
    image: asset('/images/project-marlowe.webp'),
    alt: 'A dramatic dark staircase lit by a single line of warm light',
    layout: 'wide',
    summary:
      'A members’ club in Mayfair, composed in shadow, bronze and warm light. The city recedes at the threshold.',
    story: [
      'The Marlowe occupies three floors of a Grade II listed townhouse. Rather than brighten every corner, we leaned into the building’s natural chiaroscuro. Dark walnut, aged bronze and smoked glass give the public rooms a sense of occasion.',
      'A single illuminated handrail draws guests from the street to the upper floors — a quiet piece of theatre that has become the club’s signature. Every intervention is reversible, in respect of the building’s history.',
    ],
    scope: ['Interior architecture', 'Lighting design', 'Bespoke furniture', 'Heritage coordination'],
    area: '620 m²',
  },
  {
    id: 'kiln-house',
    index: '04',
    title: 'Kiln House',
    location: 'Kyoto, Japan',
    category: 'Private Retreat',
    year: '2023',
    image: asset('/images/project-kiln.webp'),
    alt: 'A serene tea room with a low wooden table, woven floor cushions and a circular window',
    layout: 'landscape',
    summary:
      'A private retreat on the edge of Kyoto, honouring the Japanese tea room and the beauty of things left unfinished.',
    story: [
      'Our clients asked for a place to slow down. Kiln House is arranged around a single tea room, its circular window framing a maple and the changing seasons beyond.',
      'We worked with local craftspeople on the hinoki joinery, washi screens and earthen walls. Furniture is intentionally sparse: a low table, woven cushions, a single vessel. The house asks very little of those who enter, and gives a great deal in return.',
    ],
    scope: ['Interior architecture', 'Local craft collaboration', 'Tea room design', 'Landscape liaison'],
    area: '180 m²',
  },
]

export const services: Service[] = [
  {
    id: 'interior-architecture',
    index: '01',
    title: 'Interior Architecture',
    description:
      'Spatial planning, joinery and the quiet choreography of a home — resolved from the inside out.',
    deliverables: ['Spatial concepts', 'Technical drawings', 'Bespoke joinery', 'Material palettes'],
  },
  {
    id: 'residential-design',
    index: '02',
    title: 'Residential Design',
    description:
      'Complete interiors for private clients, from the first conversation to the final placement of a chair.',
    deliverables: ['Furniture & lighting', 'Procurement', 'Art curation', 'Final styling'],
  },
  {
    id: 'commercial-spaces',
    index: '03',
    title: 'Commercial Spaces',
    description:
      'Members’ clubs, boutique hotels and restaurants with an unmistakable sense of place — and a calm commercial logic.',
    deliverables: ['Concept & narrative', 'Guest journey', 'FF&E design', 'Site oversight'],
  },
  {
    id: 'consultation',
    index: '04',
    title: 'Full-Service Consultation',
    description:
      'A considered partnership for architects, developers and clients who value a second, exacting point of view.',
    deliverables: ['Design reviews', 'Feasibility', 'Material strategy', 'Creative direction'],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'whitfield',
    quote:
      'Aurel did not decorate our house. They understood how we wanted to live, and built the rooms around that understanding.',
    name: 'Eleanor & James Whitfield',
    project: 'Casa Alba',
    location: 'Cotswolds',
    year: '2025',
    image: asset('/images/project-casa-alba.webp'),
    imageAlt: 'The living room at Casa Alba in the late afternoon',
  },
  {
    id: 'laurent',
    quote:
      'There is a calmness to their work that you feel the moment you walk in. Nothing shouts. Everything belongs.',
    name: 'Camille Laurent',
    project: 'Maison Verre',
    location: 'Paris',
    year: '2024',
    image: asset('/images/project-maison-verre.webp'),
    imageAlt: 'Sheer curtains and limestone in the double-height salon at Maison Verre',
  },
  {
    id: 'marchetti',
    quote:
      'They held the vision, the budget and a hundred small decisions with the same care. We simply arrived and opened the doors.',
    name: 'Hugo Marchetti',
    project: 'The Marlowe',
    location: 'London',
    year: '2025',
    image: asset('/images/project-marlowe.webp'),
    imageAlt: 'The illuminated staircase at The Marlowe members’ club',
  },
]
