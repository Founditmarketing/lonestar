export interface Dealership {
  id: string;
  name: string; // The Location Name or "Lone Star Sheds - [City]"
  contactName?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  cell?: string;
  email?: string | null;
  hours?: string;
  mapLink: string;
  image: string;
}

const generateMapLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const DEALERSHIPS: Dealership[] = [
  {
    id: 'commerce-lavern',
    city: "Commerce",
    state: "TX",
    zip: "75428",
    contactName: "Lavern Kauffman",
    phone: "(903)-886-0307",
    email: "lavern@lonestarshedsllc.com",
    address: "6425 County Road 4714, Commerce, TX 75428",
    name: "LoneStar Sheds LLC",
    mapLink: generateMapLink("6425 County Road 4714, Commerce, TX 75428"),
    image: "/images/real/scraped-5.png"
  },
  {
    id: 'denton-sebastain',
    city: "Denton",
    state: "TX",
    zip: "76208",
    contactName: "Sebastain Williams",
    phone: "(940) 597-0908",
    email: null,
    address: "5101 E University Dr. #603, Denton, TX 76208",
    name: "Lonestar Sheds - Denton",
    hours: "M-F 10-6, Sat 9-6",
    mapLink: generateMapLink("5101 E University Dr. #603, Denton, TX 76208"),
    image: "/images/real/scraped-22.jpeg"
  },
  {
    id: 'alba-lee',
    city: "Alba",
    state: "TX",
    zip: "75410",
    contactName: "Lee Martin",
    phone: "903-366-2290",
    email: null,
    address: "5140 E US HWY 69, Alba, TX 75410",
    name: "Lonestar Sheds - Alba West",
    mapLink: generateMapLink("5140 E US HWY 69, Alba, TX 75410"),
    image: "/images/real/scraped-6.png"
  },
  {
    id: 'alba-kevin',
    city: "Alba",
    state: "TX",
    zip: "75410",
    contactName: "Kevin Stoeckel",
    phone: "(903) 638-3435",
    email: "Kevin.lonestar@emypeople.net",
    address: "5140 E US HWY 69, Alba, TX 75410",
    name: "Lonestar Sheds - Alba East",
    hours: "M-F 10am-5:30pm; Sat 10am-2pm",
    mapLink: generateMapLink("5140 E US HWY 69, Alba, TX 75410"),
    image: "/images/real/scraped-21.jpeg"
  },
  {
    id: 'paris-bruce',
    city: "Paris",
    state: "TX",
    zip: "75460",
    contactName: "Bruce & Donna Cox",
    phone: "430-228-2874",
    email: "lonestarparis@gmail.com",
    address: "3665 N Main St, Paris, TX 75460",
    name: "Lone Star Paris",
    mapLink: generateMapLink("3665 N Main St, Paris, TX 75460"),
    image: "/images/real/scraped-20.jpeg"
  },
  {
    id: 'mt-pleasant-ross',
    city: "Mt. Pleasant",
    state: "TX",
    zip: "75455",
    contactName: "Ross Bond",
    phone: "903.717.8704",
    cell: "903.563.6386",
    email: "rbondo1940@gmail.com",
    address: "2635 S Jefferson, Mt Pleasant, TX 75455",
    name: "LoneStar Sheds LLC",
    mapLink: generateMapLink("2635 S Jefferson, Mt Pleasant, TX 75455"),
    image: "/images/real/scraped-19.jpeg"
  },
  {
    id: 'gainesville-john',
    city: "Gainesville",
    state: "TX",
    zip: "76240",
    contactName: "John Patterson",
    phone: "903-345-5707",
    cell: "903-744-5374",
    email: "sales@82buildingcompany.com",
    address: "7803 E Hwy 82, Gainesville, TX 76240",
    name: "82 Building Company",
    mapLink: generateMapLink("7803 E Hwy 82, Gainesville, TX 76240"),
    image: "/images/real/scraped-22.jpeg"
  },
  {
    id: 'sulphur-springs-clarence',
    city: "Sulphur Springs",
    state: "TX",
    zip: "75482",
    contactName: "Clarence Malone",
    phone: "903-603-1240",
    email: "clarence.lonestar@gmail.com",
    address: "2129 S Broadway, Sulphur Springs, TX 75482",
    name: "Sulphur Springs Sales",
    mapLink: generateMapLink("2129 S Broadway, Sulphur Springs, TX 75482"),
    image: "/images/real/scraped-20.jpeg"
  },
  {
    id: 'bonham-joyce',
    city: "Bonham",
    state: "TX",
    zip: "75418",
    contactName: "Joyce Denney",
    phone: "(903) 486-5395",
    email: null,
    address: "1937 South Hwy 121, Bonham, TX 75418",
    name: "2-D Sheds & More",
    hours: "M-F 8-6, Sat 8-1",
    mapLink: generateMapLink("1937 South Hwy 121, Bonham, TX 75418"),
    image: "/images/real/scraped-2.png"
  },
  {
    id: 'mineola-dustin',
    city: "Mineola",
    state: "TX",
    zip: "75773",
    contactName: "Dustin Tompkins",
    phone: "972-784-4193",
    email: "mineola@nationalmetalbuildings.com",
    address: "2905 US Hwy 80 West, Mineola, TX 75773",
    name: "Lonestar Sheds - Mineola",
    hours: "Tue-Sat 9am-5pm",
    mapLink: generateMapLink("2905 US Hwy 80 West, Mineola, TX 75773"),
    image: "/images/real/scraped-24.jpeg"
  },
  {
    id: 'athens-katie',
    city: "Athens",
    state: "TX",
    zip: "75751",
    contactName: "Katie Brand",
    phone: "903.676.6256",
    email: "katie.lonestarsheds@gmail.com",
    address: "2940 Hwy 31 East, Athens, TX 75751",
    name: "LoneStar Sheds of Athens",
    hours: "Tue-Sat 10am-5pm",
    mapLink: generateMapLink("2940 Hwy 31 East, Athens, TX 75751"),
    image: "/images/real/scraped-32.jpeg"
  },
  {
    id: 'princeton-barbara',
    city: "Princeton",
    state: "TX",
    zip: "75407",
    contactName: "Barbara Hiss",
    phone: "972.742.5987",
    email: "barbhiss@gmail.com",
    address: "2950 East Princeton Dr, Princeton, TX 75407",
    name: "Princeton Sales Center",
    hours: "M-Sat 8:30-5:30",
    mapLink: generateMapLink("2950 East Princeton Dr, Princeton, TX 75407"),
    image: "/images/real/scraped-32.jpeg"
  },
  {
    id: 'tyler-david',
    city: "Tyler/Bullard",
    state: "TX",
    zip: "75757",
    contactName: "David Shubert",
    phone: "903-590-7400",
    email: "dshub52@yahoo.com",
    address: "48022 Hwy 69 N, Bullard, TX 75757",
    name: "Lonestar Sheds - Tyler",
    hours: "M-F 10-5, Sat 10-4, Sun Closed",
    mapLink: generateMapLink("48022 Hwy 69 N, Bullard, TX 75757"),
    image: "/images/real/scraped-24.jpeg"
  },
  {
    id: 'gladewater-kevin',
    city: "Gladewater",
    state: "TX",
    zip: "75647",
    contactName: "Kevin Wyatt",
    phone: "(903) 720-9777",
    email: "Kpbgladewater@gmail.com",
    address: "Oakwood Lane, Gladewater, TX 75647",
    name: "Kevin’s Portable Buildings",
    hours: "Open M-F 10am-5pm",
    mapLink: generateMapLink("Oakwood Lane, Gladewater, TX 75647"),
    image: "/images/real/scraped-6.png"
  },
  {
    id: 'flint-ron',
    city: "Flint",
    state: "TX",
    zip: "75762",
    contactName: "Ron",
    phone: "903.676.7877",
    cell: "903.203.7757",
    email: "mpbllc1976@gmail.com",
    address: "22053 Hwy 155 S., Flint, TX 75762",
    name: "Flint Sales Center",
    mapLink: generateMapLink("22053 Hwy 155 S., Flint, TX 75762"),
    image: "/images/real/scraped-19.jpeg"
  }
];