
class ClassroomListItemSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :name, :program, :pre_link, :post_link,
             :additional_info, :num_students
  has_one :teacher

  def num_students
    object.students.count
  end
end
