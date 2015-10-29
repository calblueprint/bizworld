class FormsController < ApplicationController
  def display
    @classroom = Classroom.find(params[:classroom_id])
    @form = @classroom.program.send(params[:category])
    @category = params[:category]
  end

  def show
    @form = Form.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @form, serializer: FormSerializer, root: false }
    end
  end
end
