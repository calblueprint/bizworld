class AddAssesmentLinksToClassrooms < ActiveRecord::Migration
  def change
    change_table :classrooms do |t|
      t.string :pre_link
      t.string :post_link
    end
  end
end
