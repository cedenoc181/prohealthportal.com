class Task < ApplicationRecord

    belongs_to :clinic
    has_many :task_contents
    has_many :users, through: :task_contents

    validates :task_table_title, presence: true
    validates :column_names, presence: true
    validates :clinic_id, presence: true



def column_types
    case task_table_title
        when "Appointment Reminders"
         {
            column_one: "text",
            column_two: "datetime-local",
            column_three: "datetime-local",
            column_four: "checkbox"
          }
        when "Patient Retention"
            {
                column_one: "text",
                column_two: "datetime-local",
                column_three: "select",
                column_four: "datetime-local"
            }
        when "Direct Access"
            {
                column_one: "text",
                column_two: "datetime-local",
                column_three: "number",
                column_four: "checkbox"   
            }
        when "Authorization Manager" 
            {
                column_one: "text",
                column_two: "date",
                column_three: "select",
                column_four: "select"  
            }
        when "Referral Manager"
            {
                column_one: "text",
                column_two: "date",
                column_three: "select",
                column_four: "text"  
            }
        when "APOS Onboarding" 
            {
                column_one: "text",
                column_two: "date",
                column_three: "checkbox",
                column_four: "select"   
            }
        when "APOS Status"
            {
                column_one: "text",
                column_two: "datetime-local",
                column_three: "checkbox",
                column_four: "select"  
            }
    end

    def select_type_options
        case task_table_title
            when "Patient Retention"
              {
                column_three: ["Scheduled", "Not interested", "Pending Rx", "Unreachable"]
              }
            when "Authorization Manager"
                {
                    column_three: ["HealthFirst", "Metroplus Health", "Anthem BCBS", "Emblem Health", "Aetna", "Cigna", "Oscar Health"],
                    column_four: ["Submitted", "pending", "Approved", "Denied"]
                }
            when "Referral Manager"
                {
                    column_three: ["Referred In", "Referred Out"]
                }
            when "APOS Onboarding"
                {
                    column_four: ["Incomplete", "Completed", "Pending"]
                }
            when "APOS Status"
                {
                    column_four: ["Awaiting shoes", "Visit 1", "Visit 2", "Visit 3", "Visit 4", "Visit 5", "Completed Treatment" ]
                }
        end
    end
end







end
