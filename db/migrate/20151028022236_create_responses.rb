class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.belongs_to :question, index: true
      t.belongs_to :student, index: true
      t.string :answer
      t.timestamps null: false
    end
  end
end
