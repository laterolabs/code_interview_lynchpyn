json.array! @users do |user|
  json.partial! user, partial: 'api/users/user', as: :user
end