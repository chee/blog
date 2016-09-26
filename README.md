# blogs

i have a script in `~/bin` called `post` which just calls this repo's `bin/post` like:

```shell
#!/bin/sh
~/projects/blog/bin/post $1
```

so then i can just write a markdown file anywhere on my computer and do
`post my-first-blog-post.md` and post.js will copy the file to
`~/projects/blog/public/blogs/my-first-blog-post.md`

let's say the first line of `my-first-blog-post.md` was `# Hello! i am a blog post`,
then post.js would push to the array that lives at `public/posts.json` an object
that looks like this:

```javascript
{
  title: "Hello! i am a blog post",
  date: (new Date).toISOString(),
  slug: "hello-i-am-a-blog-post"
}
```

project was initialised with create-react-app so it's the same `npm run build`
and `npm run start` as that.

code is bad in places but whatever 🙃
