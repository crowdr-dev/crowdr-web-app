export const campaignCategories = [
  {
      value: 'business',
      label: 'Business',
      icon: 'toolbox'
  },
  {
      value: 'tech',
      label: 'Tech',
      icon: 'desktop-computer'
  },
  {
      value: 'health',
      label: 'Health',
      icon: 'syringe'
  },
  {
      value: 'music',
      label: 'Music',
      icon: 'guitar'
  },
  {
      value: 'legal',
      label: 'Legal',
      icon: 'balance-scale'
  },
  {
      value: 'family',
      label: 'Family',
      icon: 'family-man-woman-girl-boy'
  },
  {
      value: 'events',
      label: 'Events',
      icon: 'circus-tent'
  },
  {
      value: 'arts',
      label: 'Arts',
      icon: 'artist-palette'
  },
  {
      value: 'politics',
      label: 'Politics',
      icon: 'office-building'
  },
  {
      value: 'sport',
      label: 'Sports',
      icon: 'man-swimming-light-skin-tone'
  },
  {
      value: 'education',
      label: 'Education',
      icon: 'books'
  },
  {
      value: 'others',
      label: 'Others',
      icon: ''
  },
] as const

export type CampaignCategory = typeof campaignCategories[number]['value']