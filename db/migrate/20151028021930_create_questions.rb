class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.belongs_to :form, index: true
      t.integer :category
      t.string :options, array: true, default: []
      t.string :answer
      t.string :title
      t.timestamps null: false
    end
  end
end
