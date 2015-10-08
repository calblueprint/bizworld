class ChangePrePostColumnNameInPrograms < ActiveRecord::Migration
  def change
    rename_column :programs, :pre_assessment_link, :pre
    rename_column :programs, :post_assessment_link, :post
  end
end
