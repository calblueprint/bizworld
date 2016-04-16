namespace :form do
  desc "Generates form based on configuration file"
  task :generate_form, [:program, :type] => :environment do |_t, args|
    generate_form args[:program], args[:type]
  end

  desc "Generates form based on configuration file"
  task :generate_default, [] => :environment do
    [1, 2, 3].each do |p_id|
      %w(pre post classroom_additional).each do |category|
        generate_form p_id, category
      end
    end
  end

  def generate_form(program, type)
    fp = Rails.root.join('db', 'forms', "form_#{program}_#{type}.yml")
    form_config = HashWithIndifferentAccess.new(YAML.load(File.read(fp)))

    form = Form.create(category: type)
    program = Program.find(program)
    program.send(:"#{type}=", form)
    program.save

    # Question numbers determined programmatically instead of through config file
    form_config[:questions].each.with_index do |question, index|
      q = Question.create(question.merge!(number: index + 1))
      form.questions << q
    end

    form.save
  end
end
