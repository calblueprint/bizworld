class ClassroomSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :name, :program, :pre_link
  attributes :post_link, :form_id

  has_one :teacher
  has_many :students, :responses

  def students
    object.students.sort_by(&:id)
  end

  def form_id
    object.program.additional_id
  end
end
