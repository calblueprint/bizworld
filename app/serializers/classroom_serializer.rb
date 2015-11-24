class ClassroomSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :name, :program
  has_one :teacher
  has_many :students
end
