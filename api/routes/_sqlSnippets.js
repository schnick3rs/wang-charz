/**
 * @see https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql
 */
const sourceSqlSnippet = (mainTableSourceIdSnippet) => ` ( 
    select row_to_json(s) from ( 
      select 
        short_name as book, 
        is_official as official, 
        source_books.key, 
        h.slug 
      from wrath_glory.source_books 
        left join wrath_glory.homebrews h ON h.key = source_books.key 
        where source_books.id = ${mainTableSourceIdSnippet} 
    ) s 
  ) `;

module.exports = {
  sourceSql: sourceSqlSnippet,
};
