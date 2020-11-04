class Location < ApplicationRecord
  has_many :visits
  has_many :users, through: :visits

  has_many :language_locations
  has_many :languages, through: :language_locations

  def my_location?
    users.include? User.first
  end
end
