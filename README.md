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
enum:
  CarBrand:
    - Mercedes
    - Porsche
    - Audi
    - BMW

entity:
  Car:
    attributes:
      licence: Key
      brand: String!
      color: String
      mileage: Int
    seeds:
      50:
        licence:
          faker: vehicle.vin
        brand:
          sample: CarBrand
        color:
          sample:
            - red
            - green
            - white
            - black
        mileage:
          random:
            min: 10000
            max: 120000
```

As you might noticed we defined some seed data in the entity configuration. When you run the following command from the command line the datastore (per default a local file based NeDB database) will be populated with 50 car items using fake or random data.

```
npm run seed
```

The following command

```
cd express
npm run start:dev
```

will start a GraphqlAPI endpoint at `http://localhost:3000/graphql` 

If you point your browser to this address you will find full fledged GraphQL API whith many queries and mutations you can interact with.

To see the just seeded car items you could call the following GraphQL query: 

```graphql
query {
  cars( 
    filter: { brand: { is: "Mercedes" } }
    sort: mileage_DESC
    paging: { page: 0 size: 3 }
  ){
    id
    licence
    brand
    color
    mileage
    createdAt
  }
}
```

which would give the 3 Merceds cars with the highest mileage:

```json
{
  "data": {
    "cars": [
      {
        "id": "DGRDYT8Fh80WZcF8",
        "licence": "X5OG8PM3WGFE67434",
        "brand": "Mercedes",
        "color": "red",
        "mileage": 90308,
        "createdAt": "2021-01-05T21:53:09.382Z"
      },
      {
        "id": "hDP1CJzydiaqAk88",
        "licence": "MXWUINMZGIWS69138",
        "brand": "Mercedes",
        "color": "green",
        "mileage": 90066,
        "createdAt": "2021-01-05T21:53:09.382Z"
      },
      {
        "id": "G2zQBcVAzqA6owb8",
        "licence": "QTMWLP9TQ7QN76272",
        "brand": "Mercedes",
        "color": "green",
        "mileage": 52120,
        "createdAt": "2021-01-05T21:53:09.381Z"
      }
    ]
  }
}
```

If you go to `http://localhost:4200/` you will access the ActiveQL Admin application that gives a nice UI basic CRUD operations on your entites - in our example, just the 
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

