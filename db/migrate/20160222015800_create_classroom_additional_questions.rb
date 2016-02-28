class CreateClassroomAdditionalQuestions < ActiveRecord::Migration
  def change
    create_table :classroom_additional_questions do |t|
      t.string :title
      t.string :hint

      t.timestamps null: false
    end
  end
end
