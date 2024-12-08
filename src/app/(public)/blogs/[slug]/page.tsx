import { getBlogBySlug } from "@/functions/blog";

import React from "react";
import Structure from "./structure";
import { Metadata } from "next";

export default function page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return <Structure params={params} />;
}

/**
 * Generating meta data for the page
 */
type MetaDataProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const { slug } = params;

  const { data } = await getBlogBySlug(slug);

  if (data) {
    return {
      title: data.title,
      description: data.excerpt,
      authors: [
        {
          name: data.author.name || "Grow It Rapid",
          url: data.author.email || "https://www.growitrapid.com",
        },
      ],
      assets: [data.thumbnail],
      openGraph: {
        type: "article",
        title: data.title,
        description: data.excerpt,
        images: [data.thumbnail],
        authors: [data.author.name || "Grow It Rapid", data.author.email],
        url: `https://www.growitrapid.com/blogs/${data.slug}`,
        tags: data.tags,
        section: "Blogs",
      },
      twitter: {
        site: "@site",
        card: "summary_large_image",
        title: data.title,
        description: data.excerpt,
        images: [data.thumbnail],
      },
      appleWebApp: {
        title: data.title,
      },
    };
  } else {
    return {
      title: "Grow It Rapid",
      description: "Grow It Rapid",
    };
  }
}
