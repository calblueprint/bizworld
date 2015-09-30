def make_partners
  1.upto(5) do |n|
    partner = Partner.create(email: "user#{n}@gmail.com", first_name: "Nikhil", last_name: "Narayen")
    partner.save
  end
end

def make_students
  1.upto(5) do |n|
    student = Student.create(pre_score: n, post_score: 42, first_name: "John", last_name: "Doe")
    student.save
  end
end

make_partners
make_students
