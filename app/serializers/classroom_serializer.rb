class ClassroomSerializer < ActiveModel::Serializer
  attributes :id, :term

  has_one :teacher
  has_many :students
end
