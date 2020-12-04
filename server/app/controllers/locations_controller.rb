class LocationsController < ApplicationController
  # def index
  #   locations = Location.all
  #   render json: locations, include: {users: {only: :username}}
  # end

  def friends
    friends_locations = User.first.friends.collect do |user|
      user.locations
    end.flatten
    friends_locations << User.first.locations
    friends_locations.flatten!.uniq!
    render json: friends_locations,
    include: {
      users: { only: :username },
      languages: { only: :name }
    },
    methods: :my_location?
  end

  def create
    location = Location.new(location_params)
    if location.save && User.first
      Visit.create(user: User.first, location: location)
      render json: { location: location }
    else
      render json: { error: location.errors.full_messages }
    end
  end

  private

  def location_params
    params.require(:location).permit(:name, :description, :lat, :lng)
  end
end
