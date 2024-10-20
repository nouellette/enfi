# Enfi

The purpose of the project is to demonstrate the sensitivity of LLMs to the order of inputs in Multiple Choice Questions.

## Assumptions
Given the short nature of this assessment crafting a better prompt could yield better results. Each answer was produced from a single prompt, adding additional layers of validation could also yield much better results. Also the selection of question/answers pairs drastically changes the results. My examples were cherry picked to prove the sensitivity and isn't an actual sampling. Lastly model selection is key and selecting an inferior model will certainly display the problem but may be a product of a model not fully trained with the correct amount of parameters.

## Supplemental
This project contains a server (back-end) that will serve up UI files and add support for the UI. The UI (front-end) is a svelte framework, the css has intentionally been placed in a single file to keep out of the svelte files for easy reading. All configuration files are at the root of the project and the server + ui are in their subsequent folders isolated from one another.

## Dependency
`Node version: >=20.16.0` // Recommend using NVM

Create `.env` file at root with this data (modify your OPENAI_KEY to yours):

```
HOSTNAME=127.0.0.1
PORT=3000
OPENAI_KEY=sk-proj-*********
```

## Install
`npm i`

## Run in production
`npm run build:ui`

`npm start`

`Open a browser and access by going to http://localhost:3000/`

## Run in development (hot reload)
`npm run serve:ui`

`npm run dev`

## Test
`npm run test`