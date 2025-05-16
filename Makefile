#!make
# Makefile for direbali.github.io

.PHONY: dev init build

dev:
	npm run dev

init:
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

