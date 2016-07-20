class ProgramSerializer < ActiveModel::Serializer
  attributes :id, :name, :post_id, :pre_id, :is_active, :classrooms, :num_classrooms

  def classrooms
    object.classrooms.map do |classroom|
      MinimalClassroomSerializer.new(classroom)
    end
  end

  def num_classrooms
    object.classrooms.active.length
  end
end
