# Seeds for Artwork and Track records.
#
# HOW TO USE:
#   1. Drop your PNG files into:  db/seeds/art/
#   2. Drop your MP3/WAV/M4A files into: db/seeds/music/
#   3. Run: rails db:seed
#
# File names are used as the default title (spaces replace underscores, extension stripped).
# To set a custom title or description, add an entry to the ARTWORK_META or TRACK_META hashes below.

# Optional metadata overrides keyed by filename (without extension).
ARTWORK_META = {
  # "blue_guy" => { title: "Blue Guy", description: "Concept art for the song Blue Guy." },
}.freeze

TRACK_META = {
  # "my_song" => { title: "My Song", artist: "Patrick Ruan" },
}.freeze

MIME_TYPES = {
  ".png" => "image/png", ".jpg" => "image/jpeg", ".jpeg" => "image/jpeg",
  ".gif" => "image/gif", ".webp" => "image/webp",
  ".mp3" => "audio/mpeg", ".wav" => "audio/wav", ".ogg" => "audio/ogg",
  ".flac" => "audio/flac", ".aac" => "audio/aac", ".m4a" => "audio/mp4"
}.freeze

def title_from_filename(filename)
  File.basename(filename, ".*").gsub(/[_-]/, " ").split.map(&:capitalize).join(" ")
end

def mime_for(path)
  MIME_TYPES.fetch(File.extname(path).downcase, "application/octet-stream")
end

# ── Artworks ──────────────────────────────────────────────────────────────────

art_dir = Rails.root.join("db/seeds/art")
art_files = Dir.glob(art_dir.join("*.{png,jpg,jpeg,gif,webp}"))

if art_files.empty?
  puts "No art files found in db/seeds/art/ — skipping artwork seeds."
else
  art_files.each do |path|
    key      = File.basename(path, ".*")
    meta     = ARTWORK_META.fetch(key, {})
    title    = meta[:title]       || title_from_filename(path)
    desc     = meta[:description] || nil
    filename = File.basename(path)

    artwork = Artwork.find_or_initialize_by(title: title)
    artwork.description = desc if desc
    artwork.save!

    unless artwork.image.attached?
      artwork.image.attach(
        io: File.open(path),
        filename: filename,
        content_type: mime_for(path)
      )
      puts "  Attached artwork: #{title} (#{filename})"
    else
      puts "  Skipped (already attached): #{title}"
    end
  end
  puts "Seeded #{art_files.size} artwork(s)."
end

# ── Tracks ────────────────────────────────────────────────────────────────────

music_dir = Rails.root.join("db/seeds/music")
music_files = Dir.glob(music_dir.join("*.{mp3,wav,ogg,flac,aac,m4a}"))

if music_files.empty?
  puts "No music files found in db/seeds/music/ — skipping track seeds."
else
  music_files.each do |path|
    key      = File.basename(path, ".*")
    meta     = TRACK_META.fetch(key, {})
    title    = meta[:title]  || title_from_filename(path)
    artist   = meta[:artist] || "Patrick Ruan"
    filename = File.basename(path)

    track = Track.find_or_initialize_by(title: title)
    track.artist = artist
    track.save!

    unless track.audio.attached?
      track.audio.attach(
        io: File.open(path),
        filename: filename,
        content_type: mime_for(path)
      )
      puts "  Attached track: #{title} (#{filename})"
    else
      puts "  Skipped (already attached): #{title}"
    end
  end
  puts "Seeded #{music_files.size} track(s)."
end
