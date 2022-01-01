const axios = require("axios");
/*
 * Complete the 'getTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING team
 *  2. INTEGER year
 */
async function getTotalGoals(team, year) {
    let count = 0;
    const api = "https://jsonmock.hackerrank.com/api/";
    let res = await axios.get(api + "football_matches?year=" + year + "&team1=" + team);
    let result = res.data;
    let total_pages = result.total_pages || 1;
    for(let i = 1; i <= total_pages; i++) {
        const res = await axios.get(api + "football_matches?year=" + year + "&team1=" + team + "&page=" + i);
        const result = res.data;
        const data = result.data;
        if(Array.isArray(data)){
            data.forEach(d => {
                count+=Number(d.team1goals);
            });
        }
    }

    res = await axios.get(api + "football_matches?year=" + year + "&team2=" + team);
    result = res.data;
    total_pages = result.total_pages || 1;
    for(let i = 1; i <= total_pages; i++) {
        const res = await axios.get(api + "football_matches?year=" + year + "&team2=" + team + "&page=" + i);
        const result = res.data;
        const data = result.data;
        if(Array.isArray(data)){
            data.forEach(d => {
                count+=Number(d.team2goals);
            });
        }
    }
    return count;
}