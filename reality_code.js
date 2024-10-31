// create an array with nodes
var allCharacters = new vis.DataSet([
    {id: 'BT', label: 'Briony Tallis'},
    {id: 'CT', label: 'Cecillia Tallis'},
    {id: 'RT', label: 'Robbie Turner'},
    {id: 'LQ', label: 'Lola Quincey'},
    {id: 'ET', label: 'Emily Tallis'},
    {id: 'PM', label: 'Paul Marshall'},
    {id: 'DH', label: 'Danny Hardman'}
]);

AC = {color: 'orange'};
GEC = {color: 'green'};
BEC = {color: 'red'};

// create an array with edges
var imagination = new vis.DataSet([
    {from: 'BT', to: 'RT', id:'BT-RT', arrows: 'to', color: AC},
    {from: 'CT', to: 'RT', id:'CT-RT', arrows: 'to, from', color: GEC},
    {from: 'PM', to: 'LQ', id:'PM-LQ', arrows: 'to, from', color: BEC},
]);

var imaginationContent = {
    'BT-RT': 'It is indicated that Briony still accused Robbie in real life. Furthermore, it is implied that she published her manuscript as an attempt to atone for this mistake.',
    'CT-RT': "Cecilia and Robbie have an extended love affair that is broken apart by Briony's accusation.",
    'PM-LQ': "Briony heavily implies that it was in fact Paul Marshall who raped Lola.",
    'ET-RT': 'Briony claims that Emily had been "waiting for a chance to accuse Robbie", as she disliked how her husband favored him and paid for his education. According to Briony, Emily jumped at the chance to accuse Robbie, and pressured Briony to not back out and reveal the truth.',
    'CT-DH': "Both Cecilia and Robbie believe that it was in fact Danny to raped Lola. However, the validity of this is uncertain, as it is likely that Briony is fabricating this suspicion in order to argue to the reader that others (most importantly the infallible Robbie Turner) were also prejudiced.",
    'RT-DH': "Both Cecilia and Robbie believe that it was in fact Danny to raped Lola. However, the validity of this is uncertain, as it is likely that Briony is fabricating this suspicion in order to argue to the reader that others (most importantly the infallible Robbie Turner) were also prejudiced."
}

var descriptions = {
    'BT': 'In reality, it is shown that the supposed events of the novel was actually a book written by Briony herself. Briony claims that certain parts of the book were factual, and that publishing her manuscript was her attempt to atone for her past wrongful actions. However, as can be seen by this visualization, numerous events differ between Briony\'s retelling and reality.',
    'CT': 'While little is generally known of Cecilia\'s exact actions in reality, it is unlikely that she would have jumped to accuse Danny as readily as she did in Briony\'s retelling. Based on Briony\'s description of her, it is highly likely that Briony fabricated her accusation of Danny in order to lessen the severity of Briony\'s own misacusations. However, one key difference is known about Cecilia. While Briony claims that Cecilia survived the war and was reunited with Robbie, it is revealed that Cecilia actually died in a flooded bomb shelter during a raid, and never saw Robbie again after he was imprisoned.',
    'RT': "Robbie's fate is ultimately quite similar to Cecilia's."

};


var container = document.getElementById('network');

// provide the data in the vis format
var data = {
    nodes: allCharacters,
    edges: imagination
};
var options = {};

// initialize your network!
var network = new vis.Network(container, data, options);

network.on("click", function (params) {
    params.event = "[original event]";
    
    //document.getElementById("eventSpanContent").innerText = JSON.stringify(params, null, 4);
    if (params['edges'].length == 1 && params['nodes'].length == 0) {
        // This is an edge
        document.getElementById("eventSpanHeading").innerText = params['edges'][0];
        document.getElementById("eventSpanContent").innerText = imaginationContent[params['edges'][0]]; 
    } else if (params['nodes'].length == 1) {
        // This is a node
        document.getElementById("eventSpanHeading").innerText = params['nodes'][0];
        document.getElementById("eventSpanContent").innerText = descriptions[params['nodes'][0]];
    }
    console.log(
        "click event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
    );
});



