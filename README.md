# Travel-App

*SoftUni ReactJS Course Project - August 2020*

## Project Description

This is a website of a travel agency which offers trips to different destinations. Admin users can add new trips and edit or delete existing ones, guest users can browse through the existing trips, while registered users can also view the trips details, choose their desired one, pick additional trips within the selected one (if available) and place their order.
ReactJS is used for the client-side, backend - NodeJS, Express JS and MongoDB.

## Installation and Prerequisites

After code is downloaded, all dependecies should be installed (`npm install`). After that project can be started by running `npm start`. Front end (in folder *react*) is running on http://localhost:3000/, backend API - on http://localhost:9999/. The API is in the same repository in folder *api*. You would need to have NodeJS and MongoDB preinstalled.

## Routes and User Roles (Accessibility)

| Page               | Functionality                                             | Route        | Guest            | User             | Admin            |
| -----              | --------------                                            |-------       | -------------    |------            |-------           |
| Home               | View Home Page and all available trips                    |/             |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Calendar Filter    | View all available trips for a particular month           |/calendar     |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Destinations Filter| View all trips for a particular destination               |/destinations |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Last Minute Filter | View all trips starting in the next 7 days (reduced price)|/lastminute   |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Search Results     | View all trips filtered by key word                       |/search       |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| About              | View About Page (static)                                  |/about        |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Contacts           | View Contacts Page (static)                               |/contacts     |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Register           | New user registration                                     |/register     |:heavy_check_mark:|       :x:        |         :x:      |
| Login              | Sign in for existing user                                 |/login        |:heavy_check_mark:|       :x:        |         :x:      |
| Trip Details       | View trip details                                         |/details/:id  |:x:               |:heavy_check_mark:|:heavy_check_mark:|
| Trip Details       | Delete Trip (after confirmation)                          |/details/:id  |       :x:        |       :x:        |:heavy_check_mark:|
| Trip Details       | Purchase Trip (after confirmation of details)             |/details/:id  |       :x:        |:heavy_check_mark:|       :x:        |
| Create Trip        | Create new trip                                           |/create       |:x:               |:x:               |:heavy_check_mark:|
| Edit Trip          | Edit existing trip                                        |/edit/:id     |:x:               |:x:               |:heavy_check_mark:|
| User Profile       | View All Orders (created by that user)                    |/profile      |:x:               |:heavy_check_mark:|:x:               |
| Admin Panel        | View All Users and make selected user admin               |/profile      |:x:               |:x:               |:heavy_check_mark:|


