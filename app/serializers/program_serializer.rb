class ProgramSerializer < ActiveModel::Serializer
  attributes :id, :name, :post_id, :pre_id, :is_active, :num_classrooms
  has_many :classrooms

  def num_classrooms
    object.classrooms.active.length
  end
end
