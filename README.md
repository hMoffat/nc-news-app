# NC News App

Find the netifly hosted deployment here:
https://nc-news-hmoffat.netlify.app

Made as a one week front end project in a Software Development bootcamp, this project will continue to be updated at the end of the course. At this time, mobile view is recommended for a better experience.

## NC News API

The data used in the app is requested from the companion NC News API (also made as a one week project on the bootcamp). The repo can be found here: https://github.com/hMoffat/NC-News

## About

A React project written in javascript and created with Vite (for initial configuration and build).

This is a social news app with rated articles which can be organised by topic and with discussion via comments. Users can vote on articles and comments.

For demonstration purposes the logged in user is set to 'happyamy2016'.

Use the filter options at the top of the page to go to a specific topic, change the property artciles are sorted by and the sort order.

Click on an article heading or image to go to that article page where there are options to like/dislike, comment and vote on other 'users'' comments.

## How to run this project locally

Minimum version of node: v20.8.0

### Clone the repo

In the command line, ensuring you are in your chosen directory, run `git clone https://github.com/hMoffat/nc-news-app.git`

### Install required packages

First move into the root directory of the cloned repo with:
`cd nc-news-app`

This project relies on some packages. You can install them with:
`npm install`

### View a preview

Enter the Vite command line interface by running:
`npm run dev`

This will start the dev server. In the terminal Vite will give you the link for the locally hosted preview.

To exit the Vite command line interface use 'Ctrl+C' / 'Cmd+C'.
