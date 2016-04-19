class AddActiveToQuestion < ActiveRecord::Migration
  def change
    change_table :questions do |t|
      t.boolean :active, default: true
    end
  end
end
