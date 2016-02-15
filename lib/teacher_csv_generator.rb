module TeacherCSVGenerator
  def self.create_zip(classrooms, program, filename="teachers.csv")
    temp_file = Tempfile.new(filename)
    generate_csv(classrooms, program, temp_file.path)
    [filename, temp_file]
  end

  private

  def self.generate_csv(classrooms, program, path)
    CSV.open(path, 'w') do |csv|
      csv << Teacher.teacher_csv_header + Program.teacher_csv_header + Classroom.teacher_csv_header
      generate_rows(csv, classrooms, program)
    end
  end

  def self.generate_rows(csv, classrooms, program)
    classrooms.each do |classroom|
      csv << classroom.teacher.teacher_csv_row + program.teacher_csv_row + classroom.teacher_csv_row
    end
  end
end
