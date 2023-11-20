/**
 * @fileoverview Blogs list page
 */

import React from "react";
import Grid from "../../components/Grid";
import BlogCard from "../../components/Card";
import Blog from "../../Entites/Blog";
import blogs from "./mock.data";
import withNavbar from "../../components/WithNavbar";

function Blogs() {
  return (
    <>
      <Grid>
        {blogs.map((blog) => {
          const _blog = new Blog(
            blog.id,
            blog.title,
            blog.content,
            blog.slug,
            blog.media,
            blog.mediaCount,
            blog.owner,
            blog.createdAt,
            blog.updatedAt,
            blog.comments
          );
          console.log(_blog);
          return (
            <BlogCard
              key={_blog.id}
              title={_blog.title}
              titleHelp={_blog.generateTitleHelp()}
              content={_blog.content}
              slug={_blog.slug}
              mediaCount={_blog.mediaCount}
              owner={_blog.owner}
              hero={_blog.media[0]}
            />
          );
        })}
      </Grid>
    </>
  );
}

export default withNavbar(Blogs);
