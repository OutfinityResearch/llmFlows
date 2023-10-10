let flowsFactory = require('../src/llmFlows.js').createFlowsFactory;

let standardLLMApis = {
    setInteligenceLevel : async function ( level){
        /* send to the remote endpoints*/
        return level;
    },
    setCreativityLevel : async function (level){
        /* send to the remote endpoints*/
        return options;
    },
    request : async function (prompt, max_tokens){
        /* call remote LLM edndpoints*/
        return "Improved prompt for " + prompt;
    },
    brainstorm : async  function (prompt, number, max_tokens){
        let alternatives = []
        for(let i = 0; i < number; i++){
            alternatives.push("Alternative " + prompt + " " + i);
        }
        return alternatives;
    },
    setCostsLevel : async function (level){

    },
    proofread : async function (personalityName, prompt){

    },
    definePersonality: function(personalityName, personalityDescription){

    },
    emotions: function(listOfPersonalities, prompt){

    },
    isLLMText: function(text){

    },
    filterLLMText: function(text){

    }
}


let flows = flowsFactory(standardLLMApis);


flows.registerFlow("generateTitles",
    {
            start: function(prompt){
                this.prompt = prompt;
                this.setInteligenceLevel(3);
                this.execute()
            },
            execute: async function(){
                let betterPrompt      = await this.request("ProofRead and Improve Prompt for generating alternative titles: " + this.prompt);
                let alternativeTitles = await this.brainstorm(betterPrompt, 5);
                this.return(alternativeTitles);
            }
    });

let assert = require('assert');

async function  runTests(){
    let ret = await flows.callAsync("generateTitles", "An article about the best way to cook a steak");
    console.log(ret);
    assert.equal(ret.length, 5);
}

runTests()





