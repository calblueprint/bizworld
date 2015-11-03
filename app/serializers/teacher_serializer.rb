class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :phone_number, :school, :city, :state, :grades
end
