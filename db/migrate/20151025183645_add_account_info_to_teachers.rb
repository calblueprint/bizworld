class AddAccountInfoToTeachers < ActiveRecord::Migration
  def change
  	change_table :teachers do |t|
  		t.string :first_name
  		t.string :last_name
  		t.string :phone_number
  		t.string :school
  		t.string :city
  		t.string :state
  		t.string :grades, array: true, default: []
  	end
  end
end
