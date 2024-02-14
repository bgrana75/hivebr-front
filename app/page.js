import Header from "@/components/header";
import BlogPosts from "@/components/blogposts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <div className="flex flex-grow w-full">
        <BlogPosts />
      </div>
    </main>
  );
}