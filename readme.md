Omnichannel-UI
 ==============

This is the omnichannel-ui monorepo. All modules and channels exist in this repository.

Requirements:
-----------------------

* __Node 6.9.X__ (LTS)
* __Npm 5.5.1__ or newer preferred - might work with npm 4

## Setting up a dev environment

Run `npm run bootstrap`

This runs *npm install* for all modules and creates symlinks between all modules that depend on each other. This can take up to 15 minutes.

If you prefer, you can install lerna globally. This could be useful if you often need to run commands such as
*lerna exec -- whatever*. If you don't install lerna globally, you'd have to call it from *node_modules/.bin/lerna*.
If you choose to install lerna globally, be sure to install the exact version that is listed in lerna.json.
If you don't know that this means, you don't have to worry about it.

UI *modules* are in __packages__ folder.  
Runnable applications or *channels* are in __channels__ folder.  
Helper *utilities* are in __utilities__ folder.

## Running a channel

Navigate to *channels/channelName*.

Run `npm run dev` to start the frontend against your *locally running services*.


Run `npm run dev-devint` to start against *services running in devint*.


## Publishing modules
In **omnichannel-ui root** directory, where *lerna.json* resides, run
`lerna publish`

>Note: This command will not work from any other directory in the repository, and nor npm publish. If you need to manually publish something, you'll have to run npm publish from the root directory and specify the path to the module you want to publish.

Select the *approriate version number*.
Do your best to follow *semantic versioning* (http://semver.org).

We use lerna's fixed mode versioning (https://github.com/lerna/lerna#fixedlocked-mode-default), which means all modules have the *same major version number*.

Lerna will now update version numbers in each modules *package.json*, add an *npm dist-tag* and publish all changed modules to arfifactory. It also adds a git tag with with the version number you specified, and commits and pushes your changes to version control.

>Sidenote: You can enter a *custom version number* to create a prerelease/test version by adding a suffix to the version number, for example *15.2.1-test-release*. Modules versioned this way only get installed if this exact version number is specified in package.json.
