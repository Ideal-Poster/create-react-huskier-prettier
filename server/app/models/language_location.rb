class LanguageLocation < ApplicationRecord
  belongs_to :language
  belongs_to :location
end
