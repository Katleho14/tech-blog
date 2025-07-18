import Link from "next/link";
import BlogsCard from "@/components/Blogs/BlogsCard";
import { categories, capitalizeFirstLetter } from "@/lib/categories";
import Footer from "@/components/Footer";
import { getData } from "@/lib/helpers";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/pagination/Pagination";

export async function generateMetadata() {
  return {
    title: "Discover Engaging and Insightful Blogs",
    description:
      "Explore a wide range of captivating blogs on Tech Blog. Join our community of readers today.",
    metadatabase: new URL("https://www.techblog.me"),
    alternates: {
      canonical: `https://www.techblog.me`,
    },
  };
}

const Home = async ({ searchParams }) => {
  const pageNo = parseInt(searchParams.page) || 1;
  const data = await getData(`/api/blogs?page=${pageNo}&limit=20`);

  return (
    <>
      <header>
        <div className="mt-32 md:mt-48 mb-32 flex flex-col gap-5 items-center justify-center text-center px-5">
          <h1 className="text-5xl md:w-[75%] md:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight px-4 md:px-0">
            Discover Engaging and Insightful Blogs
          </h1>
          <p className="w-11/12 md:w-[55%] sm:text-xl text-slate-400">
            Explore a wide range of captivating blogs through our{" "}
            <span className="text-slate-100">intuitive platform.</span> Join our
            community of avid readers today.
          </p>
          <SearchBar type="Blogs" url="/api/blogs/search?term=" />
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-[0.05]" />
          <div className="absolute size-96 bg-neutral-700 top-0 rounded-full blur-[150px] -z-50" />
        </div>
      </header>

      <main className="w-full flex flex-col items-center">
        <section className="w-11/12 space-y-10">
          <ul className="flex gap-4 flex-wrap w-full">
            {categories.map((items, index) => (
              <li key={index}>
                <Link
                  href={`/category/${items}`}
                  className="px-4 py-[6px] shadow-md rounded-full cursor-pointer bg-slate-800"
                >
                  {capitalizeFirstLetter(items)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-5">
            {data.error ? (
              <h2 className="absolute text-center">{data.error}</h2>
            ) : (
              data.blogs.map((item, index) => (
                <BlogsCard key={item._id} data={item} />
              ))
            )}
          </div>
        </section>
        <Pagination pageNo={pageNo} totalPages={data?.totalPages} url="/" />
      </main>
      <Footer />
    </>
  );
};

export default Home;
