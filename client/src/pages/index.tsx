import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR, { useSWRInfinite } from "swr";
import Image from "next/image";

import { Post, Sub } from "../types";

import PostCard from "../components/PostCard";
import Link from "next/link";
import { useAuthState } from "../context/auth";

dayjs.extend(relativeTime);

export default function Home() {
  const [observedPost, setObservedPost] = useState("");

  // const { data: posts } = useSWR<Post[]>("/posts");
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");

  const description =
    "TripTalk is a network of communities based on people's interests of holidays. Find communities you're interested in, and become part of an online community!";
  const title = "triptalk: your holiday begins here";

  const { authenticated } = useAuthState();

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`);

  const isInitialLoading = !data && !error;
  const posts: Post[] = data ? [].concat(...data) : [];

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const id = posts[posts.length - 1].identifier;

    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (element: HTMLElement) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log("Reached bottom of post");
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:title" content={title} />
      </Head>
      <div className="container flex pt-5">
        {/* Posts feed */}
        <div className="w-full mx-auto">
          {isInitialLoading && <p className="text-lg text-center">Loading..</p>}
          {posts?.map((post) => (
            <PostCard
              post={post}
              key={post.identifier}
              revalidate={revalidate}
            />
          ))}
          {isValidating && posts.length > 0 && (
            <p className="text-lg text-center">Loading More..</p>
          )}
        </div>
        <div className="flex-col">
          {/* Sidebar Top Communities */}
          <div className="hidden ml-6 mr-6 md:block md:w-70 lg:w-80">
            <div className="bg-white rounded">
              <div className="p-4 border-b-2">
                <p className="text-lg font-bold text-left">Top Communities</p>
              </div>
              <div>
                {topSubs?.map((sub) => (
                  <div
                    key={sub.name}
                    className="flex items-center px-4 py-2 text-xs border-b"
                  >
                    <Link href={`/r/${sub.name}`}>
                      <a>
                        <Image
                          src={sub.imageUrl}
                          className="rounded-full cursor-pointer"
                          alt="Sub"
                          width={(6 * 16) / 4}
                          height={(6 * 16) / 4}
                        />
                      </a>
                    </Link>
                    <Link href={`/r/${sub.name}`}>
                      <a className="ml-2 font-bold hover:cursor-pointer">
                        {sub.name}
                      </a>
                    </Link>
                    <p className="ml-auto font-med">{sub.postCount}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 blue button">VIEW ALL</a>
                </Link>
              </div>
            </div>
          </div>
          {/* Sidebar Top Communities */}
          <div className="hidden my-4 ml-6 md:block md:w-70 lg:w-80">
            <div className="bg-white rounded">
              <p className="p-2 ml-2 text-base font-normal">
                Like our project? Support it by buying us a coffee. We need it!
              </p>
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 action button">Donate</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden ml-6 md:block md:w-70 lg:w-80">
            <div className="bg-white rounded ">
              <div className="p-4">
                <p className="mb-1 text-lg font-bold text-left">
                  Your Contribution
                </p>

                <p className="w-11/12 ml-1 text-base font-normal">
                  Love to receive answers to your questions? Create a post to
                  help some folks. Or create a community to help many.
                </p>
              </div>
              <div className="flex flex-row p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-6/12 px-2 py-1 mx-1 complementary hollow button">
                    CREATE POST
                  </a>
                </Link>

                <Link href="/subs/create">
                  <a className="w-6/12 px-2 py-1 mx-1 complementary button">
                    CREATE SECTION
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get('/posts')

//     return { props: { posts: res.data } }
//   } catch (err) {
//     return { props: { error: 'Something went wrong' } }
//   }
// }
