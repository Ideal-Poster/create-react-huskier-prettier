# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


bob =  User.create(name: 'bob')
cheese = User.create(name: 'cheese')

chinese = Language.create(name: "Manderine")
spanish = Language.create(name: "Spanish")

chinese_locations = [
  {lat: 40.72448553795292, lng: -73.99979419042967 },
  {lat: 40.734482035662616, lng: -73.9840383282451 },
  {lat: 40.74592765026943, lng: -73.99450967223925 },
  {lat: 40.745017275752154, lng: -73.97665688903612 },
  {lat: 40.754250496596796, lng: -73.9727086773662 }
]

location_1 = Location.create(name: "store", lat: 40.72448553795292, lng: -73.99979419042967)
location_2 = Location.create(name: "store1", lat: 40.734482035662616, lng: -73.9840383282451)
location_3 = Location.create(name: "store2", lat: 40.74592765026943, lng: -73.99450967223925)
location_4 = Location.create(name: "store3", lat: 40.745017275752154, lng: -73.97665688903612)
# Location.create(name: "store4", lat: chinese_locations[4][:lat], lng: chinese_locations[4][:lng])

LanguageLocation.create(language: chinese, location: location_1)
LanguageLocation.create(language: chinese, location: location_2)



