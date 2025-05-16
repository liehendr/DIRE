#!make
# Makefile for direbali.github.io

.PHONY: dev init build publish clean

dev:
	npm run dev

init: clean
	git submodule init
	git submodule update
	npm run init

build:
	npm run build

publish: build clean
	rsync -acis index.html public/
	rsync -acis --delete assets/ public/assets/
	rsync -acis --delete play/ public/play/
	rsync -acis --delete src/ public/src/

clean:
	@cd public/ && git clean -dfx

