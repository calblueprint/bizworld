class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.float :pre_score
      t.float :post_score

      t.timestamps null: false
    end
  end
end
