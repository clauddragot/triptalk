import dayjs from "dayjs";

import { Sub } from "../types";
import { useAuthState } from "../context/auth";
import Link from "next/link";

export default function Sidebar({ sub }: { sub: Sub }) {
  const { authenticated } = useAuthState();

  return (
    <div className="flex-col pr-5">
      <div className="hidden ml-6 md:block w-80">
        <div className="bg-white rounded">
          <div className="p-3 rounded-t bg-primary-500">
            <p className="font-semibold text-white">About Community</p>
          </div>
          <div className="p-3">
            <p className="mb-3 text-md">{sub.description}</p>
            <div className="flex mb-3 text-sm font-medium">
              {/* <div className="w-1/2">
                <p>12</p>
                <p>members</p>
              </div> */}
              {/* <div className="w-1/2">
                <p>150</p>
                <p>online</p>
              </div> */}
            </div>
            <p className="my-3">
              <i className="mr-2 fas fa-birthday-cake"></i>
              Created {dayjs(sub.createdAt).format("D MMM YYYY")}
            </p>

            <Link href={`/r/${sub.name}/submit`}>
              <a className="w-full px-2 py-1 blue button">Create Post</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
