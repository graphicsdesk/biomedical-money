.PHONY: download deploy build

download:
	node process/download-doc.js

build:
	parcel build src/index.html --public-url ./
	# git worktree add dist gh-pages
	cd dist && git add . && git commit -m 'Deploy to gh-pages' && git push origin gh-pages


