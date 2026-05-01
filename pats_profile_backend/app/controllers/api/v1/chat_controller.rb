module Api
  module V1
    class ChatController < ApplicationController
      before_action :find_or_create_conversation

      def history
        render json: @conversation.messages.order(:created_at).map { |message|
          {
            role: message.role,
            content: message.content
          }
        }
      end

      def create
        @conversation.messages.create!(role: "user", content: params[:content])
        history = @conversation.messages.order(:created_at)
        reply = Chatbot.generate_reply(params[:content], history)
        @conversation.messages.create!(role: "assistant", content: reply)
        render json: { reply: reply }
      end

      private

      def find_or_create_conversation
        @conversation = Conversation.find_or_create_by(session_token: params[:session_token])
      end
    end
  end
end
