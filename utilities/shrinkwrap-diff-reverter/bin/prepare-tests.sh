#!/usr/bin/env bash

basePath=`pwd`

cd fixture
dirs=(`ls -1d * | grep -v \.git$`)

cd $basePath

for d in ${dirs[@]}; do
	repoDir="$basePath/testbench/$d.git"
	mkdir -p $repoDir
	cd $repoDir

	git init
	rsync --exclude "*.changed.json" -r $basePath/fixture/$d/* .
	find . -maxdepth 3 -type f -name '*.initial.json' -execdir sh -c 'mv {} npm-shrinkwrap.json' \;

	git add */npm-shrinkwrap.json
	git commit -m "Added initial shrinkwrap files."
done

exit 0
