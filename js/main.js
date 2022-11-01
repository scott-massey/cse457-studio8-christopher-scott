const readData = async () => {
  let popularNamesData = await d3.csv("data/top_10_popular_names_borough.csv")
  popularNamesData = popularNamesData.map((d) => {
    return {
      name: d.AnimalName,
      boroughName: d.BoroughName,
      count: +d.n,
    }
  })
}

readData()
