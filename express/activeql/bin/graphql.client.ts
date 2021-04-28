import _ from 'lodash';
import http from 'http';
import https from 'https';
import {SubscriptionClient} from 'graphql-subscriptions-client';

// evil hack but works
Object.assign(global, { WebSocket: require('ws') });

const LOCAL = false;
const HOST = LOCAL ? 'localhost' : 'iq-arena.herokuapp.com';
const PORT = LOCAL ? 4000 : 443;
const HTTP = LOCAL ? http : https;
const WS = LOCAL ? 'ws' : 'wss';

const subscriptions = [];

const client = new SubscriptionClient(`${WS}://${HOST}:${PORT}/graphql`, {
  reconnect: true,
  lazy: true, // only connect when there is a query
  connectionCallback: error => error && console.error(error)
});

export const graphqlSubscribe = (query:string, variables:any, callback:(data:any)=>void, errorCallback?:(error:any)=>void) => {
	subscriptions.push( client.request({query, variables}).subscribe(
    (data:any) => callback(_.get(data, 'data')),
    (error:any) => errorCallback ? errorCallback( error ) : console.error( {error} ) ));
};

export const graphqlCall = (query:string, variables?:any) => new Promise( (resolve, reject) => {
  const data = JSON.stringify({query, variables});
  const options = {
    hostname: HOST,
    port: PORT,
    path: '/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  const request = HTTP.request(options, (response) => {
    let buffer = '';
    response.on('data', (chunk) => buffer += chunk );
    response.on('end', () => {
      try {
        const data = _.size( buffer ) ? JSON.parse( buffer ) : {};
        resolve( _.has( data, 'data' ) ? _.get( data, 'data' ) : data );
      } catch (error) {
        console.error( error, buffer );
      }
    });
  });
  request.on('error', (error) => {
    console.error( error );
    reject( error )
  });
  request.write(data);
  request.end();
});
