# Football Analyst

The Football Analyst application provides coaches, fantasy football players, and football enthusiasts with an in depth look into statistics, play calls, and team tendencies. This app allows the user to focus on specific down and quarter situations, pass distribution, and run locations. 

## Design Choices

* I decided to enable "useViewBoxReszing" for each of the dc.js charts. Responsiveness of charts when transitioning to resolutions less than 992px were less than ideal. Using the viewbox resizing parameter allowed for a better UI experience.

## Running the tests

Product testing was run manually and can be found [here](https://docs.google.com/spreadsheets/d/1JuIEZ_lForOe0CpePoWHY-vdiUOLn1gA_eFDugBtlLE/edit?usp=sharing) 

### Test Descriptions

These pages were tested:
* Index Page (Dashboard) 

Each of these pages were tested for:
* Layout, image, and font responsiveness to browser width and height resolutions.
* Button and Menu selections.
* Graph transitioning, redrawing, and rerendering due to user choices in the menu and/or other graphs
* Tutorial walkthrough


## Deployment
* Application was deployed on Heroku and can be found [here](https://football-analyst.herokuapp.com/)
* Database deployed on mLab 

## Built With

* [Flask 0.12.3](http://flask.pocoo.org/)
* [Pymongo 3.6.1](https://api.mongodb.com/python/current/)
* [Gunicorn 19.9.0](http://gunicorn.org/)
* [DC.js 2.1.0](https://dc-js.github.io/dc.js/) - Dimensional Charting
* [D3.js 3.5.3](https://d3js.org/) - Data Driven Documents
* [Crossfilter.js 1.3.5](http://square.github.io/crossfilter/) - Multidimensional Filtering and Charting
* [Intro.js 2.9.3](https://introjs.com/) - Tutorial Overlay
* [jQuery 3.2.1](http://code.jquery.com/) - Prerequisite for Bootstrap (CDN)
* [Bootstrap 3.3.7](https://getbootstrap.com/) - Grid system and layout
* [Google Fonts](fonts.google.com) - Carrois Gothic SC (CSS)

## Authors

* **Marc Marquez** - [Github Page](https://github.com/marc-marquez/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
