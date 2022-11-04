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

  let breedsBoroughData = await d3.csv("data/breeds_borough_count.csv")
  breedsBoroughData = breedsBoroughData.map((d) => {
    return {
      breedName: d.BreedName,
      boroughName: d.BoroughName,
      count: +d.Count,
    }
  })
  data.breedsBorough = breedsBoroughData

  createVis()
}

const createVis = () => {

  let dogAgesVis = new DogAgesVis("dog-age-vis", data.dogAges)
  let breedsBorough = new BreedsBorough("breeds-borough", data.breedsBorough)
  let dogNamesVis = new DogNamesVis("names-vis", data.popularNames)
}

readData()
