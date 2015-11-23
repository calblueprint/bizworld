class ProgramSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :classrooms
end
