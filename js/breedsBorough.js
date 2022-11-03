/*
 * BreedsBorough - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data: perDayData
 */

BreedsBorough = function (_parentElement, _data) {
  this.parentElement = _parentElement
  this.data = _data

  this.initVis()
}

/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

BreedsBorough.prototype.initVis = function () {
  var vis = this

  vis.margin = { top: 40, right: 0, bottom: 60, left: 60 }
  vis.width = 500 - vis.margin.left - vis.margin.right
  vis.height = 500 - vis.margin.top - vis.margin.bottom

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

  // TODO: Add legend

  // Create simulation, grouping nodes by borough
  vis.simulation = d3
    .forceSimulation()
    .force("charge", d3.forceManyBody().strength(-0.4))
    .force(
      "forceX",
      d3
        .forceX((d) => {
          switch (d.boroughName) {
            case "Manhattan":
              return 100
            case "Brooklyn":
              return 250
            case "Queens":
              return 150
            case "Bronx":
              return 300
            case "Staten Island":
              return 250
          }
        })
        .strength(0.05)
    )
    .force(
      "forceY",
      d3.forceY((d) => {
        switch (d.boroughName) {
          case "Manhattan":
            return 250
          case "Brooklyn":
            return 300
          case "Queens":
            return 175
          case "Bronx":
            return 200
          case "Staten Island":
            return 100
        }
      })
    )
    .force(
      "collide",
      d3.forceCollide().radius((d) => vis.radiusScale(d.count))
    )

  // Color scale
  vis.color = d3
    .scaleOrdinal()
    .domain(["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"])
    .range(["#D6E3F8", "#9D5C63", "#94958B", "#584B53", "#E4BB97"])

  // Scale for the radius
  vis.radiusScale = d3
    .scalePow()
    .exponent(1 / 4)
    .range([1, 12])

  // (Filter, aggregate, modify data)
  vis.wrangleData()
}

/*
 * Data wrangling
 */

BreedsBorough.prototype.wrangleData = function () {
  var vis = this

  vis.displayData = vis.data

  // Update the visualization
  vis.updateVis()
}

/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

BreedsBorough.prototype.updateVis = function () {
  var vis = this

  // Update domain
  vis.radiusScale.domain([
    0,
    d3.max(vis.displayData, function (d) {
      return d.count
    }),
  ])

  vis.simulation.nodes(vis.displayData)

  // Draw Nodes
  const nodes = vis.svg
    .selectAll(".node")
    .data(vis.displayData)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", (d) => vis.radiusScale(d.count))
    .attr("fill", (d) => vis.color(d.boroughName))

  vis.simulation.on("tick", () => {
    nodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
  })
}
