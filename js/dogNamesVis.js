
/*
 * CountVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data: perDayData
 */

DogNamesVis = function(_parentElement, _data, _myEventHandler){
	this.parentElement = _parentElement;
	this.data = _data;
	this.myEventHandler = _myEventHandler;

	this.initVis();
}


/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

DogNamesVis.prototype.initVis = function(){
	var vis = this;

	vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

	vis.width = 1100 - vis.margin.left - vis.margin.right,
	vis.height = 350 - vis.margin.top - vis.margin.bottom;

	// SVG drawing area
	vis.svg = d3.select("#" + vis.parentElement).append("svg")
			.attr("width", vis.width + vis.margin.left + vis.margin.right)
			.attr("height", vis.height + vis.margin.top + vis.margin.bottom)


	console.log(vis.data)

    var bronxData = vis.data.slice(0, 10)
	var bronxGroup = vis.svg.append("g")
		.attr("class", "bronx")
    var bronxRunningX = 200

    bronxGroup.selectAll("text")
        .data(bronxData)
        .enter()
        .append("text")
        .text(function(d){
            return d.name
        })
        .attr("x", function(d, i){
            xToReturn = bronxRunningX
            bronxRunningX += (d.name.length * 10) + 40
            return xToReturn
        })
        .attr("y", 100)
        .on("mouseover", function(d, i){
            vis.svg.select("#hover-text").text("Count: " + i.count)
        })
        .on("mouseout", function(){
            vis.svg.select("#hover-text").text("Count: ")
        })


    var brookData = vis.data.slice(10, 20)
    var brookGroup = vis.svg.append("g")
    .attr("class", "brook")


    var brookRunningX = 200

    brookGroup.selectAll("text")
        .data(brookData)
        .enter()
        .append("text")
        .text(function(d){
            return d.name
        })
        .attr("x", function(d, i){
            xToReturn = brookRunningX
            brookRunningX += (d.name.length * 10) + 40
            return xToReturn
        })
        .attr("y", 150)
        .on("mouseover", function(d, i){
            vis.svg.select("#hover-text").text("Count: " + i.count)
        })
        .on("mouseout", function(){
            vis.svg.select("#hover-text").text("Count: ")
        })


    var manData = vis.data.slice(20, 30)
    var manGroup = vis.svg.append("g")
    .attr("class", "man")

    var manRunningX = 200

    manGroup.selectAll("text")
        .data(manData)
        .enter()
        .append("text")
        .text(function(d){
            return d.name
        })
        .attr("x", function(d, i){
            xToReturn = manRunningX
            manRunningX += (d.name.length * 10) + 40
            return xToReturn
        })
        .attr("y", 200)
        .on("mouseover", function(d, i){
            vis.svg.select("#hover-text").text("Count: " + i.count)
        })
        .on("mouseout", function(){
            vis.svg.select("#hover-text").text("Count: ")
        })



    var queensData = vis.data.slice(30, 40)
    var queensGroup = vis.svg.append("g")
    .attr("class", "queens")


    var queensRunningX = 200

    queensGroup.selectAll("text")
        .data(queensData)
        .enter()
        .append("text")
        .text(function(d){
            return d.name
        })
        .attr("x", function(d, i){
            xToReturn = queensRunningX
            queensRunningX += (d.name.length * 10) + 40
            return xToReturn
        })
        .attr("y", 250)
        .on("mouseover", function(d, i){
            vis.svg.select("#hover-text").text("Count: " + i.count)
        })
        .on("mouseout", function(){
            vis.svg.select("#hover-text").text("Count: ")
        })

    var statenData = vis.data.slice(40, 50)
    var statenGroup = vis.svg.append("g")
    .attr("class", "staten")


    var statenRunningX = 200

    statenGroup.selectAll("text")
        .data(statenData)
        .enter()
        .append("text")
        .text(function(d){
            return d.name
        })
        .attr("x", function(d, i){
            xToReturn = statenRunningX
            statenRunningX += (d.name.length * 10) + 40
            return xToReturn
        })
        .attr("y", 300)
        .on("mouseover", function(d, i){
            vis.svg.select("#hover-text").text("Count: " + i.count)
        })
        .on("mouseout", function(){
            vis.svg.select("#hover-text").text("Count: ")
        })

    //labels for each borough

    vis.svg.append("text")
        .text("Bronx")
        .attr("x", 100)
        .attr("y", 100)
        .attr("class", "name-label")

    vis.svg.append("text")
        .text("Brooklyn")
        .attr("x", 60)
        .attr("y", 150)
        .attr("class", "name-label")

    vis.svg.append("text")
        .text("Manhattan")
        .attr("x", 45)
        .attr("y", 200)
        .attr("class", "name-label")

    vis.svg.append("text")
        .text("Queens")
        .attr("x", 80)
        .attr("y", 250)
        .attr("class", "name-label")

    vis.svg.append("text")
        .text("Staten Island")
        .attr("x", 20)
        .attr("y", 300)
        .attr("class", "name-label")

    //hover text
    vis.svg.append("text")
        .text("Count: ")
        .attr("id", "hover-text")
        .attr("x", 1000)
        .attr("y", 50)

}

