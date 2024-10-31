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
    {from: 'PM', to: 'LQ', id:'PM-LQ', arrows: 'to', color: BEC},
    {from: 'ET', to: 'RT', id:'ET-RT', arrows: 'to', color: AC},
    {from: 'CT', to: 'DH', id:'CT-DH', arrows: 'to', color: AC},
    {from: 'RT', to: 'DH', id:'RT-DH', arrows: 'to', color: AC}
]);

var imaginationContent = {
    'BT-RT': 'Briony accuses Robbie of raping Lola. This stems from her childish attraction to Robbie and her jealousy at his relation to Cecilia.',
    'CT-RT': "Cecilia and Robbie have an extended love affair that is broken apart by Briony's accusation.",
    'PM-LQ': "Briony heavily implies that it was in fact Paul Marshall who raped Lola.",
    'ET-RT': 'Briony claims that Emily had been "waiting for a chance to accuse Robbie", as she disliked how her husband favored him and paid for his education. According to Briony, Emily jumped at the chance to accuse Robbie, and pressured Briony to not back out and reveal the truth.',
    'CT-DH': "Both Cecilia and Robbie believe that it was in fact Danny to raped Lola. However, the validity of this is uncertain, as it is likely that Briony is fabricating this suspicion in order to argue to the reader that others (most importantly the infallible Robbie Turner) were also prejudiced.",
    'RT-DH': "Both Cecilia and Robbie believe that it was in fact Danny to raped Lola. However, the validity of this is uncertain, as it is likely that Briony is fabricating this suspicion in order to argue to the reader that others (most importantly the infallible Robbie Turner) were also prejudiced."
}

var descriptions = {
    'BT': 'Briony Tallis is the young protagonist of Atonement. She witnesses her older sister flirting with the groundkeeper\'s son, Robbie, on numerous occassions, and mistakes the interactions for harrasment. When her cousin Lola is raped, she mistakenly frames Robbie for the crime and has her imprisoned. However, she eventually learns of her mistake and regrets her actions, eventually abandoning her family and persuing a job as a war nurse to repent.',
    'CT': 'Cecilia is Briony\'s older sister, and is in love with Robbie. When Briony accuses Robbie of rape, Cecilia breaks with her family out of anger and becomes a nurse. Eventually, she is reunited with Robbie.',
    'RT': "Robbie is the son of the groundkeeper and is Cecilia's love interest. He is unfairly accused of and convicted of rape by Briony, and is imprisoned. Eventually Robbie is deployed to fight in World War II in exchange for getting his sentence commuted. After a narrow escape at the beaches of Dunkirk, Robbie returns to England and is reunited with Cecilia.",
    'DH': 'Danny Hardman is the son of the Tallis family\' servant. Despite playing a relatively minor role in the events of the story, he is accused by Robbie and Cecilia of having raped Lola, most likely due to his lower social status.',
    'ET': 'Emily Tallis is the mother of Briony and Cecilia. Due to constant migraines, she is often confined to her room, and has little knowledge of the events which transpires in her home. Despite this, she is quick to second Briony\'s accusation of Robbie.',
    'PM': 'Paul Marshall is the son of a rich war supplier, and is a friend of the Tallis family. It is implied that he was the one who actually raped Lola',
    'LQ': 'Lola is Briony\'s young cousin, and is staying with the Tallis\'s due to familial struggles. When she is raped, she refuses to admit who the perpetrator was, and instead willingly agrees with Briony\'s accusation of Robbie.'
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



