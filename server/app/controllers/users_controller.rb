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
    methods: :pending_friends
  end

  def invite_friend
    search_result = User.find_by(username: params["friend"])
    if search_result
      User.first.send_invitation(search_result)
      render json: {invited: true}
    else
      render json: {errors: "User not found"}
    end
  end


  def delete_friend
    # byebug
    deleted_user = User.first.remove_friend(User.find_by(username: params["user"]["username"]))
    if deleted_user
      render json: deleted_user
    else 
      render json: {error: "user not found"}
    end
  end

  private

  def user_params
    params.require(:user).permit(:id, :username, :password)
  end
end
