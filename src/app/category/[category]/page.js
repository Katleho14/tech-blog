import React from "react";
import { getData } from "@/lib/helpers";
import LoadingSpinner from "@/components/LoadingSpinner";
import BlogsCard from "@/components/Blogs/BlogsCard";
import Pagination from "@/components/pagination/Pagination";
import Featured from "@/components/Blogs/Featured";
import Footer from "@/components/Footer";

// ✅ Safe generateMetadata with fallback
export async function generateMetadata({ params } = {}) {
  const category = params?.category || "All";
  return {
    title: `${category} Blogs`,
    description: `Explore a wide range of ${category} blogs on Tech Blog. Join our community of readers today.`,
    metadataBase: new URL("http://localhost:3000"), // change to your production URL
    alternates: {
      canonical: `http://localhost:3000/category/${category}`,
    },
  };
}

const Page = async ({ params, searchParams }) => {
  const { category } = params;
  const pageNo = parseInt(searchParams?.page) || 1;

  const data = await getData(
    `/api/blogs?category=${category}&page=${pageNo}&limit=12`
  );

  if (!data) return <LoadingSpinner />;
  if (data.error) return <div className="mt-28 w-full text-center">{data.error}</div>;

  return (
    <div className="mt-32 flex flex-col w-full justify-center items-center gap-10">
      <div className="w-11/12 xl:w-4/5">
        <h1 className="text-4xl font-semibold tracking-wider">{`${category.toUpperCase()} BLOGS`}</h1>
      </div>
      <div className="flex flex-wrap w-11/12 xl:w-4/5 gap-5 justify-center sm:justify-normal">
        {category !== "all" && <Featured blog={data?.featured} />}
        {data?.blogs?.map((blog) => (
          <BlogsCard key={blog._id} data={blog} />
        ))}
      </div>
      <Pagination
        pageNo={pageNo}
        totalPages={data?.totalPages}
        url={`/category/${category}`}
        limit={12}
      />
      <Footer />
    </div>
  );
};

export default Page;

