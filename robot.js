const roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];

export function buildGraph(edges) {
  let graph = Object.create(null )
  function addEdge(from, to) {
    if (from in graph) {
      graph[from].push(to )
    } else {
      graph[from] = [to];
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to )
    addEdge(to, from )
  }
  return graph;
}

const roadGraph = buildGraph(roads )

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return { place: destination, address: p.address };
      }).filter(p => p.place != p.address )
      return new VillageState(destination, parcels )
    }
  }
}

let first = new VillageState(
  "Post Office",
  [{ place: "Post Office", address: "Alice's House" }]
 )
// let next = first.move("Alice's House" )

// console.log(next.place )
// console.log(next.parcels )
// console.log(first.place ) 

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns` )
      break;
    }
    let action = robot(state, memory )
    state = state.move(action.direction )
    memory = action.memory;
    console.log(`Moved to ${action.direction}` )
  }
}


function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length )
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph) )
    let place;
    do {
      place = randomPick(Object.keys(roadGraph) )
    } while (place == address )
    parcels.push({ place, address } )
  }
  return new VillageState("Post Office", parcels )
};

runRobot(VillageState.random(), randomRobot )

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}
runRobot(VillageState.random(), routeRobot, [] )

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place )
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) } )
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
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

runRobot(VillageState.random(), goalOrientedRobot, [] )

function compareRobots(robot1, memory1, robot2, memory2) {
  let totalTurnsRobot1 = 0;
  let totalTurnsRobot2 = 0;

  for (let i = 0; i < 100; i++) {
    let task = VillageState.random( )


    let state1 = task;
    let memory1Copy = memory1.slice( )
    let turns1 = 0;
    while (state1.parcels.length > 0) {
      let action = robot1(state1, memory1Copy )
      state1 = state1.move(action.direction )
      memory1Copy = action.memory;
      turns1++;
    }
    totalTurnsRobot1 += turns1;

    let state2 = task;
    let memory2Copy = memory2.slice( )
    let turns2 = 0;
    while (state2.parcels.length > 0) {
      let action = robot2(state2, memory2Copy )
      state2 = state2.move(action.direction )
      memory2Copy = action.memory;
      turns2++;
    }
    totalTurnsRobot2 += turns2;
  }

  console.log(`Robot 1 took an average of ${totalTurnsRobot1 / 100} turns per task` )
  console.log(`Robot 2 took an average of ${totalTurnsRobot2 / 100} turns per task` )
}

compareRobots(routeRobot, [], goalOrientedRobot, [] )