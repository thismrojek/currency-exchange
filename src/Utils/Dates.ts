export default class Dates {
    static getYearsArray(start: number, end: number) {
        let yearsArray: number[] = [];

        for (let i = start; i <= end; i++) yearsArray.push(i);
        return yearsArray;
    }
}