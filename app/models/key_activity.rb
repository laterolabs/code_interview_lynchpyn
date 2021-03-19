class KeyActivity < ApplicationRecord
  include HasOrderByRelatedId
  belongs_to :user
  belongs_to :scheduled_group, optional: true

  enum priority: { low: 0, medium: 1, high: 2, frog: 3 }

  acts_as_list scope: [:user_id, :scheduled_group_id]

  self.per_page = 2

  scope :optimized, -> { includes([:user]) }
  scope :created_by_user, -> (user) { where(user: user) }
  scope :sort_by_priority, -> { order(priority: :desc) }
  scope :sort_by_created_date, -> { order(created_at: :asc) }
  scope :owned_by_user, -> (user) { where(user: user) }
  scope :sort_by_position, -> { order(:position) }
  scope :sort_by_due_date, -> { order(due_date: :asc) }
  scope :sort_by_due_date_and_priority, -> { order(due_date: :asc, priority: :desc) }
  scope :is_in_scheduled_group_id, -> (scheduled_group_id) { where(scheduled_group_id: scheduled_group_id)}
  scope :sort_by_progressing_non_backlog_position, -> { order_by_related_ids('scheduled_group_id', [
    ScheduledGroup.find_by_name("Today").id, 
    ScheduledGroup.find_by_name("Tomorrow").id,
    ScheduledGroup.find_by_name("Weekly List").id,
    ScheduledGroup.find_by_name("Backlog").id
    ]).sort_by_position}
  scope :completed, -> { where.not(completed_at: nil).sort_by_position }
end
