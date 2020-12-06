# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require "uri"
require "net/http"
require "json"

chinese = Language.create(name: "Manderine")
spanish = Language.create(name: "Spanish")
tagalog = Language.create(name: "Tagalog")
urdu = Language.create(name: "Urdu")
japanese = Language.create(name: "Japanese")

languages = [chinese, spanish, tagalog, urdu, japanese]

# create user

def get_address(lat, lng)
  url = URI("https://maps.googleapis.com/maps/api/geocode/json?latlng=#{lat},#{lng}&key=#{ENV["GM_API_KEY"]}")

  https = Net::HTTP.new(url.host, url.port)
  https.use_ssl = true

  request = Net::HTTP::Get.new(url)
  request["Content-Type"] = "application/json"

  response = https.request(request)
  JSON.parse(response.body)['results'][0]["formatted_address"]
end

user = User.create(username: Faker::Internet.username, password: '1Qqqqqqq', native_language: Language.find_by(name: "English"))
UserLanguage.create(user: user, language: Language.all[0])
UserLanguage.create(user: user, language: Language.all[1])
UserLanguage.create(user: user, language: Language.all[2])


10.times do
  user = User.create(username: Faker::Name.unique.name, password: '1Qqqqqqq', native_language: Language.all.sample)
  UserLanguage.create(user: user, language: Language.all.sample)
end

# User.first.send_invitation(User.all[1])
# User.first.send_invitation(User.all[2])
# User.first.send_invitation(User.all[3])
# User.first.send_invitation(User.all[4])
# User.first.send_invitation(User.all[5])

5.times do |num|
  # user = User.find_by(id: num)
  User.first.send_invitation(User.all[num+1])
  User.all[num+1].pending_invitations[0].update(confirmed: true)
end

chinese_locations = [
  {lat: 40.72448553795292, lng: -73.99979419042967 },
  {lat: 40.734482035662616, lng: -73.9840383282451 },
  {lat: 40.74592765026943, lng: -73.99450967223925 },
  {lat: 40.745017275752154, lng: -73.97665688903612 },
  {lat: 40.754250496596796, lng: -73.9727086773662 }
]

40.times do 
  lat = Random.new.rand(40.72148553795292..40.757970496596796)
  lng = (Random.new.rand(73.9317086773662..73.99999419042967) * -1)
  
  location = Location.create(
    address: "#{get_address(lat, lng)}",
    name: Faker::Company.name,
    description: Faker::TvShows::AquaTeenHungerForce.quote,
    lat: lat,
    lng: lng
  )

  LanguageLocation.create(language: Language.all.sample, location: location)
  LanguageLocation.create(language: Language.all.sample, location: location)
end

40.times do 
  Visit.create(user: User.all.sample, location: Location.all.sample)
end