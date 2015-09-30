class AddClassroomReferenceToStudents < ActiveRecord::Migration
  def change
    add_reference :students, :classroom, index: true, foreign_key: true
  end
end
