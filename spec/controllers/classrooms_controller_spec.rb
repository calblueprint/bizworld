require 'rails_helper'

RSpec.describe ClassroomsController, type: :controller do
  let(:teacher1) { FactoryGirl.create :teacher }
  let(:teacher2) { FactoryGirl.create :teacher }
  let(:classroom1) { FactoryGirl.create :classroom, teacher_id: teacher1.id }
  let(:classroom2) { FactoryGirl.create :classroom, teacher_id: teacher2.id }

  context 'when logged in as teacher' do
    before { sign_in teacher1 }

    it 'should be able to access own classrooms' do
      get :show, id: classroom1.id
      expect(response).to have_http_status(:ok)
    end

    it "should not be able to access other teachers' classrooms" do
      get :show, id: classroom2.id
      expect(response).to redirect_to(root_path)
    end
  end

  context 'when logged in as admin' do
    let(:admin) { FactoryGirl.create :admin }
    let(:classroom3) { FactoryGirl.create :classroom, teacher_id: teacher1.id }
    before { sign_in admin }

    it 'should be able to access any classroom' do
      get :show, id: classroom1.id
      expect(response).to have_http_status(:ok)
      get :show, id: classroom2.id
      expect(response).to have_http_status(:ok)
    end
  end
end
