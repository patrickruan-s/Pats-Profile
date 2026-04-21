module Api
  module V1
    class ArtworksController < ApplicationController
      def index
        artworks = Artwork.with_attached_image.all
        render json: artworks.map { |artwork|
          {
            id: artwork.id,
            title: artwork.title,
            description: artwork.description,
            image_url: artwork.image.attached? ? url_for(artwork.image) : nil
          }
        }
      end
    end
  end
end
