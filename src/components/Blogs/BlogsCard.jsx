"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import React from "react";
import { useToast } from "../ui/use-toast";
import useSend from "@/hooks/useSend";
import { formatDistanceToNow } from "date-fns";

const BlogsCard = ({ data, route, refetchData }) => {
  const { data: session } = useSession();
  const [featured, setFeatured] = React.useState(data?.featured || false);
  const { fetchData, loading } = useSend();
  const { toast } = useToast();
  const date = data?.createdAt
    ? formatDistanceToNow(new Date(data.createdAt))
    : "some time";

  const approvalHandler = (id, status) => async () => {
    const res = await fetchData(`/api/admin/approval`, "PUT", {
      blogId: id,
      status,
    });
    if (!res.error) refetchData?.();
  };

  const featuredHandler = async () => {
    const res = await fetchData(`/api/admin/featured/${data?._id}`, "PUT", {
      category: data?.category,
    });
    if (!res.error) setFeatured(true);
    toast({
      title: res.error ? "Error" : "Success",
      description: res.message || res.error,
    });
  };

  return (
    <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-72 xl:max-w-80 xl:flex-grow flex flex-col rounded-xl bg-gray-900 shadow-md">
      <div className="w-full overflow-hidden rounded-t-xl">
        {data?.img?.url ? (
          <Image
            src={data.img.url}
            alt={data.title || "Blog image"}
            width={300}
            height={200}
            className="w-full h-auto aspect-video object-cover hover:scale-105 transition-all duration-300 ease-in-out"
          />
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center bg-gray-800 text-white">
            No image available
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <span className="py-1 px-4 bg-black w-fit rounded-full text-white text-sm">
          {(data?.category || "Uncategorized").toUpperCase()}
        </span>

        <Link
          href={`/blogs/${data?.url || "#"}`}
          className="text-xl hover:underline cursor-pointer line-clamp-3"
        >
          {data?.title || "Untitled Blog"}
        </Link>

        <div className="flex justify-between w-full items-center">
          <span className="text-gray-400">{`${date} ago`}</span>
        </div>

        {(session?.user?.isAdmin || session?.user?.isSuper) && route === "admin" && (
          <div className="flex gap-4 items-center w-full justify-end">
            <span title="Approve Blog">
              <CheckIcon
                size={25}
                className="text-green-600 cursor-pointer"
                strokeWidth={3}
                onClick={approvalHandler(data?._id, "approved")}
              />
            </span>
            <span title="Reject Blog">
              <XIcon
                size={25}
                className="text-red-600 cursor-pointer"
                onClick={approvalHandler(data?._id, "reject")}
                strokeWidth={3}
              />
            </span>
          </div>
        )}

        {(session?.user?.isAdmin || session?.user?.isSuper) && route !== "admin" && (
          <div>
            <button
              disabled={loading}
              onClick={featuredHandler}
              aria-label="Add to featured"
            >
              {featured ? (
                <MdFavorite className="text-red-500 text-2xl" />
              ) : (
                <MdFavoriteBorder className="text-2xl" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsCard;

