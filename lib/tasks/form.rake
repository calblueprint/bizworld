namespace :form do
  desc "Generates form based on configuration file"
  task :generate_form, [:program, :type] => :environment do |_t, args|
    # TODO(nnarayen 10/28): use args to load correct file
    form_config = HashWithIndifferentAccess.new(
      YAML.load(File.read(File.expand_path("../../../db/forms/form_1_pre.yml", __FILE__))))

    form = Form.create
    program = Program.find(args[:program])
    program.send(:"#{args[:type]}=", form)
    program.save

    form_config[:questions].each do |question|
      q = Question.create(question)
      form.questions << q
    end

    form.save
  end
end
