const endPoint = 'https://damp-garden-93707.herokuapp.com';

const Part1 = {
    listAgents: endPoint + '/getlistofagents',//GET
    durationRange: endPoint + '/getdurationrange',//GET
    filterCalls: endPoint + '/getfilteredcalls',//POST
}

const Part2 = {
    applyLabel: endPoint + '/applyLabels',//POST
    listOfLabels: endPoint + '/getlistoflabels',//GET
    callList: endPoint + '/getcalllist', //GET
}


export {Part1, Part2};