import { VillageState } from './villageState.js';
import { randomRobot, routeRobot, goalOrientedRobot } from './robots.js';
import { runRobot, compareRobots } from './test.js';

console.log("Running Random Robot:" )
runRobot(VillageState.random(), randomRobot )

console.log("\nRunning Route Robot:" )
runRobot(VillageState.random(), routeRobot, [] )

console.log("\nRunning Goal-Oriented Robot:")
runRobot(VillageState.random(), goalOrientedRobot, [])

console.log("\nComparing Route Robot and Goal-Oriented Robot:")
compareRobots(routeRobot, [], goalOrientedRobot, [])
