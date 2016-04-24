namespace :eslint do
  task :here, [:dir] do |t, args|
    args.with_defaults(:dir => '.')
    system("eslint --ext .jsx #{ENV['PWD']}/#{args[:dir]}")
  end

  task :all do
    system("eslint --ext .jsx #{Rails.root}/app/assets/javascripts")
  end
end

task :eslint => ["eslint:here"]
