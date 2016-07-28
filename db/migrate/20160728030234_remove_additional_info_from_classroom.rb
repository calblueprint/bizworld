class RemoveAdditionalInfoFromClassroom < ActiveRecord::Migration
  def change
    remove_column :classrooms, :additional_info
  end
end
