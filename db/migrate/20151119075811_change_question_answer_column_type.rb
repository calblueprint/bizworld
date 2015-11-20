class ChangeQuestionAnswerColumnType < ActiveRecord::Migration
  def up
    change_column :questions, :answer, 'integer USING CAST(answer AS integer)'
  end

  def down
    change_column :questions, :answer, :string
  end
end
