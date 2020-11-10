class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      token = encode_token(user.id)
      render json: {user: user, token: token}
    else
      render json: {errors: user.errors.full_messages}
    end
  end


  def dashboard
    render json:
    User.first,
    include: {
      friends: {
        only: [:username, :native_language],
        include: { locations: {only: :id} }
      },
      locations: {
        except: [:created_at, :updated_at]
      },
      visits: {
        only: [:id],
        include: :location
      },
      languages: { only: [:name] }
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
