.PHONY: download create

download:
	node process/download-doc.js

create:
	npm init -y
