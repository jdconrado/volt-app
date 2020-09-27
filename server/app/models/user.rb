class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :name, presence: true
    validates :lastname, presence: true
    validates :mail, presence: true, uniqueness: true, format: {with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i}
    validates :password, presence: true, length: { minimum: 8 }
end
