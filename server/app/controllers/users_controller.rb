class UsersController < ApplicationController
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
        #cookies.delete(:u_jwt)
        if logged_in_user
            render json: {user_id: logged_in_user}, status: :ok
        else
            render json: {user_id: 'Not logged in'}, status: :ok
        end
    end

    private
        def userParams
            params.require(:data).permit(:username, :name, :lastname, :password, :mail)
        end
end
