class ApplicationController < ActionController::API
  def get_auth_header
    request.headers["Authorization"]
  end

  def session_user
    User.find_by(id: decode_token)
  end

  def decode_token
    begin
      JWT.decode(get_auth_header, "super_secret_code")[0]["user_id"]
    rescue
      nil
    end
  end

  def encode_token(id)
    JWT.encode({user_id: id}, "super_secret_code")
  end

  def logged_in?
    !!session_user
  end
end
