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
        include: { locations: {only: :id} },
      },
      locations: {
        except: [:created_at, :updated_at]
      },
      visits: {
        only: [:id],
        include: :location
      },
      languages: { only: [:name] },
      
    },
    methods: :pending_invitations 
  end

  def invite_friend
    search_result = User.find_by(username: params["friend"])
    if search_result
      User.first.send_invitation(search_result)
      render json: {invited: true}
    else
      render json: {errors: "There is not user by that name"}
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
