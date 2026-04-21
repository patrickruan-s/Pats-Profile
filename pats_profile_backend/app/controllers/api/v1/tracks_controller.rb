module Api
  module V1
    class TracksController < ApplicationController
      def index
        tracks = Track.with_attached_audio.all
        render json: tracks.map { |track|
          {
            id: track.id,
            title: track.title,
            artist: track.artist,
            audio_url: track.audio.attached? ? url_for(track.audio) : nil
          }
        }
      end
    end
  end
end
