import { VillageState } from "./villageState.js";
export function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`)
            break;
        }
        let action = robot(state, memory)
        state = state.move(action.direction)
        memory = action.memory;
        console.log(`Moved to ${action.direction}`)
    }
}

export function compareRobots(robot1, memory1, robot2, memory2) {
    let totalTurnsRobot1 = 0;
    let totalTurnsRobot2 = 0;

    for (let i = 0; i < 100; i++) {
        let task = VillageState.random()

        let state1 = task;
        let memory1Copy = memory1.slice()
        let turns1 = 0;
        while (state1.parcels.length > 0) {
            let action = robot1(state1, memory1Copy)
            state1 = state1.move(action.direction)
            memory1Copy = action.memory;
            turns1++;
        }
        totalTurnsRobot1 += turns1;

        let state2 = task;
        let memory2Copy = memory2.slice()
        let turns2 = 0;
        while (state2.parcels.length > 0) {
            let action = robot2(state2, memory2Copy)
            state2 = state2.move(action.direction)
            memory2Copy = action.memory;
            turns2++;
        }
        totalTurnsRobot2 += turns2;
    }

    console.log(`Robot 1 took an average of ${totalTurnsRobot1 / 100} turns per task`)
    console.log(`Robot 2 took an average of ${totalTurnsRobot2 / 100} turns per task`)
}
