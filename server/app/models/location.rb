class Location < ApplicationRecord
  has_many :visits
  has_many :visits, through: :users

  has_many :language_locations
  has_many :languages, through: :language_locations
end
