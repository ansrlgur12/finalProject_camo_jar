import React, { useState } from 'react';
import NaverAPI from '../API/NaverAPI';
import styled from 'styled-components';

const BlogList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1em;
`;

const BlogCard = styled.li`
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

const BlogLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const BlogTitle = styled.h2`
  font-size: 1.25em;
  margin-bottom: 0.5em;
`;

const BlogDescription = styled.p`
  color: #666;
  margin-bottom: 0.5em;
`;

const BlogURL = styled.p`
  font-size: 0.85em;
  color: #333;
`;

const BlogSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await NaverAPI.SearchBlogs(query);
      setResults(response.data.items);
    } catch (error) {
      console.error('Failed to fetch blog posts', error);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={fetchBlogPosts}>검색</button>
      <BlogList>
        {results.map((result, index) => (
          <BlogCard key={index}>
            <BlogLink href={result.link} target="_blank" rel="noopener noreferrer">
              <BlogTitle>{result.title}</BlogTitle>
              <BlogDescription>{result.description}</BlogDescription>
              <BlogURL>{result.link}</BlogURL>
            </BlogLink>
          </BlogCard>
        ))}
      </BlogList>
    </div>
  );
};

export default BlogSearch;
