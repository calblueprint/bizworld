class AdminsController < ApplicationController
  before_filter :authenticate_admin!

  def classrooms
    @admin = current_admin
    @program = Program.find(params[:id])
  end

  def programs
    @active_programs = add_classroom_counts Program.active.order(:name)
    @inactive_programs = add_classroom_counts Program.inactive.order(:name)
  end

  private

  def add_classroom_counts(programs)
    programs.map do |program|
      program_hash = program.attributes
      program_hash[:num_classrooms] = program.classrooms.active.length
      program_hash
    end
  end
end
