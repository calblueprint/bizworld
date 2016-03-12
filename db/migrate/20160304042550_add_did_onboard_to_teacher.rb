class AddDidOnboardToTeacher < ActiveRecord::Migration
  def change
    add_column :teachers, :did_onboard, :boolean
  end
end
