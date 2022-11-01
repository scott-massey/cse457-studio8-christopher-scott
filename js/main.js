let data

const readData = async () => {
  let popularNamesData = await d3.csv("data/top_10_popular_names_borough.csv")
  popularNamesData = popularNamesData.map((d) => {
    return {
      name: d.AnimalName,
      boroughName: d.BoroughName,
      count: +d.n,
    }
  })

  data.popularNames = popularNamesData
}

const createVis = () => {
  let popularNamesVis = new PopularNamesVis(
    "popular-names-vis",
    data.popularNames
  )
}

readData()
