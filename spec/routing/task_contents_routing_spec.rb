require "rails_helper"

RSpec.describe TaskContentsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/task_contents").to route_to("task_contents#index")
    end

    it "routes to #show" do
      expect(get: "/task_contents/1").to route_to("task_contents#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/task_contents").to route_to("task_contents#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/task_contents/1").to route_to("task_contents#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/task_contents/1").to route_to("task_contents#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/task_contents/1").to route_to("task_contents#destroy", id: "1")
    end
  end
end
