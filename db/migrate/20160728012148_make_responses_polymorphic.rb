class MakeResponsesPolymorphic < ActiveRecord::Migration
  def self.up
    add_reference :responses, :responder, polymorphic: true, index: true
    execute <<-eos
UPDATE responses r1 SET
  responder_id = r2.student_id,
  responder_type = 'Student'
FROM responses r2
WHERE r1.id = r2.id;
eos
    remove_reference :responses, :student

    add_column :programs, :additional_id, :integer
    add_column :questions, :hint, :string
  end

  def self.down
    add_reference :responses, :student, index: true
    execute <<-eos
UPDATE responses r1 SET
  student_id = r2.responder_id
FROM responses r2
WHERE (r1.id = r2.id AND r2.responder_type = 'Student');
eos
    remove_reference :responses, :responder, polymorphic: true, index: true

    remove_column :programs, :additional_id, :integer
    remove_column :questions, :hint, :string
  end
end
