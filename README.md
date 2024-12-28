# couponfog-archive

This is an archived project. Everything in this project is provided for
educational and illustrative purposes.

This is a personal project I created and deployed in 2020, to provide users in the U.S
with coupon codes for their favorite retail stores. Users could use
the main website which was a React App, an android app coded in Kotlin, or a browser extension which automatically tries coupon codes at checkout.

The project failed to takeoff after few months, so I stopped it. It is maybe due to
the fact that I worked on everything myself : user stories, design/implementation of frontends/backends, logos/graphics designs, operations/monitoring, optimizations, legal stuff etc. That's why code and design quality in this repository may not be
perfect e.g lack of unit tests.

Anyway, it was an opportunity to discover or practice with some amazing technologies
like nodejs, redis, AWS SNS etc.

## Architecture

[See Also](/backend/infra/doc/architecture.txt)

This is an old project and it was partioned into several repositories in Amazon codecommit. I tried to group everything in this repository. Some stuff may be outdated vs what was running at the time.

Please let me know if you see some API KEY or some credentials in the code let me know.

### Backend

Everything is Javascript or Typescript on node/express

1. Three Restful JSON API services : read-api, write-api and admin-api. Goal of separation was to facilitate scaling later if needed.
2. Haproxy has been used to load balance traffic between instances. Amazon ELB has also been used but I don't remember if it was along with haproxy or as replacement.
3. A backoffice application runs periodically to collect coupon codes from different providers. Collection/processing failures are sent to SNS. A proxy service has been used as expected.
4. MySQL has been used as data storage through Amazon RDS.
5. Redis has been used to cache data. Data is looked up in Redis before hitting the database.
6. Custom monitoring has been used with nmap to check services health. Notifications are sent to SNS when failures are detected.

### Frontend

1. React App for the main website. Caching has been used to reduce unnecessary traffic with the backend, leveraging browser LocalStorage API.
Javascript and necessary files were stored in an S3 bucket and Cloudfront was used to serve them.
2. Android app based on Kotlin. Caching has been used to reduce traffic.
3. A browser extension pops up when user browses a known store, showing coupon codes available. It can also apply codes automatically if user requests it. This feature requires building a common base for coupon code application which relies on configuration that is specific to every store.