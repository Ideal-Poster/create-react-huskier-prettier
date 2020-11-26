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
    # Location.create("")
    byebug
  end

  private

  def location_params
    # params.require(:user).permit(:username, :password)
  end
end
