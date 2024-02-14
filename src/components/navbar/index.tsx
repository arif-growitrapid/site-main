'use client'
import React, { cache, useEffect, useState } from 'react';
import Structure from './structure';
import getNavItems from './data';
import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';
import { useSession } from 'next-auth/react';

const clientFetch = cache(client.fetch.bind(client));

export default function Navbar() {
  const [services, setServices] = useState(null);
  // const cookieStore = cookies();
  // const theme = cookieStore.get('theme');
  const { data: session, status } = useSession();

  useEffect(() => {
    // Fetch services
    clientFetch(groq`*[ _type == "services" ] | order(order asc) {
      _id,
      _updatedAt,
      title,
      description,
      "slug": slug.current,
      "image": image.asset->url,
      items[] {
          item_title,
          description,
          "item_slug": item_slug.current,
      }
    }`)
      .then((servicesData) => {
        setServices(servicesData);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        // Handle error
      });
  }, []); // Empty dependency array ensures the effect runs once, similar to componentDidMount

  // if (services === null) {
  //   // Data is still loading
  //   return null;
  // }

  const menuItems = getNavItems({
    // @ts-ignore
    services, session, status
  }); 


  return (
    <Structure
    //   theme={theme?.value === 'light' ? 'light' : 'dark'}
    theme={'dark'}
      navItems={menuItems}
    />
  );
}
