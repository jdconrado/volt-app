class UserMailer < ApplicationMailer
    default from: 'volt.mail.app@gmail.com'

    def confirmation_email
        @user = params[:user]
        @url = params[:url]
        mail(to: @user.mail, subject: 'Welcome to Volt! Confirm your email')
    end
end
