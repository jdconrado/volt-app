class UsersController < ApplicationController

    before_action :authorized, only: [:info]
    def create
        user = User.new(
            username: userParams[:username],
            name: userParams[:name],
            lastname: userParams[:lastname],
            mail: userParams[:mail],
            password: userParams[:password]
        )
        if user.save
            #Logica para enviar el correo de confirmación de cuenta
            render json: {result:'success'}, status: :created
        else
            render json: user.errors, status: :unprocessable_entity
        end
    end

    def login
        user = User.find_by(username:userParams[:username])
        if user && user.authenticate(userParams[:password]) 
            token = JWT.encode({u_id: user.id, exp: Time.now.to_i + 4 * 3600}, 'S3CR3T', 'HS256')
            cookies[:u_jwt] ={
                value: token,
                expires: 4.hours,
                httponly: true
            }
            render json: {result:'success'}, status: :ok
        else
            render json: {result:'Username and/or password are incorrect.'}, status: :unprocessable_entity
        end
    end

    def logout
        cookies.delete(:u_jwt)
        render status: :ok
    end

    def info
        begin
            user = User.find(current_user)
            render json: {name: user.name, username: user.username, mail_confirmed: user.mail_confirmed}, status: :ok
        rescue ActiveRecord::RecordNotFound
            render json: {result: 'user not found.'}
        end
    end

    private
        def userParams
            params.require(:data).permit(:username, :name, :lastname, :password, :mail)
        end
end
