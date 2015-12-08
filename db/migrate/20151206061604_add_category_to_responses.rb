class AddCategoryToResponses < ActiveRecord::Migration
  def change
    add_column :responses, :category, :string
  end
end
