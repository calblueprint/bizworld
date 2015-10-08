class CreatePrograms < ActiveRecord::Migration
  def change
    create_table :programs do |t|
      t.string :type
      t.string :pre_assessment_link
      t.string :post_assessment_link

      t.timestamps null: false
    end
  end
end
