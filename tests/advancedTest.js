let flowsFactory = require('../src/llmFlows.js').createFlowsFactory;

let callNo = 0;

let flows = flowsFactory(
        {
            request: async (prompt) => {
                    callNo++;
                    console.log("Request #", callNo);
                    return `Call#${callNo}`;
                },
            isLLMText: (text) => {
                if(callNo < 3){
                    return true;
                }
                return false;
            }
        });


flows.registerFlow("mainFlow",
    {
        start: function(){
            this.setRetries(10);
            this.execute();
        },
        execute : async function(){
            let value = await this.request("prompt");
            if(this.isLLMText(value)){
                return this.retry();
            }
            this.return(value);
        }
    });

let assert = require('assert');

async function  runTests(){
    let ret = await flows.callAsync("mainFlow");
    console.log(ret);
    assert.equal(ret, "Call#3");
}

runTests()





