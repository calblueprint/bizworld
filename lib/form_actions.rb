module FormActions
  def self.validate(form, responses)
    responses.keys.length == form.questions.length && !responses.value?("")
  end

  def self.add_responses(form, responses, student)
    student.responses.by_category(form.category).to_a.map(&:destroy)
    correct = grade_and_create_responses(responses, student.id, form.category)
    student.send(:"#{form.category}_score=", (correct / form.questions.gradeable.length))
    student.save
  end

  private

  def self.grade_and_create_responses(responses, sid, category)
    correct = 0.0
    responses.each do |q_id, answer|
      correct += 1 if Question.find(q_id).answer.eql?(answer.to_i)
      Response.create!(student_id: sid, question_id: q_id, answer: answer, category: category)
    end
    correct
  end
end
