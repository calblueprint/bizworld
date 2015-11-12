def make_teachers
  1.upto(5) do |n|
    teacher = Teacher.create(
      email: "teacher#{n}@bizworld.org",
      password: "password",
      password_confirmation: "password",
      first_name: "James",
      last_name: "Smith",
      phone_number: "555-555-5555",
      school: "UC Berkeley",
      city: "Berkeley",
      state: "CA",
      grades: ["3rd", "5th", "8th", "other"]
    )
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
  1.upto(30) do |n|
    student = Student.create(
      pre_score: 0.0,
      post_score: 0.0,
      first_name: FFaker::Name.first_name,
      last_name: FFaker::Name.last_name
    )
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
    admin.save
  end
end

def make_forms
  [1, 2, 3].each do |p_id|
    ["pre", "post"].each do |category|
      Rake::Task["form:generate_form"].invoke(p_id, category)
      Rake::Task["form:generate_form"].reenable
    end
  end
end

make_teachers
make_programs
make_classrooms
make_students
make_admins
make_forms
