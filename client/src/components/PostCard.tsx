import Link from "next/link";
import Axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classNames from "classnames";

import { Post } from "../types";
import ActionButton from "./ActionButton";
import { useAuthState } from "../context/auth";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
  revalidate?: Function;
}

export default function PostCard({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
  },
  revalidate,
}: PostCardProps) {
  const { authenticated } = useAuthState();

  const router = useRouter();

  const isInSubPage = router.pathname === "/r/[sub]"; // /r/[sub]

  const vote = async (value: number) => {
    if (!authenticated) router.push("/login");

    if (value === userVote) value = 0;

    try {
      const res = await Axios.post("/misc/vote", {
        identifier,
        slug,
        value,
      });

      if (revalidate) revalidate();

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      key={identifier}
      className="flex mb-3 bg-white rounded"
      id={identifier}
    >
      {/* Post data section */}
      <div className="w-full p-3 shadow-md">
        <div className="flex items-center">
          {!isInSubPage && (
            <>
              <Link href={`/r/${subName}`}>
                <img
                  src={sub.imageUrl}
                  className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                />
              </Link>
              {/* <Link href={`/r/${subName}`}>
                <a className="text-xs font-bold cursor-pointer hover:underline">
                  /{subName}
                </a>
              </Link> */}
              <span className="mx-1 text-xs text-gray-500"></span>
            </>
          )}
          <p className="text-xs text-gray-500">
            Posted by
            <Link href={`/u/${username}`}>
              <a className="ml-1 hover:underline">{username}</a>
            </Link>
          </p>

          <span className="mx-1 text-xs text-gray-500">• In </span>
          <Link href={`/r/${subName}`}>
            <a className="text-xs font-bold cursor-pointer hover:underline">
              @{subName}
            </a>
          </Link>
          <span className="mx-1 text-xs text-gray-500">•</span>
          <Link href={url}>
            <a className="text-xs text-gray-500 hover:underline">
              {dayjs(createdAt).fromNow()}
            </a>
          </Link>
        </div>

        <Link href={url}>
          <a>
            <p className="mx-1 mt-1 mb-1 text-xl font-semibold">{title}</p>
          </a>
        </Link>
        {/* <img
          className="my-1 bg-center bg-cover rounded h-96"
          src="/images/post.jpg"
        ></img> */}
        {body && <p className="mx-1 mb-1 text-base font-normal">{body}</p>}

        <div className="flex">
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                <span className="font-bold">{commentCount} Comments</span>
              </ActionButton>
            </a>
          </Link>
          <ActionButton>
            <i className="mr-1 fas fa-share fa-xs"></i>
            <span className="font-bold">Share</span>
          </ActionButton>
          <ActionButton>
            <i className="mr-1 fas fa-bookmark fa-xs"></i>
            <span className="font-bold">Save</span>
          </ActionButton>
        </div>
      </div>
      {/* Vote section */}
      <div className="w-1/12 py-3 text-center bg-gray-200 rounded-l ">
        {/* Upvote */}
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
          onClick={() => vote(1)}
        >
          <i
            className={classNames("icon-arrow-up", {
              "text-blue-600": userVote === 1,
            })}
          ></i>
        </div>
        <p className="text-xs font-bold">{voteScore}</p>
        {/* Downvote */}
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
          onClick={() => vote(-1)}
        >
          <i
            className={classNames("icon-arrow-down", {
              "text-red-500": userVote === -1,
            })}
          ></i>
        </div>
      </div>
    </div>
  );
}
