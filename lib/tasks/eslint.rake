namespace :eslint do
  eslint = "node #{Rails.root}/node_modules/eslint/bin/eslint.js"

  task :here, [:dir] do |t, args|
    file = ARGV[1] || '.'
    exit system("#{eslint} --ext .jsx #{ENV['PWD']}/#{file}")
  end

  task :all do
    system("#{eslint} --ext .jsx #{Rails.root}/app/assets/javascripts")
  end
end

task :eslint => ["eslint:here"]
