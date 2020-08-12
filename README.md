# Travel-App

*SoftUni ReactJS Course Project - August 2020

## Project Description

This is a website of a travel agency which offers trips to different destinations. Admins can add new trips and edit existing ones, while users can browse through the existing trips, choose their desired one, pick additional trips within the selected one (if available) and place their order.
ReactJS is used for the client-side, backend  - NodeJS, MongoDB.

## Installation and Prerequisites

After code is downloaded, all dependecies should be installed (`npm install`). After that project can be started by running `npm start`. Front end (in folder *react*) is running on http://localhost:3000/, backend API - on http://localhost:9999/. The API is in the same repository in folder *api*. You would need to have NodeJS and MongoDB preinstalled.

## Routes and User Roles (Accessibility)

| Page               | Route        | Guest            | User             | Admin            |
| -----              |-------       | -------------    |------            |-------           |
| Home               |/             |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Calendar Filter    |/calendar     |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Destinations Filter|/destinations |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Last Minute Filter |/lastminute   |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Search Results     |/search       |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Register           |/register     |:heavy_check_mark:|       :x:        |         :x:      |
| Login              |/login        |:heavy_check_mark:|       :x:        |         :x:      |
| Trip Details       |/details/:id  |:x:               |:heavy_check_mark:|:heavy_check_mark:|
| Create Trip        |/create       |:x:               |:x:               |:heavy_check_mark:|
| Edit Trip          |/edit/:id     |:x:               |:x:               |:heavy_check_mark:|
| User Profile       |/profile      |:x:               |:heavy_check_mark:|:x:               |
| Admin Panel        |/profile      |:x:               |:x:               |:heavy_check_mark:|


