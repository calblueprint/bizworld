def make_partners
  1.upto(5) do |n|
    partner = Partner.create(email: "user#{n}@gmail.com", first_name: "Nikhil", last_name: "Narayen")
    partner.save
  end
end

def make_teachers
  1.upto(5) do |n|
    teacher = Teacher.create(email: "teacher#{n}@bizworld.org", password: "password", password_confirmation: "password")
    teacher.save
  end
end

def make_classrooms
  1.upto(2) do |n|
    classroom = Classroom.create(term: "term#{n}", module: "module#{n}")
    classroom.teacher = Teacher.find(n)
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

make_partners
make_teachers
make_classrooms
make_students
make_admins
