class ProgramSerializer < ActiveModel::Serializer
  attributes :id, :name, :post_id, :pre_id
  has_many :classrooms
end
