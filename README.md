# Jaga-me

This app serves to aid Jaga-Pros to manage multiple patients at any one time.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

```
git clone https://github.com/xueyongg/jagame.git
cd jagame
npm install

```

## Stack Information

Next.js is a lightweight framework for static and server‑rendered applications.

#### Things to note using Next.js
1. All the pages of the application falls under /pages folder.
2. Next.js uses the App component to initialize pages. Thus adding context set up into [_app.js](https://nextjs.org/docs/#custom-<app>) ensures all pages have easy access to the main context of the application.
3. [_document.js](https://nextjs.org/docs/#custom-<document>) is used to set up the application's meta data.

| Concern         | Solution                                                        |
| --------------- | --------------------------------------------------------------- |
| Server          | [Node 8.5](https://nodejs.org/)                                 |
| Client State    | [React Context](https://reactjs.org/docs/context.html)          |
| Front-end Views | [React](https://facebook.github.io/react/)                      |
| Styling         | [React Semantic UI](https://react.semantic-ui.com/introduction) |


## Features

1. Multi-patient status overview
2. Search feature
3. Bookmark feature
4. Patient collection overview
5. PDF download feature
6. Local Storage Management

## Built With

* [Next.js](https://nextjs.org/) - The web framework used
* [Chart.js](https://github.com/reactjs/react-chartjs) - The chart component builders
