class ApplicationController < ActionController::API
    include ActionController::Cookies

    def decode_token
        token = cookies[:u_jwt]
        if token
            begin
                JWT.decode(token, 'S3CR3T', true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def current_user
        if decode_token
            decode_token[0]['u_id']
        end
    end

    def logged_in?
        !!current_user
    end

    def authorized
        render json:{result:'Error - Please log in.'}, status: :unauthorized unless logged_in?
    end
end
