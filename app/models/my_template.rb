class MyTemplate < ApplicationRecord
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

end
