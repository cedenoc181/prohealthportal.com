class MyTemplate < ApplicationRecord

  after_update :counter_effectiveness

    belongs_to :user
    belongs_to :patient_template, optional: true
    belongs_to :dr_template, optional: true

    validate :one_template_selected

    private 

    def one_template_selected
        if patient_template_id.nil? && dr_template_id.nil?
            errors.add(:base, "You must provide at least one template association (patient or Dr template).")
          end
        end

        def counter_effectiveness
          value = self.responded_counter + self.no_response_counter
          new_value = (self.responded_counter.to_f / value.to_f) * 100 
          self.update_column(:effectiveness, new_value.round(2))
        end

end
