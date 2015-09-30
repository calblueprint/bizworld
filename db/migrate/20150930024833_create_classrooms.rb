class CreateClassrooms < ActiveRecord::Migration
  def change
    create_table :classrooms do |t|
      t.string :term
      t.string :module

      t.timestamps null: false
    end
  end
end
