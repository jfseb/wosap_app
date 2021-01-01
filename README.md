# wosap_app

Web application for nlq quering of domain models 

This is a stripped down version of fdevstart
with updated dependencies

 1. without database requirement
 2. without electron desktop packaging
 3. with generically generated index pages. 

Goal is to host this on an aribtrary model folder


```
npm install 

nmp test

npm run server
```

default PORT is 42042, but can be overridden via environment 
set PORT=8080

the model can be set via environment NLQ_ABOT_MODELPATH
```
set NLQ_ABOT_MODELPATH=...\model
```

# development 

The actual bot (and testmodels are in ) [nlq_abot](https://github.com/jfseb/nlq_abot/tree/main)


# Webpack 

note:  use the umd variants of  react / react-dom 