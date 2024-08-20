"use client";
import React, { useEffect, useState } from "react";
import Content from "@/components/editor/content";
import Stars from "@/components/stars";
import style from "./style.module.scss";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, viewBlog } from "@/functions/blog";
import ToolBar from "./components/toolBar/ToolBar";
import Navbar from "@/components/navbar";
import { formatNumbers } from "@/utils/formatter";
import { WithId } from "mongodb";
import { DBBlogPostType } from "@/types/blog";
import Preloader from "@/components/preloader/Preloader";

export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const [data, setData] = useState<WithId<DBBlogPostType> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { type, data: blogData } = await getBlogBySlug(slug);
        console.log(blogData);

        if (type === "success") {
          setData(blogData);
          console.log(blogData);
        } else {
          return notFound();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    async function addView() {
      const response = await fetch("https://api.ipify.org/?format=json");
      const data = await response.json();
      const viewRes = await viewBlog(slug, data.ip);
      console.log(viewRes);
    }
    addView();

    fetchData();
  }, [slug]);

  if (loading) {
    return <Preloader />;
  }

  if (!data) {
    return <h1>Blog not found</h1>;
  }

  return (
    <div className={``}>
      <header>
        <main className={style.hero}>
          <div className={style.blob1}></div>
          <div className={style.blob2}></div>

          <div className={style.parent}>
            <Navbar />

            <h1 className="line-clamp-2 ">{data?.title}</h1>
            <p className="line-clamp-2 ">{data?.excerpt}</p>
            <div className={style.btns}>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M440-200h80v-40h40q17 0 28.5-11.5T600-280v-120q0-17-11.5-28.5T560-440H440v-40h160v-80h-80v-40h-80v40h-40q-17 0-28.5 11.5T360-520v120q0 17 11.5 28.5T400-360h120v40H360v80h80v40ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-480H520ZM240-800v160-160 640-640Z" />
                </svg>
                More About Author
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M517-518 347-688l57-56 113 113 227-226 56 56-283 283ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z" />
                </svg>
                Contribute To Author
              </button>
            </div>

            <div className={style.stars}>
              <Stars></Stars>
            </div>
            <div className={style.numbers}>
              <div>
                <h2 className={style.numeric}>{data.time_to_read * 60}s</h2>
                <p className={`line-clamp-2 text-center ${style.text}`}>
                  Reading Time
                </p>
              </div>

              <div>
                <h2 className={style.numeric}>{formatNumbers(data.views)}</h2>
                <p className={`line-clamp-2 text-center ${style.text}`}>
                  Blog Views
                </p>
              </div>

              <div>
                <h2 className={style.numeric}>{formatNumbers(data.saves)}</h2>
                <p className={`line-clamp-2 text-center ${style.text}`}>
                  Blog Saves
                </p>
              </div>

              <div>
                <h2 className={style.numeric}>{formatNumbers(data.likes)}</h2>
                <p className={`line-clamp-2 text-center ${style.text}`}>
                  Blog Likes
                </p>
              </div>
            </div>
          </div>
        </main>
      </header>

      <div className={`py-20 bg-[#20344D]`}>
        <div className={`max-w-4xl mx-auto px-10 ]`}>
          <Content data={data.content || ""} />
        </div>
      </div>

      <div className={style.toolbarContainer}>
        <ToolBar
          blogId={data._id}
          likes={data.likes}
          likedBy={data.liked_by}
          saves={data.saves}
          savedBy={data.saved_by}
          views={data.views}
          readingTime={data.time_to_read}
        ></ToolBar>
      </div>
    </div>
  );
}

/**
 * Generating meta data for the page
 */
type MetaDataProps = {
    params: { slug: string };
};

export async function generateMetadata({ params }: MetaDataProps): Promise<Metadata> {
    const { slug } = params;

    const {data} = await getBlogBySlug(slug);

    if (data) {
        return {
            title: data.title,
            description: data.excerpt,
            authors: [
                {
                    name: data.author.name || 'Grow It Rapid',
                    url: data.author.email || 'https://www.growitrapid.com',
                }
            ],
            assets: [data.thumbnail],
            openGraph: {
                type: 'article',
                title: data.title,
                description: data.excerpt,
                images: [data.thumbnail],
                authors: [data.author.name || 'Grow It Rapid', data.author.email],
                url: `https://www.growitrapid.com/blogs/${data.slug}`,
                tags: data.tags,
                section: 'Blogs',
            },
            twitter: {
                site: '@site',
                card: 'summary_large_image',
                title: data.title,
                description: data.excerpt,
                images: [data.thumbnail],
            },
            appleWebApp: {
                title: data.title,
            },
        }
    } else {
        return {
            title: 'Grow It Rapid',
            description: 'Grow It Rapid',
        }
    }
}
