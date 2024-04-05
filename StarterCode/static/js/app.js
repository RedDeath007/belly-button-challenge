//store url
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'

function buildMetadata(sample) {
 d3.json(url).then((data) => {
   let metadata = data.metadata;
   // you need to filter the data for the object with the desired sample number
   let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
   let result = resultArray[0];
   // Use d3 to select the panel with id of sample-metadata
   let demoinfo = d3.select("#sample-metadata");

   // Use `.html("") to clear any existing metadata
   demoinfo.html("");

   // Hint: Inside the loop, you will need to use d3 to append new
   // tags for each key-value in the metadata.
   for (key in result){
     PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
}});
}

function buildCharts(sample) {
 d3.json(url).then((data) => {
    let samples = data.samples;
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
   // Build a Bubble Chart
   let bubbleLayout = {title: "Bubble Chart for Sample"
    };

   let bubbleData = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker:{
        color: otu_ids,
        size: sample_values}

   }];
   Plotly.newPlot('bubble', bubbleData, bubbleLayout)
//Plot the bar graph
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
   //let yticks = specify your ticks…..

   let barData = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels
   }];

     

   let barLayout = {title: "Bar Chart for Sample"

   };
 //Plot the bar 
   Plotly.newPlot("bar", barData, barLayout)
 });
}
function init() {
 // Grab a reference to the dropdown select element
……
 // Use the list of sample names to populate the select options
 d3.json(url).then((data) => {
   let sampleNames = data.names;
………………………..
   };
   // Use the first sample from the list to build the initial plots
…………………………..
 });
}
function optionChanged(newSample) {
 // Fetch new data each time a new sample is selected
 …………………
}
// Initialize the dashboard
init();
