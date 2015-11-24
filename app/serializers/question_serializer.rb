class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :options, :category, :answer, :number
end
