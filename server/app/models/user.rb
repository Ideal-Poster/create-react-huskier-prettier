class User < ApplicationRecord
  validates :username, uniqueness: :true, presence: :true
  has_secure_password

  has_many :user_languages, :dependent => :delete_all
  has_many :languages, through: :user_languages

  has_many :visits, :dependent => :delete_all
  has_many :locations, through: :visits
  
  has_many :invitations, :dependent => :delete_all
  has_many :pending_invitations, -> { where confirmed: false }, class_name: 'Invitation', foreign_key: "friend_id"

  def pending_friends
    invitations =  Invitation.where(friend_id: id, confirmed: false)
    invitations.map do |invite| 
      invite.user
    end
    invitations
  end

  def friends
    friends_i_sent_invitation = Invitation.where(user_id: id, confirmed: true).pluck(:friend_id)
    friends_i_got_invitation = Invitation.where(friend_id: id, confirmed: true).pluck(:user_id)
    ids = friends_i_sent_invitation + friends_i_got_invitation
    User.where(id: ids)
  end

  def friend_with?(user)
    Invitation.confirmed_record?(id, user.id)
  end

  def send_invitation(user)
    # if !Invitation.where(user_id: id, friend_id: user.id)
      invitations.create(friend_id: user.id)
    # end
  end

  def remove_friend(user)
    invitation1 = Invitation.where(user_id: id, friend_id: user.id, confirmed: true).first
    invitation2 = Invitation.where(user_id: id, friend_id: user.id, confirmed: true).first
    if invitation1
      deleted1 = Invitation.delete(invitation1.id)
    end

    if invitation2
      deleted2 = Invitation.delete(invitation2.id)
    end

    (deleted1 > 0 || deleted2 > 0) ? user : nil
  end

  
end
