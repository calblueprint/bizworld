class RemoveModuleFromClassrooms < ActiveRecord::Migration
  def change
    remove_column :classrooms, :module
  end
end
