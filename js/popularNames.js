/*
 * PopularNamesVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data: perDayData
 */

PopularNamesVis = function (_parentElement, _data) {
  this.parentElement = _parentElement
  this.data = _data

  this.initVis()
}

/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

PopularNamesVis.prototype.initVis = function () {
  var vis = this

  vis.margin = { top: 40, right: 0, bottom: 60, left: 60 }
  ;(vis.width =
    $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right),
    (vis.height = 300 - vis.margin.top - vis.margin.bottom)

  // SVG drawing area
  vis.svg = d3
    .select("#" + vis.parentElement)
    .append("svg")
    .attr("width", vis.width + vis.margin.left + vis.margin.right)
    .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + vis.margin.left + "," + vis.margin.top + ")"
    )

  // Scales and axes
  vis.scaleColors = d3
    .scaleOrdinal()
    .domain(["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"])
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"])

  // (Filter, aggregate, modify data)
  vis.wrangleData()
}

/*
 * Data wrangling
 */

PopularNamesVis.prototype.wrangleData = function () {
  var vis = this

  this.displayData = this.data

  // Update the visualization
  vis.updateVis()
}

/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

PopularNamesVis.prototype.updateVis = function () {
  var vis = this
}
