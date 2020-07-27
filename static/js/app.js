// creating a function to generate plot
function getPlot(id) {
    
    // using d3 library to read samples.json
    d3.json("static/data/samples.json").then((incomingData) => {
        console.log(incomingData);
        
        // grab the data with id for the dropdown
        var samples = incomingData.samples.filter(s=> s.id.toString()===id)[0];
        console.log(samples);

        // get only top 10 sample values to plot and reverse
        var sampleValues = samples.sample_values.slice(0,10).reverse();

        // get only top 10 otu ids for the plot
        var otuIds = (samples.otu_ids.slice(0,10)).reverse();
        var otuId = otuIds.map(d => "OTU " + d);
        console.log(`OTU: ${otuIds}`)
        

        // getting the labels
        var labels = samples.otu_labels.slice(0,10);
        console.log(`labels:${labels}`);

        var trace = {
            x: sampleValues,
            y: otuId,
            text: labels,
            type : "bar",
            orientation: "h"
        };

        var data = [trace];

        //create a layout for the chart
        var layout = {
            title:"Top 10 Operational Taxonomic Units",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l:100,
                r:100,
                t:30,
                b:20
            }
        }
        
        Plotly.newPlot("bar",data,layout)

        // creating trace for bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: 'markers',
            marker:{
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };

        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        var data1=[trace1];

        Plotly.newPlot("bubble",data1,layout);

        //creating trace for pie chart
        var trace2 = {
            labels: otuId,
            values : samples,
            type: "pie",

        }

        var data2 = [trace2];

        Plotly.newPlot("gauge",data2)

        //creating trace for meter chart
        var m_data = incomingData.metadata.filter(s=>s.id.toString()===id)[0];
        
        // Enter a washing frequency
        var level = m_data.wfreq;
        console.log(level)

        // Trig to calc meter point
        var degrees = 180 - (level*20),
	        radius = .5;
        var x = radius * Math.cos(degrees * Math.PI / 180);
        var y = radius * Math.sin(degrees * Math.PI / 180);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
	    pathX = String(x),
	    space = ' ',
	    pathY = String(y),
	    pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data_m = [{ type: 'scatter',
                            x: [0], 
                            y:[0],
                            marker: 
                                {size: 14, 
                                color:'850000'},
	                        showlegend: false,
	                        name: 'Scrubs per Week',
	                        // text: level,
                            // hoverinfo: 'text+name'
                        },
                        { 
                            values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9,50/9,50],
                            rotation: 90,
                            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1",""],
                            textinfo: 'text',
                            textposition:'inside',	  
                            marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
						                    'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
						                    'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
						                    'rgba(255, 255, 255, 0)']},
                            //labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1"],
                            // hoverinfo: 'label',
                            hole: .5,
                            type: 'pie',
                            showlegend: false
                        }];

        var layout_m = {
        shapes:[{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                        color: '850000'
                    }
                }],
        title: '<b>Washing Frequency</b>',
        height: 1000,
        width: 1000,
        xaxis: {zeroline:false, showticklabels:false,
			    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
			    showgrid: false, range: [-1, 1]}
        };

    Plotly.newPlot('myDiv', data_m, layout_m);
    });
};


// creating a function to display information on webPage under Demographic Info
function getInfo(id){
    //read the json file
    d3.json("static/data/samples.json").then((incomingData)=>{
        
        //metadata panel contains the information required
        var metadata = incomingData.metadata;
        
        //filtering metadata based on id
        var result =  metadata.filter(m=> m.id.toString() === id) [0];
        console.log(result);
        
        //select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata")

        //empty the panel each time
        demographicInfo.html("");

        //grab the necessary demographic data for the id and append info to the panel
        Object.entries(result).forEach((key)=>{
            demographicInfo.append("h5").text(key[0].toUpperCase()+" "+ key[1]);
        });


    });
};

// Creating function for change in event
function optionChanged(id){
    getPlot(id);
    getInfo(id);
}

// Creating function for intial data rendering via dropdown
function init() {

    //select dropdown menu
    var dropdown = d3.select("#selDataset");

    //read the data
    d3.json("static/data/samples.json").then((incomingData)=>{

        //get the id data to the dropdown menu
        incomingData.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        });

        //call the function to display the plot and data on the page
        getPlot(incomingData.names[0]);
        getInfo(incomingData.names[0]);
    });
}

init();
