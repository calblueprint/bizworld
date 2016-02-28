def make_teachers
  1.upto(5) do |n|
    teacher = Teacher.create(
      email: "teacher#{n}@bizworld.org",
      password: "password",
      password_confirmation: "password",
      first_name: FFaker::Name.first_name,
      last_name: FFaker::Name.last_name,
      phone_number: "555-555-5555",
      school: "UC Berkeley",
      city: "Berkeley",
      state: "CA",
      grades: ["3rd", "5th", "8th", "other"]
    )
    teacher.id = n
    teacher.save
  end
end

def make_programs
  programs = ["BizWorld", "BizMovie", "BizWiz"]
  programs.each do |name|
    program = Program.create(name: name)
    program.save
  end
end

def make_classrooms
  six_months_ago = Date.yesterday.advance(months: -6)
  1.upto(10) do |n|
    classroom = Classroom.create(
      name: "Classroom#{n}",
      start_date: six_months_ago.advance(months: n),
      end_date: six_months_ago.advance(months: n+2)
    )
    classroom.id = n
    classroom.teacher = Teacher.find(n % 5 + 1)
    classroom.program = Program.find(n % 3 + 1)
    classroom.save
  end
end

def make_students
  1.upto(30) do |n|
    student = Student.create(
      first_name: FFaker::Name.first_name,
      last_name: FFaker::Name.last_name
    )
    student.id = n
    student.classroom = Classroom.find((n / 3.0).ceil)
    student.save
  end
end

def make_admins
  1.upto(5) do |n|
    admin = Admin.create(
      email: "admin#{n}@bizworld.org",
      password: "password",
      password_confirmation: "password"
    )
    admin.id = n
    admin.save
  end
end

def make_forms
  Rake::Task["form:generate_default"].invoke
end

def make_classroom_additional_questions
  Rake::Task["classroom_additional_question:generate_default"].invoke  
end

make_teachers
make_programs
make_classrooms
make_students
make_admins
make_forms
make_classroom_additional_questions
