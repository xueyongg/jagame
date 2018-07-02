# Jaga-me

This app serves to aid Jaga-Pros to manage multiple patients at any one time.
Check it out (here)[https://xueyongg.github.io/jagame/]


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
4. Context was used to deal with the issue of props drilling. In this case, we are initializing the jaga-pro's session right from the initiation of the application, and will attempt to update that jaga-pro based on the patients that he is dealing with.

| Concern         | Solution                                                        |
| --------------- | --------------------------------------------------------------- |
| Server          | [Node 8.5](https://nodejs.org/)                                 |
| Client State    | [React Context](https://reactjs.org/docs/context.html)          |
| Front-end Views | [React](https://facebook.github.io/react/)                      |
| Styling         | [React Semantic UI](https://react.semantic-ui.com/introduction) |


## Features

1. Multi-patient status overview
Chart and Statistics were used. This serves to give busy Jaga-Pros an easy overview of the patients they are currently dealing with.

2. Search feature
Implemented using React Semantic-UI, it serves to give an real time search experience.

3. Bookmark feature
This allows Jaga-Pros to indicate some of the frequently used products, so they need not search them when they are assigning them to each patient.

4. Patient collection billing overview
This aids the Jaga-Pro to ensure that the products selected and its selected quantity for each patient are clearly indicated along with its price.

This will also give the patient a better understanding of how the total payable amount is derived.

5. PDF download feature - (pdfMake)[https://github.com/bpampuch/pdfmake] was used.
A simple set up of PDF file based on the user information that is required. This will serve as a softcopy version of the patient's bill.

6. Local Storage Management
It utilizes cookie as its sessionID, thus cognito mode will not be used. Thus for every browser, you can only have one user as of current implementation.

## Built With

* [Next.js](https://nextjs.org/) - The web framework used
* [Chart.js](https://github.com/reactjs/react-chartjs) - The chart component builders
