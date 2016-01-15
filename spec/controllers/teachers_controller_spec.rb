require 'rails_helper'

RSpec.describe TeachersController, type: :controller do
  let(:teacher1) { FactoryGirl.create :teacher }
  let(:teacher2) { FactoryGirl.create :teacher }

  context 'when logged in as teacher' do
    before { sign_in teacher1 }

    it 'should be able to access own teacher pages' do
      get :show, id: teacher1.id
      expect(response).to have_http_status(:ok)
      get :classrooms, teacher_id: teacher1.id
      expect(response).to have_http_status(:ok)
    end

    it "should not be able to access other teachers' pages" do
      get :show, id: teacher2.id
      expect(response).to redirect_to(root_path)
      get :show, id: teacher2.id
      expect(get :classrooms, teacher_id: teacher2.id).to redirect_to(root_path)
    end
  end

  context 'when logged in as admin' do
    let(:admin) { FactoryGirl.create :admin }
    before { sign_in admin }

    it 'should be able to access any page' do
      get :show, id: teacher1.id
      expect(response).to have_http_status(:ok)
      get :classrooms, teacher_id: teacher1.id
      expect(response).to have_http_status(:ok)
      get :show, id: teacher2.id
      expect(response).to have_http_status(:ok)
      get :classrooms, teacher_id: teacher2.id
      expect(response).to have_http_status(:ok)
    end
  end
end
