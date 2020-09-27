class TweetsController < ApplicationController
    before_action :authorized
    def create
        user = User.find(current_user)
        tweet = user.tweets.new(text: tweetParams[:text])
        
        if tweet.save
            render json: {result:'tweet created'}, status: :created
        else
            render json: tweet.errors, status: :unprocessable_entity
        end
        
    end

    def listtweets
        user = User.find(current_user)
        tweets = user.tweets.all
        render json: {result:"succesful",data: tweets}, status: :ok
    end

    
    def deletetweet
        user = User.find(current_user)
        begin 
            user.tweets.find(params[:id]).destroy
            render json: {result:"deleted"}, status: :ok
        rescue ActiveRecord::RecordNotFound
            render json: {result:"tweet not found on the user's list"}, status: :unprocessable_entity
        end
    end


    private
        def tweetParams
            params.require(:data).permit(:text)
        end
    
end
