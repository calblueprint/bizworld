def make_teachers
  1.upto(5) do |n|
    teacher = Teacher.create(email: "teacher#{n}@bizworld.org", password: "password", password_confirmation: "password")
    teacher.save
  end
end

def make_programs
  programs = ["BizWorld", "BizMovie", "BizWiz"]
  programs.each do |name|
    program = Program.create(name: name, pre: "http://yahoo.com", post: "http://google.com")
    program.save
  end
end

def make_classrooms
  six_months_ago = Date.yesterday.advance(months: -6)
  1.upto(10) do |n|
    classroom = Classroom.create(
      term: "term#{n}",
      name: "Classroom#{n}",
      start_date: six_months_ago.advance(months: n),
      end_date: six_months_ago.advance(months: n+2)
    )
    classroom.teacher = Teacher.find(n % 5 + 1)
    classroom.program = Program.find(n % 3 + 1)
    classroom.save
  end
end

def make_students
  1.upto(5) do |n|
    student = Student.create(pre_score: n, post_score: 42, first_name: "John", last_name: "Doe")
    student.classroom = Classroom.find(n % 2 + 1)
    student.save
  end
end

def make_admins
  1.upto(5) do |n|
    admin = Admin.create(email: "admin#{n}@bizworld.org", password: "password", password_confirmation: "password")
    admin.save
  end
end

make_teachers
make_programs
make_classrooms
make_students
make_admins
