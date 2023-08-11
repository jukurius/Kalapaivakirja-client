import { useState, useEffect, useContext } from "react";
import axios from "axios";
import FilterBar from "../reuseables/FilterBar";
import { AppContext } from "../../AppContext";
import NoCatchesFound from "../reuseables/NoCatchesFound";
import RenderCards from "../reuseables/RenderCards";

function AllPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const { filterOptions, setFilterOptions } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePosts = async () => {
    console.log(allPosts);
    try {
      const res = await axios.get(
        `http://localhost:3000/filterCatchQuery?page=${page}`,
        {
          params: filterOptions,
        }
      );
      console.log(res.data);
      if (res.data.data.length === 0) {
        if (page >= res.data.totalPages) {
          setHasMore(false);
        }
      } else {
        const newData = await res.data.data;
        setAllPosts([...allPosts, ...newData]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearArray = () => {
    setAllPosts([]);
  };

  useEffect(() => {
    fetchMorePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
    clearArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  useEffect(() => {
    if (allPosts.length === 0) {
      fetchMorePosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPosts]);

  return (
    <div className="container px-5 max-w-7xl mx-auto">
      <h2 className="text-2xl lg:text-4xl font-bold pt-20 text-gray-600">
        Selaa käyttäjien kalasaaliita
      </h2>
      <div className="rounded-md mt-4 lg:mt-8 mb-5">
        <FilterBar
          setAllPosts={setAllPosts}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
        {allPosts.length !== 0 ? (
          <RenderCards items={allPosts} page={page} hasMore={hasMore} fetchMorePosts={fetchMorePosts} />
        ) : (
          <NoCatchesFound />
        )}
      </div>
    </div>
  );
}

export default AllPosts;
