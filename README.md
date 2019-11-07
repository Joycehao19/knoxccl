# Website for KnoxCCL

Files for the Citizens' Climate Lobby chapter site in Knoxville, TN. Visit the
website at [knoxccl.org](http://knoxccl.org).

[NPM](https://docs.npmjs.com/about-npm/) and [WebPack](https://webpack.js.org) are used to
bundle JavaScript and CSS libraries for the page. There are several `npm run` targets at your
disposal:

* clean - Removes the `dist` build folder and its contents.
* develop - Build JS/CSS, including service-worker.js, with fewer optimizations for easier
  debugging.
* build - Same as 'develop', but optimizing for deployment.
* deploy - Prints a message about how to deploy. We're using AWS Amplify, pointed at the
  `master` branch on AWS CodeCommit, so any push to that branch results in a build in AWS,
  with deploy to the Amplify CDN upon successful build.
* serve - Launches a local static content web server from the `dist/` folder.

There are also these additional targets:

* start - launches the WebPack dev server for local browsing/testing
* watch - invokes `webpack --watch` for automatic rebuilding during editing

WARNING: `npm run start` and `npm run watch` aren't yet trustworthy. They don't appear to do
the Workbox step. At present, I trust explicit `npm run build` or `npm run develop` followed by
`npm run serve`, which is a more trustworthy test of the website as it will be served from AWS.

## Making Changes

In general, work in feature branches, or the `develop` branch. The `master` branch is special.
Whenever changes are pushed to `master` on the AWS CodeCommit repository, a new version of the
website is build on AWS infrastructure, and deployed to the AWS Amplify CDN (if build was
successful).

### Source Structure

* `README.md` - this file
* `package.json` - NPM dependencies, see
  [docs.npmjs.com](https://docs.npmjs.com/creating-a-package-json-file)
* `package-lock.json` - describes exact dependency installations at a point in time; see
  [docs.npmjs.com](https://docs.npmjs.com/files/package-lock.json)
* `webpack.config.js` - Defines the WebPack build process
* `postcss.config.js` - seems to be necessary for CSS loader, initially set to empty config
* `.booststraprc` - Used to configure `bootstrap-loader` and include only what is needed by the
  site
* `serve.sh` - Helpful script for launching a static HTTP server for local testing
* `src/` - Files that are processed by WebPack build processes to generate output in `dist/`.
* `src/index.js` - The WebPack entry point
* `static/` - Static content files that get copied, unmodified, by WebPack into dist.

In addition, these folders are generated when building the site and are `.gitignore`'d:

* `dist/` - Where WebPack builds the working static site.
* `node_modules/` - Where all NPM dependences are placed

## Building and Deploying

    > npm run clean
    > npm run build

The `dist` build folder will be removed by the first command, and re-built by the second
command. You can then try a local version of the site with:

    > npm run serve

If the site is ready for deployment, commit the changes to Git.

    > git add […]
    > git commit
    > git push

The script will tell you what you need to do to create the appropriate invalidations on
CloudFront. Remember, while it is good to "backup" by pushing `develop` and feature branches,
only pushes to the `master` branch on the AWS Code Commit repository will result in the website
being redeployed/updated.

## To Publicize Significant Site Changes…

Make sure to update (or have someone else update) in these other places, too, where
appropriate.

* [Facebook](https://www.facebook.com/Citizens-Climate-Lobby-Knoxville-Chapter-159872501112806/)
* [Meetup.com](https://www.meetup.com/Citizens-Climate-Lobby-Knoxville/)
* [Google Calendar](https://calendar.google.com/calendar?cid=NWtnc2w2aGl0OG4wMDJraGd0bTVpaW9wazBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ)
* [Slack](https://knoxccl.slack.com/)
* [Google Group](https://groups.google.com/forum/#!forum/knoxccl)
