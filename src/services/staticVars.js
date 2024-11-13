import { FaInstagram, FaEtsy, FaFacebook } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
export const highLightProducts = [
    {
      name: "bear",
      bgColor:'bg-bg3',
      overlayImage:'https://res.cloudinary.com/dujdz2jbl/image/upload/v1731248101/frontend/pd18jk3yxaswklg9t64r.png',
      image:
        "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731248020/frontend/v0lm0kzk9wx5mw4sekdv.png",
      description: (
        <>
          <h2 className="font-display text-5xl text-text1 mb-2 ">
            adipiscing elit
          </h2>
          <p className="font-display text-3xl text-text1 mb-2">
            sed do lorem
          </p>
          <p className="font-display text-3xl text-text1 mb-2">
            ipsum dolor sit
          </p>
          <p className="font-display text-3xl text-text1">sdsa</p>
        </>
      ),
      imageSilhouette:
        "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731248100/frontend/n36857u6cwtfcpcr8qx0.png",
    },
    {
      name: "horse",
      bgColor:'bg-bg4',
      overlayImage:'https://res.cloudinary.com/dujdz2jbl/image/upload/v1731167718/frontend/gqltlhse0qgtzlq0olo0.png',
      image:
        "https://i.pinimg.com/736x/73/30/f7/7330f7658bd1910c2cd2e7061fbf2f97.jpg",
      description: (
        <>
          <h2 className="font-display text-5xl text-text1 mb-2">
            adipiscing elit
          </h2>
          <p className="font-display text-3xl text-text1 mb-2">
            sed do lorem
          </p>
          <p className="font-display text-3xl text-text1 mb-2 ">
            ipsum dolor sit
          </p>
          <p className="font-display text-3xl text-text1 ">sdsa</p>
        </>
      ),
      imageSilhouette:
        "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731251806/frontend/oouuoskyha4dnq1q1mqq.png",
    },
    {
      name: "sleepie sheep",
      bgColor:'bg-bg2',
      overlayImage:'https://res.cloudinary.com/dujdz2jbl/image/upload/v1731167718/frontend/gqltlhse0qgtzlq0olo0.png',
      image:
        "https://i.pinimg.com/736x/33/38/11/33381125f03b05c7a3817e82ba41b83c.jpg",
      description: (
        <>
          <h2 className="font-display text-5xl text-text1 mb-2">
            adipiscing elit
          </h2>
          <p className="font-display text-3xl text-text1 mb-2">
            sed do lorem
          </p>
          <p className="font-display text-3xl text-text1 mb-2 ">
            ipsum dolor sit
          </p>
          <p className="font-display text-3xl text-text1 ">sdsa</p>
        </>
      ),
      imageSilhouette:
        "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731252214/frontend/qlng7b4leb9rlfkitgas.png",
    },
    // Add more products as needed
  ];

 export const testimonialsData = [
    {
      name: "Lisa",
      text: "This is even more adorable than pictured. And you sent me two! Thank you so much!",
      sticker: "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731341591/frontend/ez5ghyebe641wy2oqnyd.png",
    },
    {
      name: "John",
      text: "Amazing quality, exceeded my expectations. Will definitely buy again!",
      sticker: "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731341591/frontend/ez5ghyebe641wy2oqnyd.png",
    },
    {
      name: "Emma",
      text: "Beautiful craftsmanship! Highly recommend.",
      sticker: "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731341591/frontend/ez5ghyebe641wy2oqnyd.png",
    },
    {
      name: "Sophia",
      text: "Absolutely loved it, the perfect gift for my friend.",
      sticker: "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731341591/frontend/ez5ghyebe641wy2oqnyd.png",
    },
    {
      name: "Michael",
      text: "Fast shipping and great customer service. A++",
      sticker: "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731341591/frontend/ez5ghyebe641wy2oqnyd.png",
    },
    {
      name: "Michael",
      text: "Fast shipping and great customer service. A++",
      sticker: "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731341591/frontend/ez5ghyebe641wy2oqnyd.png",
    },
  ];

  export const links = [
    { label: 'inst', href: "https://www.instagram.com/", icon: <FaInstagram fontSize="2rem" /> },
    { label: 'Etsy', href: "https://www.etsy.com/", icon: <FaEtsy fontSize="2rem" /> },
    { label: 'fbook', href: "https://www.facebook.com/", icon: <FaFacebook fontSize="2rem" /> },
    { label: 'Shop', href: "/shop", icon: <GiShoppingCart fontSize="2rem" /> },
  ];