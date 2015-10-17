class DropPartner < ActiveRecord::Migration
  def change
    drop_table :partners
  end
end
