Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/user' do
    post '/signup', to: 'users#create'
    post '/login', to: 'users#login'
    get '/logout', to: 'users#logout'
  end
end
