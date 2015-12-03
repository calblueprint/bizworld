module UrlActions
  def self.shorten_url(classroom_id, category)
    Bitly.client.shorten("#{ENV['APP_URL']}/classrooms/#{classroom_id}/forms/#{category}").short_url
  end
end
