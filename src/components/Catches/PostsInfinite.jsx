import { useState, useRef, useCallback, useContext, useEffect } from "react";
import usePosts from "../../hooks/usePosts";
import Post from "./Post";
import FilterBar from "../reuseables/FilterBar";
import { AppContext } from "../../AppContext";

const Example1 = () => {
  const [pageNum, setPageNum] = useState(1);
  const { filterOptions, setFilterOptions } = useContext(AppContext);
  const { isLoading, isError, error, results, setResults, hasNextPage } =
    usePosts(pageNum, filterOptions);

  useEffect(() => {
    setResults([]);
    setPageNum(1);
  }, [filterOptions]);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className="center">Error: {error.message}</p>;

  const content = results.map((post, i) => {
    if (results.length === i + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  return (
    <div>
      <h2 className="text-2xl lg:text-4xl font-bold pt-20 text-gray-600">
        Selaa käyttäjien kalasaaliita
      </h2>
      <div className="rounded-md mt-4 lg:mt-8 mb-5">
        <FilterBar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </div>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {content}
      </div>
      {isLoading && <p className="center">Loading More Posts...</p>}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </div>
  );
};
export default Example1;
