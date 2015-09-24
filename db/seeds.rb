def make_partners
  1.upto(5) do |n|
    partner = Partner.create(email: "user#{n}@gmail.com", first_name: "Nikhil", last_name: "Narayen")
    partner.save
  end
end

make_partners
