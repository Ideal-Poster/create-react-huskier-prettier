class LocationsController < ApplicationController
  # def index
  #   locations = Location.all
  #   render json: locations, include: {users: {only: :username}}
  # end

  def friends
    friends_locations = session_user.friends.collect do |user|
      user.locations
    end.flatten
    friends_locations << session_user.locations
    friends_locations.flatten!.uniq!

    # byebug
    render json: friends_locations,
    include: {
      users: { only: :username,
        include: { languages: {only: :name} }
      },
      languages: { only: :name }
    },
    methods: :my_location?
  end

  def create
    location = Location.new(location_params)
    if location.save && session_user
      Visit.create(user: session_user, location: location)
      render json: {location: location},
      include: {
        users: { only: :username,
          include: { languages: { only: :name } }
        },
        languages: { only: :name }
      },
      methods: :my_location?
    else
      render json: { error: location.errors.full_messages }
    end
  end

  private

  def location_params
    params.require(:location).permit(:name, :description, :lat, :lng)
  end
end
