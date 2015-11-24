class RemoveTermFieldFromClassrooms < ActiveRecord::Migration
  def change
    remove_column :classrooms, :term, :string
  end
end
