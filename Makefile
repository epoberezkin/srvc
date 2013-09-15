REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--recursive \
		--reporter $(REPORTER)

.PHONY: test
