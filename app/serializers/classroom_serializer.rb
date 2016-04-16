class ClassroomSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :name, :program, :pre_link, :post_link,
             :additional_info_form_id
  has_one :teacher
  has_many :students

  def students
    object.students.sort_by(&:id)
  end

  def additional_info_form_id
    object.program.classroom_additional_id
  end
end
