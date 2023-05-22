import {getRandomizer} from "./getRandomizer";

// Source: https://stackoverflow.com/a/12646864/8521718
/**
 * Randomly shuffles the given array
 * @param array The array to be shuffled in place
 * @param random The random seed to use for shuffling
 */
export function shuffleArray(array: any[], random: () => number = getRandomizer(0)) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
