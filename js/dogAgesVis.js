
/*
 * CountVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data: perDayData
 */

DogAgesVis = function(_parentElement, _data, _myEventHandler){
	this.parentElement = _parentElement;
	this.data = _data;
	this.myEventHandler = _myEventHandler;

	this.initVis();
}


/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

DogAgesVis.prototype.initVis = function(){
	var vis = this;

	vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

	vis.width = 1000 - vis.margin.left - vis.margin.right,
	vis.height = 650 - vis.margin.top - vis.margin.bottom;

	// SVG drawing area
	vis.svg = d3.select("#" + vis.parentElement).append("svg")
			.attr("width", vis.width + vis.margin.left + vis.margin.right)
			.attr("height", vis.height + vis.margin.top + vis.margin.bottom)


	console.log(vis.data)

	var maxPop = Math.max(...vis.data.map(obj => obj.n))

	var colors = d3.scaleLinear()
		.domain([0, maxPop])
		.range(["#fac9c5", "red"])

	//bronx
	var boroughs = ["Queens", "Manhattan", "Bronx", "Staten Island", "Brooklyn"]
	var bronxData = vis.data.slice(0, 18)

	var bronxGroup = vis.svg.append("g")
		.attr("class", "bronx")

	var xScaleBronx = d3.scaleBand().range([0, 300])
		.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
	var yScaleBronx = d3.scaleLinear().range([vis.height, 0])
		.domain([0, d3.max(bronxData)])

	bronxGroup.append("g").call(d3.axisBottom(xScaleBronx).ticks(10))
		.attr("transform", "translate(0," + 200 + ")")


	bronxGroup.selectAll("rect")
		.data(bronxData)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("height", function(d, i){
			return  ((d.n * .03) )
		})
		.attr("width", 15)
		.attr("x", function(d, i){
			console.log(i)
			console.log(d)
			return xScaleBronx(i+ 1)
		})
		.attr("y", function(d, i){
			return 200 - ((d.n * .03))
		})
		.on("mouseover", function(d, i){
			console.log(d)
			console.log(i)
			vis.svg.select("#hover-text").text("There are " + i.n + " " + (i.AgeAsOf2015) + "-year old dogs in " + i.Borough)
		})
		.on("mouseout", function(d, i){
			vis.svg.select("#hover-text").text("Hover over a bar to see the population")
		})
		.attr("fill", function(d, i){
			return colors(d.n)
		})



	//Brooklyn
	var brooklynData = vis.data.slice(18, 36)

	var brooklynGroup = vis.svg.append("g")
		.attr("class", "brooklyn")
		.attr("x", 400)
		.attr("y", 300)

	var xScaleBrooklyn = d3.scaleBand().range([400, 700])
		.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
	var yScaleBrooklyn = d3.scaleLinear().range([vis.height, 0])
		.domain([0, d3.max(brooklynData)])

	brooklynGroup.append("g").call(d3.axisBottom(xScaleBrooklyn).ticks(10))
		.attr("transform", "translate(0," + 200 + ")")

	brooklynGroup.selectAll("rect")
		.data(brooklynData)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("height", function(d, i){
			return  ((d.n * .03) )
		})
		.attr("width", 15)
		.attr("x", function(d, i){
			console.log(i)
			console.log(d)
			return xScaleBrooklyn(i+ 1)
		})
		.attr("y", function(d, i){
			return 200 - ((d.n * .03))
		})
		.on("mouseover", function(d, i){
			console.log(d)
			console.log(i)
			vis.svg.select("#hover-text").text("There are " + i.n + " " + (i.AgeAsOf2015) + "-year old dogs in " + i.Borough)
		})
		.on("mouseout", function(d, i){
			vis.svg.select("#hover-text").text("Hover over a bar to see the population")
		})
		.attr("fill", function(d, i){
			return colors(d.n)
		})
	//manhattan

	var manhattanData = vis.data.slice(36, 54)

	var manhattanGroup = vis.svg.append("g")
		.attr("class", "manhattan")
		.attr("x", 500)
		.attr("y", 500)

	var xScaleManhattan = d3.scaleBand().range([0, 300])
		.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
	var yScaleManhattan = d3.scaleLinear().range([vis.height, 0])
		.domain([0, d3.max(manhattanData)])

		manhattanGroup.append("g").call(d3.axisBottom(xScaleManhattan).ticks(10))
		.attr("transform", "translate(0," + 400 + ")")


		manhattanGroup.selectAll("rect")
		.data(manhattanData)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("height", function(d, i){
			return  ((d.n * .03) )
		})
		.attr("width", 15)
		.attr("x", function(d, i){
			console.log(i)
			console.log(d)
			return xScaleManhattan(i+ 1)
		})
		.attr("y", function(d, i){
			return 400 - ((d.n * .03))
		})
		.on("mouseover", function(d, i){
			console.log(d)
			console.log(i)
			vis.svg.select("#hover-text").text("There are " + i.n + " " + (i.AgeAsOf2015) + "-year old dogs in " + i.Borough)
		})
		.on("mouseout", function(d, i){
			vis.svg.select("#hover-text").text("Hover over a bar to see the population")
		})
		.attr("fill", function(d, i){
			return colors(d.n)
		})

	//queens

	var queensData = vis.data.slice(54, 72)

	var queensGroup = vis.svg.append("g")
		.attr("class", "manhattan")
		.attr("x", 500)
		.attr("y", 500)

	var xScaleQueens = d3.scaleBand().range([400, 700])
		.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
	var yScaleQueens = d3.scaleLinear().range([vis.height, 0])
		.domain([0, d3.max(queensData)])

		queensGroup.append("g").call(d3.axisBottom(xScaleQueens).ticks(10))
		.attr("transform", "translate(0," + 400 + ")")


		queensGroup.selectAll("rect")
		.data(queensData)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("height", function(d, i){
			return  ((d.n * .03) )
		})
		.attr("width", 15)
		.attr("x", function(d, i){
			console.log(i)
			console.log(d)
			return xScaleQueens(i+ 1)
		})
		.attr("y", function(d, i){
			return 400 - ((d.n * .03))
		})
		.on("mouseover", function(d, i){
			console.log(d)
			console.log(i)
			vis.svg.select("#hover-text").text("There are " + i.n + " " + (i.AgeAsOf2015) + "-year old dogs in " + i.Borough)
		})
		.on("mouseout", function(d, i){
			vis.svg.select("#hover-text").text("Hover over a bar to see the population")
		})
		.attr("fill", function(d, i){
			return colors(d.n)
		})
	
	//staten island

	var statenData = vis.data.slice(72, 90)

	var statenGroup = vis.svg.append("g")
		.attr("class", "manhattan")
		.attr("x", 500)
		.attr("y", 500)

	var xScaleStaten = d3.scaleBand().range([200, 500])
		.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
	var yScaleStaten = d3.scaleLinear().range([vis.height, 0])
		.domain([0, d3.max(statenData)])

		statenGroup.append("g").call(d3.axisBottom(xScaleStaten).ticks(10))
		.attr("transform", "translate(0," + 600 + ")")


		statenGroup.selectAll("rect")
		.data(statenData)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("height", function(d, i){
			return  ((d.n * .03) )
		})
		.attr("width", 15)
		.attr("x", function(d, i){
			console.log(i)
			console.log(d)
			return xScaleStaten(i+ 1)
		})
		.attr("y", function(d, i){
			return 600 - ((d.n * .03))
		})
		.on("mouseover", function(d, i){
			console.log(d)
			console.log(i)
			vis.svg.select("#hover-text").text("There are " + i.n + " " + (i.AgeAsOf2015) + "-year old dogs in " + i.Borough)
		})
		.on("mouseout", function(d, i){
			vis.svg.select("#hover-text").text("Hover over a bar to see the population")
		})
		.attr("fill", function(d, i){
			return colors(d.n)
		})

	//add location name to each chart
	vis.svg.append("text")
		.text("The Bronx")
		.attr("x", 100)
		.attr("y", 250)

	vis.svg.append("text")
		.text("Brooklyn")
		.attr("x", 500)
		.attr("y", 250)

	vis.svg.append("text")
		.text("Manhattan")
		.attr("x", 100)
		.attr("y", 450)

	vis.svg.append("text")
		.text("Queens")
		.attr("x", 500)
		.attr("y", 450)

	vis.svg.append("text")
		.text("Staten Island")
		.attr("x", 300)
		.attr("y", 650)

	//hover text
	vis.svg.append("text")
		.text("Hover over a bar to see the population")
		.attr("x", 200)
		.attr("y", 50)
		.attr("font-size", 20)
		.attr("id", "hover-text")

	// (Filter, aggregate, modify data)
	vis.wrangleData();
}



/*
 * Data wrangling
 */

DogAgesVis.prototype.wrangleData = function(){
	var vis = this;


	//find 

	// console.log("DATA IS")
	// console.log(vis.data)

	this.displayData = this.data;

	// Update the visualization
	vis.updateVis();
}



/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

DogAgesVis.prototype.updateVis = function(){
	var vis = this;


	

	//find amount in the range for each area




}
