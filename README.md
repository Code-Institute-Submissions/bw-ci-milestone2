# Bingemend - a movie recommendation site
Milestone 2 project @ Code Institute  -- Interactive Front End Development module. Movie recommendation website.
### Demo
A live version of the project can be found [here](https://badziobw.github.io/bw-ci-milestone2/) hosted via Github Pages

This site aims to give a user quick information about a movie or a tv show. It also displays random and popular movie in order to give a recommendation. 

## UX

My main focus when planning the design of this site was to allow users to find a movie or a show that he/she would like to watch with as few mouse clicks as possible.
To achieve this I have focused on simplistic design and user interface throughout the site. The goal of the UX design was to make a website simple to use on both mobile devices and PC.

## User Stories

* User 1 - As a movie enthusiast I want to be able to search all types of movies in one place ('Search bar at central position on the website')
* User 2 - I want to be able to find out as much detail about a movie/tv show as possible without leaving the site. ('More Info modals')
* User 3 - As a casual viewer I want to get a quick recommendation on what to watch based on other peoples opinions

## Features

The first look after loading a site shows simple navigation bar that allows user to jump straight to each section of the webpage.
Additionally at the centre there is easily visible searchbar that allows user to quickly find any movies/shows he/she would like. 
The remaining space is occupied by a Featured Movie container that displays a random movie on every refresh.
Movies in this container are from 'Trending' dataset of the TMBD Api used throughout the project.
Remainder of the site displays 3 columns with Most Popular Movies/Shows and Upcoming Releases. The purpose of these is to give a user an idea of what other movie/show other have liked or are looking forward to. 
Each of the listed movies shows a short description, amount of views and average rating/release date.

## Wireframes

![main wireframe](/assets/uxd/wireframe1.jpg)
![featured movie area](/assets/uxd/wireframe2.jpg)
![column layout](/assets/uxd/wireframe3.jpg)
![mobile device](/assets/uxd/wireframe4.jpg)

## Future Features

Initially my goal was to add more functionality to the site. My plan is to add all those features as a seperate git branch after the project's deadline.

- On mobile devices this functionality will be replaced with each container having an option to swipe left/right loading more information about the movie/show.
- Clicking the movie poster image on the desktop view shows full size of a poster.
- The design I regret being unable to implement the most is pagination inside the 3 columns. Currently the site only displays top 5 of each column the goal is to load minimum top 20 movies displayed in blocks of 5 and pagination to show the rest.

## Technologies Used

- TMDB API
- HTML 5 
- CSS3
- Bootstrap 4
- Javascript
- Git
- Font Awesome
- Google Fonts
- TMDB Api

## Testing

### Test Successful

* More Info button Modal 
    * clicking on 'More Info' button should display modal on both desktop and mobile views, all the data inside the modal should display neatly and be responsive.
    * the modal should close only when clicking 'X' or outside of the content container of the modal.

* Correct attribute ( target="blank" ) is used for all external links to display foreign websites in new tab.
* Featured Container Carousel should work on all mobile devices.

### Test Unsucessful

* Featured Container Carousel does not work on Chrome's mobile browser, tested on multiple smartphones.
## Deployment

The site is hosted on GitHub Pages and is update automatically with every commit to the master branch.
The site can be run locally  by cloning the repository onto your machine and opening with an editor of choice. This is done using >'git clone https://github.com/badziobw/bw-ci-milestone2.git 
in the terminal, the files are then copied onto your hard drive. 

## Credits


This project is for eductional use.


