# ActiveQL Starter Application

You can clone this repo and start developing a GrapqhQL API with an Admin UI in seconds. 

## ActiveQL 

A framework for building domain driven GraphQL APIs with an oppionated approach and _convention over configuration_ and _DRY_ in mind. Based on a simple domain configuration (mainly entities with attributes and their relationships) it 

  * generates a full GraphQL schema with aspects like searching, sorting, paging, permission access etc.   
  * provides a full fledged GraphQL API with resolvers - powered by [Apollo](https://www.apollographql.com) and [MongoDB](https://www.mongodb.com) (other Databases can be supported as well)
  * provides an Admin UI for basic CRUD applications 
  * allows to be extended for any non-convention requirement with custom code

You can find the [full documentation and a tutorial here](https://betterobjects.github.io/activeql/)


**If you don't want to use the Admin UI feel free to delete the `./angular` folder and skip any further Angular related steps.**


## Installation

After cloning please run 

```
cd express
npm install
```

```
cd angular
npm install
```

<br>

### Run the shell-applications

| in folder | command  |   |
| - | - | - |
| `./express` | `npm run start:dev`  | starts both the Express Apollo GraphQL server (port 3000) <br> and Angular Admin UI application (port 4200) <br> with debugging and reloading when config files have changed  |
| `./express` | `npm run server:dev` | starts only the ActiveQL Express Apollo GraphQL server (on port 3000) <br> with debugging and reloading when config files have changed |
| `./express` | `npm run server` | starts only the ActiveQL Express server (on port 3000) <br> without development features |
| `./angular` | `ng serve`       | starts only the Angular Admin UI application (on port 4200) |

<br>

### Quick Example

In the folder `./express/activeql/domain-configuration` create a YAML file, e.g. `car.yml` with the following content: 

```yaml
entity:
  Car:
    attributes:
      licence: Key
      brand: String!
      mileage: Int
```

You start a Graphql API endpoint at `http://localhost:4000/graphql` with this command

```
cd express
npm run start:dev
```

If you point your browser to this address you will find full fledged GraphQL API whith many queries and mutations you can interact with.

To create a car you could call the mutation: 

```graphql
mutation{
  createCar( car: { licence: "HH AQ 2021" brand: "Mercedes", mileage: 10000 } ){
    car{ id licence brand mileage }
  }
}
```

with the answer from your GraphQL API

```json
{
  "data": {
    "createCar": {
      "car": {
        "id": "GjgoJZ9RNHPQ1Pij",
        "licence": "HH AQ 2021",
        "brand": "Mercedes",
        "mileage": 10000
      }
    }
  }
}
```

If you go to `http://localhost:4200/` you will access the ActiveQL Admin application that gives a nice UI basic CRUD operations on your entites - in our example, just the "Cars" menu item.


<br>

### Repository structure

| Folder | Content |   
| - | - | 
| `./` | nothing interesting happens on the root folder level |  
| `./express`           | default Express application in which the ActiveQL Server library is used | 
| `./express/app.ts`    | creates default Express app that integrates the ActiveQL Apollo Server | 
| `./express/activeql`  | all code and configuration for the GraphQL API | 
| `./express/activeql/activeql-app.ts` | entry point for the configuration and starting the ActiveQL Apollo Server | 
| `./express/activeql/domain-configuration`  | default folder for entity and enum configuration yaml files | 
| `./express/activeql/impl`  | default folder for custom javascript/typescript code  | 
| `./express/upload`    | default folder all uploaded files are stored and served from | 
| `./express/db`        | default folder for the [NeDB](https://github.com/louischatriot/nedb) files (when using the [NedbDatastore](https://github.com/betterobjects/activeql/blob/master/activeql-server/nedb-datastore/nedb.data-store.ts)) | 
| `./angular`           | default Angular application in which the ActiveQL Admin UI module is used |
| `./angular/src`       | components and services embedding the ActiveQL Admin UI |

