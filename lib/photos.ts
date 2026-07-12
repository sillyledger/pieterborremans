export interface Photo {
  src: string;
  alt: string;
  caption: string;
}

export const photos: Photo[] = [
  {
    src: "/images/pieter-borremans-in-taiwan-dark-grey-mirror-shot.jpeg",
    alt: "Pieter Borremans, mirror self-portrait in Taiwan",
    caption: "Some days are just a mirror and a phone.",
  },
  {
    src: "/images/pieter-borremans-living-in-taiwan.jpeg",
    alt: "Pieter Borremans living in Taiwan",
    caption: "Taichung — living here since 2018.",
  },
  {
    src: "/images/pieter-borremans-taichung-mirror-shot-dark.jpeg",
    alt: "Pieter Borremans in Taichung",
    caption: "Taichung, low light.",
  },
];
