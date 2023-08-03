# A11ycrwlr
This project is an attempt to crawl student-facing pages within the Angelo.edu domain (i.e. the pages that can only be accessed through the authenticated student portal) and generate Axe accessibility reports for each page.

This will be used for an undergraduate mentored research project in the fall semester of 2023.

## Resources

### Crawlee

Initially, I planned to write a breadth-first search algorithm to crawl the non-public pages on the site. This may still end up being a feasible approach, but I would rather use software made for crawling websites. [Crawlee](https://crawlee.dev/) is easy to use and works well with Playwright, so it will probably end up being the approach I take. 

### Playwright
I will need to authenticate before running a crawl on the site. The following tutorials were the first three that appeared in a quick search. This should be easy enough to do before running the crawler.

[Revamped: Authentication with Playwright](https://timdeschryver.dev/blog/revamped-authentication-with-playwright)

[Fast and easy authentication with Playwright](https://timdeschryver.dev/blog/fast-and-easy-authentication-with-playwright)

[Authenticate Once with Playwright](https://qxperts.io/authenticate-once-with-playwright/)

## Fastify Server

Read the series of pieces [here](https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild) to get started.