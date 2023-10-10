let flowsFactory = require('../src/llmFlows.js').createFlowsFactory;
let flows = flowsFactory(
        {
            echo: (msg) => {
                    return msg;
                }
        });


flows.registerFlow("mainFlow",
    {
        start: function(value){
            this.return(this.echo(value))
        }
    });

let assert = require('assert');

async function  runTests(){
    let ret = await flows.callAsync("mainFlow", "hello world");
    console.log(ret);
    assert.equal(ret, "hello world");
}


runTests()





