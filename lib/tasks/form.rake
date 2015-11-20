namespace :form do
  desc "Generates form based on configuration file"
  task :generate_form, [:program, :type] => :environment do |_t, args|
    fp = File.expand_path("../../../db/forms/form_#{args[:program]}_#{args[:type]}.yml", __FILE__)
    form_config = HashWithIndifferentAccess.new(YAML.load(File.read(fp)))

    form = Form.create(category: args[:type])
    program = Program.find(args[:program])
    program.send(:"#{args[:type]}=", form)
    program.save

    # Question numbers determined programmatically instead of through config file
    form_config[:questions].each.with_index do |question, index|
      q = Question.create(question.merge!(number: index + 1))
      form.questions << q
    end

    form.save
  end
end
