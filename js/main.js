let data = {}

const readData = async () => {
  let popularNamesData = await d3.csv("data/top_10_popular_names_borough.csv")
  popularNamesData = popularNamesData.map((d) => {
    return {
      name: d.AnimalName,
      boroughName: d.BoroughName,
      count: +d.n,
    }
  })

  let dogAgesData = await d3.csv("data/age_distribution.csv")

  data.popularNames = popularNamesData
  data.dogAges = dogAgesData

  createVis()
}

const createVis = () => {
  // let popularNamesVis = new PopularNamesVis(
  //   "popular-names-vis",
  //   data.popularNames
  // )

  let dogAgesVis = new DogAgesVis("dog-age-vis", data.dogAges)
}

readData()
