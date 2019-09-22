.PHONY: download deploy

download:
	node process/download-doc.js

deploy:
	cd dist
	git add .
	git commit -m 'Deploy to gh-pages'
	git push origin gh-pages
