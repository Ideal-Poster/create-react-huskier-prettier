class VisitsController < ApplicationController

  def create
    # byebug
    location = Location.find(params["location"])
    visit = Visit.new(user: User.first, location:location)
    if visit.save
      render json: { marker: location }
    else
      render json: { errors: "something went wrong." }
    end
  end

  private

  def visit_params
    params.require(:visit).permit(:location_id)
  end
end
