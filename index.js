const fs = require("fs");
const readline = require("readline");
const csv = require("csvtojson");
var failedThings = [];
var productValueNameAndWeights = {};
var data;
var listOfMetrics = { "Budget(USD)": "", "Impressions": "", "Clicks": "", "CTR": "", "Spend(USD)": "", "CPC(USD)": "", "Orders": "", "Sales(USD)": "", "ACOS": "", "ROAS": "", "NTB orders": "", "% of orders NTB": "", "NTB sales": "", "% of sales NTB": "" };
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Do you need to select a new CSV file? Say 'true' or 'false'.", (reply) => {
    if (reply == "true") {
        rl.question("Drag and drop file", (path) => {
            if (path.startsWith('"')) {
                path = path.substring(1, path.length - 1);
            } else if (path.startsWith('&')) {
                path = path.substring(3, path.length - 1);
            }
            console.log(path);
            try {
                csv()
                    .fromFile(path)
                    .then((jsonObj) => {
                        data = jsonObj;
                        fs.writeFileSync("dataLoc.txt", path);
                        doTheThing()
                    })
            } catch (e) {
                console.error("An error occurred. Please restart the program.");
                console.error(e);
                rl.close();
            }
        });
    } else {
        var path = fs.readFileSync("dataLoc.txt");
        try {
            csv()
                .fromFile(path)
                .then((jsonObj) => {
                    data = jsonObj;
                    doTheThing()
                })
        } catch (e) {
            console.error("An error occurred. Please restart the program.");
            console.error(e);
            rl.close();
        }
    }
    async function doTheThing() {
        rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[0]}`, (answer) => {
            listOfMetrics[Object.keys(listOfMetrics)[0]] = (parseInt(answer));
            rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[1]}`, (answer) => {
                listOfMetrics[Object.keys(listOfMetrics)[1]] = (parseInt(answer));
                rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[2]}`, (answer) => {
                    listOfMetrics[Object.keys(listOfMetrics)[2]] = (parseInt(answer));
                    rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[3]}`, (answer) => {
                        listOfMetrics[Object.keys(listOfMetrics)[3]] = (parseInt(answer));
                        rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[4]}`, (answer) => {
                            listOfMetrics[Object.keys(listOfMetrics)[4]] = (parseInt(answer));
                            rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[5]}`, (answer) => {
                                listOfMetrics[Object.keys(listOfMetrics)[5]] = (parseInt(answer));
                                rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[6]}`, (answer) => {
                                    listOfMetrics[Object.keys(listOfMetrics)[6]] = (parseInt(answer));
                                    rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[7]}`, (answer) => {
                                        listOfMetrics[Object.keys(listOfMetrics)[7]] = (parseInt(answer));
                                        rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[8]}`, (answer) => {
                                            listOfMetrics[Object.keys(listOfMetrics)[8]] = (parseInt(answer));
                                            rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[9]}`, (answer) => {
                                                listOfMetrics[Object.keys(listOfMetrics)[9]] = (parseInt(answer));
                                                rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[10]}`, (answer) => {
                                                    listOfMetrics[Object.keys(listOfMetrics)[10]] = (parseInt(answer));
                                                    rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[11]}`, (answer) => {
                                                        listOfMetrics[Object.keys(listOfMetrics)[11]] = (parseInt(answer));
                                                        rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[12]}`, (answer) => {
                                                            listOfMetrics[Object.keys(listOfMetrics)[12]] = (parseInt(answer));
                                                            rl.question(`Enter the weight for ${Object.keys(listOfMetrics)[13]}`, (answer) => {
                                                                listOfMetrics[Object.keys(listOfMetrics)[13]] = (parseInt(answer));
                                                                runTheThings();
                                                                rl.close();
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    function runTheThings() {
        var i = 0
        while (i < Object.keys(data).length) {
            var e = 0
            var currentCampaign = data[i].Campaigns;
            while (e < 14) {
                var currentValue = Object.keys(listOfMetrics)[e];
                var weightOfCurrentValue = listOfMetrics[currentValue];
                var valueOfCurrentValueLol = data[i][currentValue];
                if (!productValueNameAndWeights[currentCampaign]) {
                    productValueNameAndWeights[currentCampaign] = {};
                }
                if (!productValueNameAndWeights[currentCampaign].value) {
                    productValueNameAndWeights[currentCampaign].value = parseInt(valueOfCurrentValueLol);
                } else {
                    productValueNameAndWeights[currentCampaign].value = productValueNameAndWeights[currentCampaign].value + parseInt(valueOfCurrentValueLol);
                }
                productValueNameAndWeights[currentCampaign][currentValue] = { "value": valueOfCurrentValueLol, "weight": weightOfCurrentValue, "result": weightOfCurrentValue * valueOfCurrentValueLol };
                e++;
            }
            i++
        }
        var text = "";
        for (let i = 0; i < Object.keys(productValueNameAndWeights).length; i++) {
            var currentItem = Object.keys(productValueNameAndWeights)[i];
            if (!failedThings.includes(currentItem)) {
                console.log(`Total value of ${currentItem}: ${productValueNameAndWeights[currentItem].value}`);
                text += `Total value of ${currentItem}: ${productValueNameAndWeights[currentItem].value}\n`;
            }
        }
        fs.writeFileSync("results.txt", text);
        fs.writeFileSync("result.json", JSON.stringify(productValueNameAndWeights));
    }
});