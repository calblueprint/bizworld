namespace :classroom_additional_question do
  desc "Generates classroom additional questions based on configuration file"
  task :generate_default, [] => :environment do
    generate_questions
  end

  def generate_questions
    fp = Rails.root.join('db', 'classroom_additional_questions', "questions.yml")
    questions_config = HashWithIndifferentAccess.new(YAML.load(File.read(fp)))

    questions_config[:additional_questions].each do |question|
      ClassroomAdditionalQuestion.create(question)
    end
  end
end
