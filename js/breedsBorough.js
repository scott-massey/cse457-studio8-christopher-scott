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
  vis.width = 700 - vis.margin.left - vis.margin.right
  vis.height = 525 - vis.margin.top - vis.margin.bottom

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
              return 200
            case "Brooklyn":
              return 350
            case "Queens":
              return 250
            case "Bronx":
              return 400
            case "Staten Island":
              return 350
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

  // Legend
  vis.legend = vis.svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", "translate(0, 0)")
    .selectAll("g")
    .data(vis.color.domain())
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate(0," + i * 20 + ")")

  vis.legend
    .append("rect")
    .attr("x", 0)
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", vis.color)

  vis.legend
    .append("text")
    .attr("x", 22)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text((d) => d)

  // Add placeholder text to the bottom for hovering
  vis.svg
    .append("text")
    .attr("class", "hover-text")
    .attr("x", vis.width / 2)
    .attr("y", vis.height - 10)
    .attr("text-anchor", "middle")
    .text("Hover over a circle to see the number of dogs")

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
    .on("mouseover", function (event, d) {
      d3.select(this).attr("stroke", "black").attr("stroke-width", 1)
      d3.select(".hover-text").text(`${d.breedName}: ${d.count}`)
    })
    .on("mouseout", function (event, d) {
      d3.select(this).attr("stroke", "none")
      d3.select(".hover-text").text(
        "Hover over a circle to see the number of dogs of the breed in that borough"
      )
    })

  vis.simulation.on("tick", () => {
    nodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
  })
}
