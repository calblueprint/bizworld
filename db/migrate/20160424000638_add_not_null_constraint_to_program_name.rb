class AddNotNullConstraintToProgramName < ActiveRecord::Migration
  def change
    change_column_null :programs, :name, false
  end
end
