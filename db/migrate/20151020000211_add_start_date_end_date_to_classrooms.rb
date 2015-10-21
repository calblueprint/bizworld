class AddStartDateEndDateToClassrooms < ActiveRecord::Migration
  def change
    add_column :classrooms, :start_date, :date
    add_index :classrooms, :start_date
    add_column :classrooms, :end_date, :date
    add_index :classrooms, :end_date
  end
end
