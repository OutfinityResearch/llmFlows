
function LLmFlow(description, externalAPIs){
    this.description = description;
    let self = this;
    let __startArgs = []
    let __numberOfRetries = 3;
    let __actualRetries = 0;
    let initialised = false;

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

    this.fail = function(error) {
        if (typeof error === "string"){
            error = new Error(error);
        }
        return this.reject(error);
    }

    this.retry = function(){
        __actualRetries++;
        if(__actualRetries > __numberOfRetries){
            this.fail("Max number of retries reached");
        }
        self.start.apply(self, __startArgs);
    }

    this.setRetries = function(numberOfRetries){
        if(!initialised){
            __numberOfRetries = numberOfRetries;
        }
    }

    this.run = function(...args){
        __startArgs = args;
        if(self.start === undefined){
            this.fail(Error("Flows must have a function called 'start' "));
        } else {
            self.start.apply(self, args);
            initialised = true;
        }
        return returnPromise;
    }
}

export const createFlowsFactory =

        function (externalAPIs){
        let registry = {};

        return {
            registerFlow: function(flowName, description){
                registry[flowName] = description;
            },
            callAsync: async function(flowName, ...args){
                if(registry[flowName] === undefined){
                    throw new Error("Flow " + flowName + " not found");
                }
                let flow = new LLmFlow(registry[flowName], externalAPIs);
                return await flow.run(...args);
            }
        }

}
