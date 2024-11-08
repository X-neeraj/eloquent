import { roadGraph } from './graph.js';
import { findRoute } from './routeFind.js';

export const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

export function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}

export function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

export function goalOrientedRobot({ place, parcels }, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place )
        } else {
            route = findRoute(roadGraph, place, parcel.address )
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length )
    return array[choice];
}
