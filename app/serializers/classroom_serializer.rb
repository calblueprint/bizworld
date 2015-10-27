class ClassroomSerializer < ActiveModel::Serializer
  attributes :id, :term, :start_date, :end_date
  has_one :teacher
  has_many :students
end
