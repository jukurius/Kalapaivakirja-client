import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Post = React.forwardRef(({ post }, ref) => {
    const postBody = (
        <Link
            to={`/saaliit/${post.id}`}
            key={post.id}
            className="flex flex-col justify-end min-w-full bg-custom-dark-blue border border-gray-200 rounded-md shadow objec-cover h-96"
            style={{
                backgroundImage: `linear-gradient(180deg, transparent, black), url("${post?.images?.length > 0 ? post.images[0] : null}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {post.species_name} {post.weight}kg
                </h5>
                <p className="mb-1 font-normal text-gray-200">{post.date}</p>
                <p className="mb-3 font-normal text-gray-200">
                    {post.location_province}, {post.location_city}
                </p>
            </div>
        </Link>
    )

    const content = ref
        ? <article className='min-w-full' ref={ref}>{postBody}</article>
        : <article className='min-w-full'>{postBody}</article>

    return content;
});

Post.displayName = 'Post';

Post.propTypes = {
    post: PropTypes.object
};

export default Post;