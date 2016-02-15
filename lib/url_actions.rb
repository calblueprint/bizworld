module UrlActions
  def self.shorten_url(classroom_id, category)
    if Rails.env.development? || Rails.env.test?
      return "/classrooms/#{classroom_id}/forms/#{category}"
    end
    Bitly.client.shorten("#{ENV['APP_URL']}/classrooms/#{classroom_id}/forms/#{category}").short_url
  end
end
