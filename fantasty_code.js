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
        fetch('reality_content/' + params['edges'][0] + '.html')
            .then(response => response.text())
            .then(html =>
                document.getElementById("eventContent").innerHTML = html
        );
    } else if (params['nodes'].length == 1) {
        // This is a node
        fetch('reality_content/' + params['nodes'][0] + '.html')
            .then(response => response.text())
            .then(html => 
                document.getElementById("eventContent").innerHTML = html
        );
    }
});



