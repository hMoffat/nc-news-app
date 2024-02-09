- style the loading behaviour bits

- update state tree

- add comment - enter key not submitting
- would be nice to have user's avatar by their comment
- double check feedbacks

- refactor css system
- set up user page for other users
- make usernames in article cards links

error handling notes

- for a non-existent path.

  - 404 working for /dfdf, /sfsd/sdg, /topics,
    -'still building this page, sorry' for non existant user (correct this once other user functions added)

- for a non-existent article.
  - /topics/gfsdg goes to 'loading gfsdg' 'something went wrong'
- for a non-existent topic.
  -/topics/coding/ssgs goes to 'loading'
- when posting a new comment if they have not - provided all of the required information.
  - has a 'sorry couldn't post your comment message' instead of forcing add comment body
