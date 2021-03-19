require 'rails_helper'

RSpec.describe 'Api::KeyActivitiesController', type: :request do
  let(:base_route) { '/api/key_activities' }

  let!(:scheduled_group_today) {create(:scheduled_group, name: "Today")}
  let!(:scheduled_group_tomorrow) {create(:scheduled_group, name: "Tomorrow")}
  let!(:user) {create(:user)}
  let!(:ka0) {create(:key_activity, completed_at: Date.new(2021,2,6), description: "Today0", scheduled_group: scheduled_group_today, position: 1, priority: 0, due_date: Date.new(2021,3,6), user: user)}
  let!(:ka1) {create(:key_activity, completed_at: Date.new(2021,2,6), description: "Today1", scheduled_group: scheduled_group_today, position: 2, priority: 2, due_date: Date.new(2021,3,2), user: user)}
  let!(:ka2) {create(:key_activity, completed_at: nil, description: "Today2", scheduled_group: scheduled_group_today, position: 3, priority: 1, due_date: Date.new(2021,3,2), user: user)}
  let!(:ka3) {create(:key_activity, completed_at: nil, description: "Today3", scheduled_group: scheduled_group_today, position: 4, priority: 2, due_date: Date.new(2021,3,4), user: user)}
  let!(:ka4) {create(:key_activity, completed_at: nil, description: "Today4", scheduled_group: scheduled_group_today, position: 5, priority: 2, due_date: Date.new(2021,3,1), user: user)}


  describe 'GET api/key_activities/completed' do
    it 'return a completed items list' do
      get "#{base_route}/completed"

      body = JSON.parse(response.body)

      expect(body['key_activities'].pluck('id')).to eq([ka0, ka1].pluck(:id))
    end

    it 'return a paginated list' do
      get "#{base_route}/completed"

      body = JSON.parse(response.body)

      expect(body['page']).to eq(1)
      expect(body['pages']).to eq(1)
    end
  end
end
