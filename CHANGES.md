Breaking or significant changes in Omnichannel-UI
=================================================

17.10.2017
==========

It is now possible to bootstrap the repository without globally installing lerna. Running *npm run bootstrap* installs
lerna locally and uses it to bootstrap the project. You can resume using globally installed lerna but be sure
to use the same version that the project uses (see lerna.json).

Npm script called *publish* has been added to package.json to enable running lerna publish with the locally installed
lerna. It is also possible to call the local installation directly from *node_nodules/.bin/lerna*.

You are encouraged to use npm >= 5.5.1 for best bootstrap performance.
