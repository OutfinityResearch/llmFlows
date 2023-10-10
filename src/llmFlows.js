
function LLmFlow(description, externalAPIs){
    this.description = description;
    let self = this;

    for(let fn in description){
        this[fn] = description[fn].bind(this);
    }

    for(let fn in externalAPIs){
        this[fn] = externalAPIs[fn].bind(this);
    }

    let returnPromise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
    });

    this.return = function(value){
        return this.resolve(value);
    }

    this.fail = function(error){
        return this.reject(error);
    }

    this.run = function(...args){
        self.start.apply(self, args);
        return returnPromise;
    }

}

module.exports =
    {
        createFlowsFactory: function (externalAPIs){
        let registry = {};

        return {
            registerFlow: function(flowName, description){
                registry[flowName] = description;
            },
            callAsync: async function(flowName, ...args){
                let flow = new LLmFlow(registry[flowName], externalAPIs);
                return await flow.run(...args);
            }
        }
    }
}
