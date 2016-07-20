class MinimalClassroomSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :name, :num_students, :program
  has_one :teacher

  def num_students
    object.students.length
  end
end
