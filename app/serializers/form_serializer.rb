class FormSerializer < ActiveModel::Serializer
  attributes :id

  has_many :questions

  def questions
    object.questions.sort_by(&:number)
  end
end
