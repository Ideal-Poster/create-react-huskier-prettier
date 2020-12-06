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
    session_user,
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
      session_user.send_invitation(search_result)
      render json: {invited: true}
    else
      render json: {errors: "User not found"}
    end
  end

  def confirm_friend

    invitation = session_user
      .pending_invitations
      .where(
        user_id: user_params[:id],
        friend_id: session_user,
        comfirmed: false
      )
    if invitation
      invitation.update(confirmed: true)
      user = User.find(user_params[:id])
      render json: user
    else
      render json: {errors: "somethign went wrong"}
    end
  end


  def delete_friend
    # byebug
    deleted_user = session_user.remove_friend(User.find_by(username: params["user"]["username"]))
    if deleted_user
      render json: deleted_user
    else 
      render json: {error: "user not found"}
    end
  end

  private

  def user_params
    params.require(:user).permit(:id, :username, :password, :native_language, :password_digest, :created_at, :updated_at)
  end
end
