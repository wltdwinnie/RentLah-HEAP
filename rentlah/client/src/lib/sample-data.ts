import { Listing } from "./definition";

export const sampleListings: Listing[] = [
  {
    id: "listing-001",
    address: {
      blk: 123,
      street: "Serangoon Avenue 3",
      postalCode: "550123",
      floor: 8,
      unit: 123,
    },
    description:
      "Spacious 3-bedroom HDB flat in the heart of Serangoon, perfect for families. Features a bright and airy layout with a dedicated study room and balcony. Conveniently located just 5 minutes walk to Serangoon MRT and NEX Mall. Recently renovated with modern furnishings and excellent natural lighting throughout.",
    aptType: "3-bedroom",
    propertyType: "HDB",
    roomConfig: {
      bedrooms: 3,
      bathrooms: 2,
      study: true,
      balcony: true,
    },
    furnishing: "Fully Furnished",
    sqft: 1200,
    nearbyMRT: [
      {
        name: "Serangoon",
        line: "purple-northeast",
        distance: 400,
      },
    ],
    facilities: ["Playground", "BBQ Pit"],
    parking: {
      available: true,
      type: "Covered",
      spaces: 1,
    },
    nearbyAmenities: [
      {
        name: "NEX Shopping Mall",
        distance: 500,
        type: "Mall",
      },
      {
        name: "Serangoon Gardens Food Centre",
        distance: 800,
        type: "Hawker Centre",
      },
    ],
    perMonth: 3200,
    utilities: {
      included: ["Water", "Internet"],
      deposit: 6400,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      maxOccupants: 4,
    },
    images: ["/sample-photo-2.jpeg", "/sample-photo-3.jpeg"],
  },
  {
    id: "listing-002",
    address: {
      blk: 1,
      street: "Bencoolen Street",
      postalCode: "189651",
      floor: 15,
      unit: 8,
    },
    description:
      "Modern studio apartment in prime city location, ideal for students or young professionals. Stunning city views from the 15th floor. Full condo facilities including pool and gym. Walking distance to SMU, Bencoolen MRT, and multiple shopping destinations. Thoughtfully designed to maximize space with high-end furnishings.",
    aptType: "studio",
    propertyType: "Condo",
    roomConfig: {
      bedrooms: 1,
      bathrooms: 1,
      balcony: true,
    },
    furnishing: "Fully Furnished",
    sqft: 500,
    nearbyMRT: [
      {
        name: "Bencoolen",
        line: "blue-downtown",
        distance: 200,
      },
      {
        name: "Bras Basah",
        line: "yellow-circle",
        distance: 400,
      },
    ],
    facilities: ["Swimming Pool", "Gym", "Tennis Court", "BBQ Pit"],
    parking: {
      available: true,
      type: "Mechanical",
      spaces: 1,
    },
    nearbyAmenities: [
      {
        name: "SMU",
        distance: 200,
        type: "School",
      },
      {
        name: "The Cathay",
        distance: 300,
        type: "Mall",
      },
    ],
    perMonth: 3800,
    utilities: {
      included: ["Water", "Electricity", "Internet"],
      deposit: 7600,
      agentFee: 1900,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      gender: "No Preference",
      nationality: "No Preference",
      occupation: ["Student", "Young Professional"],
      maxOccupants: 2,
    },
    images: ["/sample-photo-1.jpeg", "/sample-photo-2.jpeg", "/sample-photo-3.jpeg"],
  },
  {
    id: "listing-003",
    address: {
      blk: 25,
      street: "Holland Grove Drive",
      postalCode: "278880",
    },
    description:
      "Luxurious 5-bedroom landed property in prestigious Holland Grove. Features private swimming pool and landscaped garden. Spacious layout with helper's room and multiple living areas. Close to Holland Village's dining and shopping amenities. Perfect for large families seeking privacy and comfort in a prime district.",
    aptType: "5-bedroom",
    propertyType: "Landed",
    roomConfig: {
      bedrooms: 5,
      bathrooms: 4,
      study: true,
      helper: true,
      balcony: true,
    },
    furnishing: "Partially Furnished",
    sqft: 3500,
    nearbyMRT: [
      {
        name: "Holland Village",
        line: "yellow-circle",
        distance: 1200,
      },
    ],
    facilities: ["Private Garden", "Swimming Pool"],
    parking: {
      available: true,
      type: "Covered",
      spaces: 3,
    },
    nearbyAmenities: [
      {
        name: "Holland Village Market",
        distance: 1200,
        type: "Hawker Centre",
      },
      {
        name: "Holland Village Shopping Centre",
        distance: 1200,
        type: "Mall",
      },
    ],
    perMonth: 12000,
    utilities: {
      included: [],
      deposit: 24000,
      agentFee: 6000,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      nationality: "No Preference",
      maxOccupants: 8,
    },
    images: ["/sample-photo-3.jpeg"],
  },
  {
    id: "listing-004",
    address: {
      blk: 456,
      street: "Tampines Street 42",
      postalCode: "520456",
      floor: 4,
      unit: 456,
    },
    description:
      "Cozy 2-bedroom HDB flat in Tampines, ideal for small families or couples. Well-maintained unit with practical layout. Located in a mature estate with excellent amenities nearby including Tampines Mall and Our Tampines Hub. Good connectivity with bus services and Tampines MRT station within walking distance.",
    aptType: "2-bedroom",
    propertyType: "HDB",
    roomConfig: {
      bedrooms: 2,
      bathrooms: 1,
    },
    furnishing: "Partially Furnished",
    sqft: 750,
    nearbyMRT: [
      {
        name: "Tampines",
        line: "green-eastwest",
        distance: 600,
      },
    ],
    facilities: [],
    parking: {
      available: false,
    },
    nearbyAmenities: [
      {
        name: "Tampines Mall",
        distance: 600,
        type: "Mall",
      },
      {
        name: "Our Tampines Hub",
        distance: 800,
        type: "Gym",
      },
    ],
    perMonth: 2400,
    utilities: {
      included: ["Water"],
      deposit: 4800,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      maxOccupants: 4,
    },
    images: ["/sample-photo-2.jpeg", "/sample-photo-1.jpeg", "/sample-photo-3.jpeg"],
  },
  {
    id: "listing-005",
    address: {
      blk: 8,
      street: "Marina Boulevard",
      postalCode: "018981",
      floor: 50,
      unit: 1,
    },
    description:
      "Spectacular penthouse in Marina Bay with breathtaking views of the city skyline and sea. Premium finishes throughout with 4 bedrooms and entertainment areas. Floor-to-ceiling windows, private lift access, and exclusive facilities including sky garden and jacuzzi. Minutes to Downtown and Marina Bay MRT stations.",
    aptType: "penthouse",
    propertyType: "Condo",
    roomConfig: {
      bedrooms: 4,
      bathrooms: 3,
      study: true,
      balcony: true,
    },
    furnishing: "Fully Furnished",
    sqft: 2500,
    nearbyMRT: [
      {
        name: "Downtown",
        line: "blue-downtown",
        distance: 300,
      },
      {
        name: "Marina Bay",
        line: "red-northsouth",
        distance: 500,
      },
    ],
    facilities: [
      "Swimming Pool",
      "Gym",
      "Tennis Court",
      "BBQ Pit",
      "Sky Garden",
      "Jacuzzi",
    ],
    parking: {
      available: true,
      type: "Covered",
      spaces: 2,
    },
    nearbyAmenities: [
      {
        name: "Marina Bay Sands",
        distance: 800,
        type: "Mall",
      },
      {
        name: "Virgin Active",
        distance: 300,
        type: "Gym",
      },
    ],
    perMonth: 15000,
    utilities: {
      included: ["Water", "Electricity", "Internet", "Cable TV"],
      deposit: 30000,
      agentFee: 7500,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      nationality: "No Preference",
      occupation: ["Professional", "Expat"],
      maxOccupants: 6,
    },
    images: ["/sample-photo-3.jpeg", "/sample-photo-2.jpeg", "/sample-photo-3.jpeg"],
  },
  {
    id: "listing-006",
    address: {
      blk: 38,
      street: "River Valley Road",
      postalCode: "238365",
      floor: 12,
      unit: 8,
    },
    description:
      "Elegant 4-bedroom condominium in River Valley, offering the perfect blend of luxury and convenience. Well-appointed interiors with quality fittings. Full facilities including pool, gym, and tennis court. Steps away from Great World City and various dining options. Ideal for families seeking a prestigious address.",
    aptType: "4-bedroom",
    propertyType: "Condo",
    roomConfig: {
      bedrooms: 4,
      bathrooms: 3,
      study: true,
      balcony: true,
    },
    furnishing: "Partially Furnished",
    sqft: 1800,
    nearbyMRT: [
      {
        name: "Fort Canning",
        line: "blue-downtown",
        distance: 500,
      },
      {
        name: "Somerset",
        line: "red-northsouth",
        distance: 800,
      },
    ],
    facilities: [
      "Swimming Pool",
      "Gym",
      "Tennis Court",
      "Children's Playground",
    ],
    parking: {
      available: true,
      type: "Covered",
      spaces: 2,
    },
    nearbyAmenities: [
      {
        name: "Great World City",
        distance: 400,
        type: "Mall",
      },
      {
        name: "Valley Point",
        distance: 300,
        type: "Mall",
      },
    ],
    perMonth: 8500,
    utilities: {
      included: ["Water"],
      deposit: 17000,
      agentFee: 4250,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      nationality: "No Preference",
      occupation: ["Professional", "Expat"],
      maxOccupants: 6,
    },
    images: ["/sample-photo-1.jpeg"],
  },
  {
    id: "listing-007",
    address: {
      blk: 334,
      street: "Jurong East Avenue 1",
      postalCode: "600334",
      floor: 10,
      unit: 145,
    },
    description:
      "Affordable 1-bedroom HDB flat in Jurong East, perfect for students or young professionals. Fully furnished with modern appliances. Great location near Chinese Garden MRT and multiple shopping malls. Well-maintained unit with good ventilation and city views. Convenient access to amenities and public transport.",
    aptType: "1-bedroom",
    propertyType: "HDB",
    roomConfig: {
      bedrooms: 1,
      bathrooms: 1,
    },
    furnishing: "Fully Furnished",
    sqft: 480,
    nearbyMRT: [
      {
        name: "Chinese Garden",
        line: "green-eastwest",
        distance: 400,
      },
    ],
    facilities: [],
    parking: {
      available: false,
    },
    nearbyAmenities: [
      {
        name: "JCube",
        distance: 800,
        type: "Mall",
      },
      {
        name: "Jurong East Food Centre",
        distance: 500,
        type: "Hawker Centre",
      },
    ],
    perMonth: 1800,
    utilities: {
      included: ["Water", "Internet"],
      deposit: 3600,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      maxOccupants: 2,
      occupation: ["Student", "Young Professional"],
    },
    images: ["/sample-photo-1.jpeg", "/sample-photo-2.jpeg", "/sample-photo-3.jpeg"],
  },
  {
    id: "listing-008",
    address: {
      blk: 15,
      street: "Siglap Road",
      postalCode: "456038",
    },
    description:
      "Stunning semi-detached house in Siglap with resort-style living. Generous 6 bedrooms with helper's quarters. Private pool and landscaped garden perfect for entertaining. Minutes to East Coast Park and popular eateries. Prestigious east coast address with excellent potential for appreciation.",
    aptType: "semi-detached",
    propertyType: "Landed",
    roomConfig: {
      bedrooms: 6,
      bathrooms: 5,
      study: true,
      helper: true,
      balcony: true,
    },
    furnishing: "Partially Furnished",
    sqft: 4000,
    nearbyMRT: [
      {
        name: "Bedok",
        line: "green-eastwest",
        distance: 1500,
      },
    ],
    facilities: ["Private Garden", "Swimming Pool", "BBQ Pit"],
    parking: {
      available: true,
      type: "Covered",
      spaces: 4,
    },
    nearbyAmenities: [
      {
        name: "Siglap Shopping Centre",
        distance: 500,
        type: "Mall",
      },
      {
        name: "East Coast Park",
        distance: 1000,
        type: "Gym",
      },
    ],
    perMonth: 14000,
    utilities: {
      included: [],
      deposit: 28000,
      agentFee: 7000,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      nationality: "No Preference",
      maxOccupants: 8,
    },
    images: ["/sample-photo-2.jpeg", "/sample-photo-1.jpeg"],
  },
  {
    id: "listing-009",
    address: {
      blk: 987,
      street: "Bukit Batok West Avenue 6",
      postalCode: "650987",
      floor: 12,
      unit: 87,
    },
    description:
      "Spacious executive HDB apartment in Bukit Batok with excellent views. Family-friendly layout with 4 bedrooms and study room. Well-maintained with partial furnishing and modern renovations. Close to amenities including West Mall and Bukit Batok Polyclinic. Ideal for large families seeking comfort and convenience.",
    aptType: "executive",
    propertyType: "HDB",
    roomConfig: {
      bedrooms: 4,
      bathrooms: 2,
      study: true,
      balcony: true,
    },
    furnishing: "Partially Furnished",
    sqft: 1500,
    nearbyMRT: [
      {
        name: "Bukit Batok",
        line: "red-northsouth",
        distance: 800,
      },
    ],
    facilities: ["Playground"],
    parking: {
      available: true,
      type: "Open",
      spaces: 1,
    },
    nearbyAmenities: [
      {
        name: "West Mall",
        distance: 900,
        type: "Mall",
      },
      {
        name: "Bukit Batok Polyclinic",
        distance: 500,
        type: "Clinic",
      },
    ],
    perMonth: 3500,
    utilities: {
      included: ["Water"],
      deposit: 7000,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      maxOccupants: 6,
    },
    images: ["/sample-photo-3.jpeg", "/sample-photo-1.jpeg"],
  },
  {
    id: "listing-010",
    address: {
      blk: 1,
      street: "West Coast Link",
      postalCode: "117398",
      floor: 5,
      unit: 12,
    },
    description:
      "Cozy studio apartment near NUS, perfect for students. Fully furnished with modern design and efficient layout. Condo facilities include pool and gym. Convenient location with easy access to West Coast Plaza and public transport. Quiet environment ideal for studying with good amenities nearby.",
    aptType: "studio",
    propertyType: "Condo",
    roomConfig: {
      bedrooms: 1,
      bathrooms: 1,
      balcony: true,
    },
    furnishing: "Fully Furnished",
    sqft: 420,
    nearbyMRT: [
      {
        name: "Clementi",
        line: "green-eastwest",
        distance: 1200,
      },
    ],
    facilities: ["Swimming Pool", "Gym", "BBQ Pit"],
    parking: {
      available: true,
      type: "Open",
      spaces: 1,
    },
    nearbyAmenities: [
      {
        name: "NUS",
        distance: 800,
        type: "School",
      },
      {
        name: "West Coast Plaza",
        distance: 400,
        type: "Mall",
      },
    ],
    perMonth: 2800,
    utilities: {
      included: ["Water", "Electricity", "Internet"],
      deposit: 5600,
      agentFee: 1400,
    },
    leasePeriod: "long-term",
    tenantPreferences: {
      gender: "No Preference",
      nationality: "No Preference",
      occupation: ["Student"],
      maxOccupants: 2,
    },
    images: ["/sample-photo-2.jpeg", "/sample-photo-1.jpeg"],
  },
];
