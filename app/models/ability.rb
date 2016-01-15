class Ability
  include CanCan::Ability

  # rubocop:disable Metrics/MethodLength
  def initialize(user)
    user ||= Teacher.new # not logged in

    if user.is_a? Admin
      can :manage, :all
      return
    end

    can :read, Classroom, teacher_id: user.id
    can :read, Teacher, id: user.id
    can :read_classrooms, Teacher, id: user.id
  end
  # rubocop:enable all
end
