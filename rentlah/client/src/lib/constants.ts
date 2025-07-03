export const UNIVERSITIES = [
  {
    postalCode: "119077",
    name: "National University of Singapore",
    shortname: "NUS",
    coordinates: {
      latitude: 1.2976,
      longitude: 103.7767,
    },
  },
  {
    postalCode: "639798",
    name: "Nanyang Technological University",
    shortname: "NTU",
    coordinates: {
      latitude: 1.3406,
      longitude: 103.6838,
    },
  },
  {
    postalCode: "188065",
    name: "Singapore Management University",
    shortname: "SMU",
    coordinates: {
      latitude: 1.296568,
      longitude: 103.852119,
    },
  },
  {
    postalCode: "487372",
    name: "Singapore University of Technology and Design",
    shortname: "SUTD",
    coordinates: {
      latitude: 1.3413,
      longitude: 103.9638,
    },
  },
  {
    postalCode: "829834",
    name: "Singapore Institute of Technology",
    shortname: "SIT",
    coordinates: {
      latitude: 1.4136,
      longitude: 103.9123,
    },
  },
  {
    postalCode: "599494",
    name: "Singapore University of Social Sciences",
    shortname: "SUSS",
    coordinates: {
      latitude: 1.3292738,
      longitude: 103.7762131,
    },
  },
] as const;

export const MRT_LINES = [
  "red-northsouth",
  "green-eastwest",
  "brown-thomson-east-coast",
  "purple-northeast",
  "yellow-circle",
  "blue-downtown",
] as const;


export const DISTANCE_OPTIONS = [
  { value: "", label: "Any Distance" },
  { value: "15", label: "15 min" },
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "60 min" },
  { value: "60+", label: "60 min +" },
] as const;

