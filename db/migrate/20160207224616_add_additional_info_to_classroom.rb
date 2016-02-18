class AddAdditionalInfoToClassroom < ActiveRecord::Migration
  def change
    add_column :classrooms, :additional_info, :string
  end
end
