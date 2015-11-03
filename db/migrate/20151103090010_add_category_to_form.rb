class AddCategoryToForm < ActiveRecord::Migration
  def change
    change_table :forms do |t|
      t.string :category
    end
  end
end
