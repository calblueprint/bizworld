Rails.application.configure do
  # make staging a "sub-config" of production
  require File.expand_path('../production', __FILE__)
end
