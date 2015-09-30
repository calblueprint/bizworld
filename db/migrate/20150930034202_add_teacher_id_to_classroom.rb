class AddTeacherIdToClassroom < ActiveRecord::Migration
  def change
    change_table :classrooms do |t|
      t.belongs_to :teacher, index: true
    end
  end
end
