module FormActions
  def self.validate(form, responses)
    responses.keys.length == form.questions.length && !responses.value?("")
  end

  def self.add_responses(form, responses, student)
    correct = 0.0
    responses.each do |q_id, answer|
      correct += 1 if Question.find(q_id).answer.eql?(answer)
      student.send(:"#{form.category}_responses").push(
        Response.create!(student_id: student, question_id: q_id, answer: answer))
    end
    student.send(:"#{form.category}_score=", (correct / form.questions.gradeable.length))
    student.save
  end
end
