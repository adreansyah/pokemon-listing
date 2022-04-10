# pokemon-listing

<!-- ## crrencies Demo
![Alt text](/src/images/isimg.gif)
 -->

This project created by requirement the following :

1.Build a web app using React.js (allowed to use Create React App, Create Next
App, or your own starter template) that has 3 pages, Pokemon List, Pokemon
Detail, and My Pokemon List. Your web app UI/UX should be mobile-first &
single page application (SPA) and follow requirements listed below.

2. You can use Rest-API from https://pokeapi.co/ as your data source. But using
GraphQL (graphql-pokeapi) is a big plus.

# Features!

- Pokemon Listing.
- Pokemon Detail.
- Pokemon pick user owned.
- Pokemon Removed user owned.

### Tech!

The tech, i used the folowing:

- React.js use hooks Next.js.
- Graphql.
- contextAPI.
- Material -UI - styling framework.
- Node v14.17.3
- npm 6.14.13.
- TypeScript.

## Folder Structure

```
pokemon-listing/
  ...
  assets/
    img/..img
  component/
    base-component/
      card-list.tsx
      Header.tsx
      infinite-scroll.tsx
      modal-card.tsx
      Segment.tsx
    main-component/
      listing-data.tsx
  configs/
    pokemon-gql/
        apollo-client.tsx
        index.tsx
    ReferenceDataContext.tsx
  pages/{ for all main pages and script }
    
   
```

### Folder Structure Description

- `assets` image.
- `component` ui component.
- `pages` implementation component as view
- `configs` graphql and context api

### Getting Started

Clone and run application.

```sh
$ cd /{YOUR_PATH_FOLDER}/
$ git clone "https://github.com/adreansyah/pokemon-listing.git"
$ cd pokemon-listing/
```

1. Start Next.js Using yarn

```sh
$ cd pokemon-listing/
$ sudo yarn install
$ sudo yarn dev
```

2. Start Next.js Using npm

```sh
$ cd pokemon-listing/
$ sudo npm install
$ sudo npm run dev
```

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/adreansyah/pokemon-listing)
