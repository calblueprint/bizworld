class AddIsActiveToPrograms < ActiveRecord::Migration
  def change
    add_column :programs, :is_active, :boolean, :null => false, :default => true
  end
end
