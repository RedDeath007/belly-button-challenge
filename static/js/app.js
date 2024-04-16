//store url
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'


function buildMetadata(meta) {
   // Use d3 to select the panel with id of sample-metadata
   let demoinfo = d3.select("#sample-metadata");

   // Use `.html("") to clear any existing metadata
   demoinfo.html("");

   // Hint: Inside the loop, you will need to use d3 to append new
   // tags for each key-value in the metadata.
   for (key in meta){
     demoinfo.append("h6").text(`${key.toUpperCase()}: ${meta[key]}`);
    }
}


function buildCharts(subjectSample) {
    let otu_ids = subjectSample.otu_ids;
    let otu_labels = subjectSample.otu_labels;
    let sample_values = subjectSample.sample_values;
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

   

   let barData = [{
    type: 'bar',
    y: otu_ids.slice(0,10).map(id => `Otu ID ${id}`).reverse(),
    x: sample_values.slice(0,10).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    orientation: 'h'
   }];

     

   let barLayout = {title: "Bar Chart for Sample"

   };
 //Plot the bar 
   Plotly.newPlot("bar", barData, barLayout)

}


function popDrop(ids){
    // Grab a reference to the dropdown select element
    let dropdown = d3.select("#selDataset");
    //<option value="volvo">Brick</option>
    ids.forEach(id => {
        console.log(id);
        dropdown.append('option').attr('value', id).text(id);
    });
}


function init() {
    // Use the list of sample names to populate the select options
    d3.json(url).then((data) => {
        let names = data.names;
        console.log(names);
        popDrop(names);
        // Use the first sample from the list to build the initial plots
        optionChanged(names[0]);
    });
}


function filtering(items, subjectID) {
    let resultArray = items.filter(item => item.id == subjectID);
    let result = resultArray[0];
    return result;
}

function optionChanged(subjectID) {
    console.log(`optionChanged ${subjectID}`);
    // Fetch new data each time a new sample is selected
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let samples = data.samples;
        let subjectMetadata = filtering(metadata, subjectID);
        let subjectSamples = filtering(samples, subjectID);
        buildMetadata(subjectMetadata);
        buildCharts(subjectSamples);

    });
}

// Initialize the dashboard
init();
