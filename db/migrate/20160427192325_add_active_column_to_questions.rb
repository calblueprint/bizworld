class AddActiveColumnToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :active, :boolean, default: true
  end
end
