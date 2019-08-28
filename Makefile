.PHONY: create download

create:
	npm init -y

download:
	node process/download-doc.js
