class AddProgramRefToClassrooms < ActiveRecord::Migration
  def change
    change_table :classrooms do |t|
      t.belongs_to :program, index: true
    end
  end
end
