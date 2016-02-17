module ClassroomCSVGenerator
  def self.create_zip(classrooms, program, filename = "classroom_responses.zip")
    temp_file = Tempfile.new(filename)
    Zip::OutputStream.open(temp_file) { |zos| }
    Zip::File.open(temp_file.path, Zip::File::CREATE) { |file| to_csv(file, classrooms, program) }
    [filename, temp_file]
  end

  private

  def self.to_csv(zipfile, classrooms, program)
    [:pre, :post].each do |category|
      zipfile.get_output_stream("#{category}_responses.csv") do |file|
        file.puts(generate_csv(classrooms, category, program))
      end
    end
  end

  def self.generate_csv(classrooms, category, program)
    CSV.generate do |csv|
      csv << generate_header(category, program)
      generate_rows(csv, classrooms, category)
    end
  end

  def self.generate_header(category, program)
    Classroom.csv_header + Teacher.classroom_csv_header \
    + Student.csv_header + program.csv_header(category)
  end

  def self.generate_rows(csv, classrooms, category)
    classrooms.each do |classroom|
      generate_student_rows(csv, classroom, category)
    end
  end

  def self.generate_student_rows(csv, classroom, category)
    classroom.students.each do |student|
      csv << classroom.csv_row + classroom.teacher.classroom_csv_row + student.csv_row(category)
    end
  end
end
