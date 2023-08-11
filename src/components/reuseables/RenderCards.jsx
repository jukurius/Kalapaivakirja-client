import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function RenderCards(props) {
  const data = props.items.map((item) => {
    return (
      <Link
        to={`/saaliit/${item.id}`}
        key={item.id}
        className="flex flex-col justify-end min-w-full bg-custom-dark-blue border border-gray-200 rounded-md shadow objec-cover h-96"
        style={{
          backgroundImage: `linear-gradient(180deg, transparent, black), url("${item?.images?.length > 0 ? item.images[0] : null}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.species_name} {item.weight}kg
          </h5>
          <p className="mb-1 font-normal text-gray-200">{item.date}</p>
          <p className="mb-3 font-normal text-gray-200">
            {item.location_province}, {item.location_city}
          </p>
        </div>
      </Link>
    );
  });

  return (
    <InfiniteScroll
      className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      dataLength={data.length}
      next={props.fetchMorePosts}
      hasMore={props.hasMore}
      loader={<h4>Loading...</h4>}
    >
      {data}
    </InfiniteScroll>
  );
}

RenderCards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMorePosts: PropTypes.func,
  hasMore: PropTypes.bool,
};

export default RenderCards;
