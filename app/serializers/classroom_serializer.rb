class ClassroomSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :name, :program, :pre_link, :post_link
  has_one :teacher
  has_many :students

  def students
    object.students.sort_by(&:id)
  end
end
