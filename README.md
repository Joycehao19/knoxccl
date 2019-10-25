# Website for KnoxCCL

Files for the Citizens' Climate Lobby chapter site in Knoxville, TN. Visit the
website at [knoxccl.org](http://knoxccl.org).

NPM and WebPack are used to bundle JavaScript and CSS libraries for the page. There are
several `npm run` targets at your disposal:

* clean - Uses `git clean -X -f` to clean up all build artifacts from the development folder
  (The `-X` means remove all files ignored by Git.)
* develop - Build JS/CSS, including service-worker.js, with fewer optimizations for easier
  debugging.
* build - Same as 'develop', but optimizing for deployment.
* deploy - runs `./sync-s3.sh` to push files to server (see section below)
* serve - launches the Python 3 static web server from the `dist/` folder

NOTE: `deploy` will set the current working directory (CWD) to be the project base folder.
Similarly, `serve` will set the CWD to the `/dist` subfolder.

There are also these additional targets:

* start - launches the WebPack dev server for local browsing/testing
* watch - invokes `webpack --watch` for automatic rebuilding during editing

WARNING: `start` and `watch` aren't yet trustworthy. They don't appear to do the Workbox step.
At present, I trust explicit `build` or `deploy` followed by `serve`, which is a more
trustworthy test of the website as it will be served from AWS.

## Building and Deploying

    > npm run clean
    > npm run build

Now, `dist/index.js` and `dist/service-worker.js` will be up to date with the source code, and
many other assets will be created in `dist/` as well. If satisfied, then this is a good time to
`git commit` and `git push`. The following command will push the files to AWS Simple Storage
Service:

    > ./sync-s3.sh

or:

    > npm run deploy

The script will tell you what you need to do to create the appropriate invalidations on
CloudFront. In order to make sure that users always pull up the latest site version:

* It is very important that whenever `index.html` changes, to invalidate both `/` and
  `/index.html`.
* The `service-worker.js` file needs to be updated (see above), copied to S3 (sometimes the
  sync script fails to do this, so an `aws s3 cp` command must be done), and invalidated for
  pretty much any site changes.

## Whenever an update is made to the web site…

Make sure to update (or have someone else update) in these other places, too, where
appropriate.

* [Facebook](https://www.facebook.com/Citizens-Climate-Lobby-Knoxville-Chapter-159872501112806/)
* [Meetup.com](https://www.meetup.com/Citizens-Climate-Lobby-Knoxville/)
* [Google Calendar](https://calendar.google.com/calendar?cid=NWtnc2w2aGl0OG4wMDJraGd0bTVpaW9wazBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ)
* [Slack](https://knoxccl.slack.com/)
* [Google Group](https://groups.google.com/forum/#!forum/knoxccl)
