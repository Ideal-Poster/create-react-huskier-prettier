
class AuthController < ApplicationController
  def login
    user = User.find_by(username: params[:user][:username])
    if user && user.authenticate(params[:user][:password])
      token = encode_token(user.id)
      render json: {user: user, token: token}
    else
      render json: {errors: "oops seomthing wasnt right"} 
    end
  end

  def auto_login
    # byebug
    user = User.find_by(id: get_auth_header)

    if session_user
      render json: session_user
    else
      render json: {error: "user not available"}
    end
  end


end