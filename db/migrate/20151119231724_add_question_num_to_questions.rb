class AddQuestionNumToQuestions < ActiveRecord::Migration
  def change
    change_table :questions do |t|
      t.integer :number
    end
  end
end
