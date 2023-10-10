The LLM Flows offers a method for extracting LLM prompts from the final code and allows a chain of multiple prompts to filter or validate  with code the results of a prompt execution.



# How to use  llmFlows in your code:

```javascript
/* Check the llmExampletest for complete code. The main code schema is as bellow */

let flowsFactory = require('llmFlows').createFlowsFactory;
let flows = flowsFactory({...});
flows.registerFlow("generateTitles", {...}
    let ret = await flows.callAsync("generateTitles", "An article about the best way to cook a steak");

```

# Remote and local API recommendations

The flows factory, as well as the code from the flows, does not impose any APIs or communication protocol with the expectation of this.retun(value) syntax.
However, we recommend to use the following APIs:

#### setDefaultValues()   

A local API that sets costs, intelligence and creativity levels to some defaults configured in the application 

#### setCostsLevel(number_between_0_and_10)

A local API that sets cost levels between  0 (cheapest possible) to 10 (the most expensive and ideally the best possible)

#### setIntelligenceLevel(number_between_0_and_10)

A local API that sets LLM intelligence level between 0 (the faster but dumber) to 10 (the slower, expensive and ideally the best possible)

#### setCreativityLevel(number_between_0_and_10)

A local API that sets LLM creativity (e.g. temperature) between 0 (low creativity) and 10 (very creative but potentially unstable)

#### request(prompt, max_tokens)

Calls the remote LLM endpoint to generate a response for a prompt.  max_tokens will control the length of the response.

#### requestAs(personalityName, prompt, numberOfOptions, max_tokens)
Calls the remote LLM endpoint to generate a response for a prompt.  max_tokens will control the length of the response.
It provides the personalityName to adjust the prompt accordingly with a predefined personality.

#### brainstorm(prompt, numberOfOptions, max_tokens_per_option)

Calls the remote LLM endpoint to generate  "numberOfOptions" alternatives based on a prompt.  max_tokens_per_option will control the length of the response.

#### brainstormAs(personalityName, prompt, numberOfOptions, max_tokens_per_option)

It is similar to "brainstorm", but the answers are prepared for a specific personality.

#### proofread(personalityName, prompt)

The LLM wrapper proofreads a given text prompt and returns a JSON object. This object contains a 'corrected' field featuring the amended text and a 'observations' field outlining the changes made and any relevant commentary.

#### definePersonality(personalityName, personalityDescription)
Define a personality, "personalityDescription" being an array of descriptions and characteristics. 

#### emotions(listOfPersonalities, prompt)

For the provided text and the array 'listOfPersonalities' containing names of personalities, the function returns a JSON object detailing the most relevant emotions that the LLM predicts the 'prompt' will evoke in those personalities.


