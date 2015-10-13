class AddNameToClassroom < ActiveRecord::Migration
  def change
    change_table :classrooms do |t|
      t.string :name
    end
  end
end
