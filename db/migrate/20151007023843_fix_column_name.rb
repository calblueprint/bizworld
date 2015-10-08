class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :programs, :type, :name
  end
end
