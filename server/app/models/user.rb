class User < ApplicationRecord
  validates :username, uniqueness: :true, presence: :true
  has_secure_password

  has_many :user_languages
  has_many :languages, through: :user_languages

  has_many :visits
  has_many :locations, through: :visits
end
