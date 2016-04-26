class ProgramSerializer < ActiveModel::Serializer
  attributes :id, :name, :color, :icon, :post_id, :pre_id
  has_many :classrooms
end
