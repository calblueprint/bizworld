class AddFormForeignKeysToProgram < ActiveRecord::Migration
  def change
    add_column :programs, :pre_id, :integer
    add_column :programs, :post_id, :integer
    remove_column :programs, :pre
    remove_column :programs, :post
  end
end
