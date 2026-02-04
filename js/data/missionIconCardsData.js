const BASE_PATH = window.location.hostname.includes("github.io") ? "/triumph" : "";

export const iconCardsList = [
  {
    icon: `${BASE_PATH}/assets/icons/play.svg`,
    title: 'Watch a Message',
    description: 'Catch up on the latest and past weekend service messages anytime, anywhere.',
    linkText: 'Catch Our Latest Message',
    linkUrl: '#'
  },
  {
    icon: `${BASE_PATH}/assets/icons/location.svg`,
    title: 'Find a Location',
    description: 'Easily find a campus near you. Join us in person and get connected.',
    linkText: 'Search Our Campuses',
    linkUrl: '#'
  },
  {
    icon: `${BASE_PATH}/assets/icons/message.svg`,
    title: 'Get Connected',
    description: 'Stay connected and in the loop—sign up for updates, events, and ways to get involved.',
    linkText: 'Contact Us',
    linkUrl: '#'
  }
];