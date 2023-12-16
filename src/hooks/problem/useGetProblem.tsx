import type { GameContentsType } from "@/types/GameContents";
import type { PracticeContentsType } from "@/types/PracticeContents";



export const useGetProblem = (gameContents: Array<GameContentsType>, practiceContents: Array<PracticeContentsType>) => {
    const problem = []

    gameContents.forEach(contents => {
        if (contents) {
            contents.problems.forEach(problems => {
                problem.push(problems)
            });
        }
    });

    practiceContents.forEach(contents => {
        if (contents) {
            contents.problems.forEach(problems => {
                problem.push(problems)
            });
        }
    });
    return problem
}