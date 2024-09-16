# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_09_09_214401) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dr_templates", force: :cascade do |t|
    t.string "dr_temp_title"
    t.string "dr_temp_subject"
    t.text "dr_temp_content"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "medifiles", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "file_link"
    t.string "file_cover"
    t.string "file_cover_alt"
    t.date "publish_date"
    t.string "language"
    t.boolean "file_editable", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "my_medifiles", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "coworker_id"
    t.bigint "medifile_id"
    t.string "my_file_title"
    t.text "my_file_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coworker_id"], name: "index_my_medifiles_on_coworker_id"
    t.index ["medifile_id"], name: "index_my_medifiles_on_medifile_id"
    t.index ["user_id"], name: "index_my_medifiles_on_user_id"
  end

  create_table "my_templates", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "patient_template_id"
    t.bigint "dr_template_id"
    t.text "notes"
    t.integer "responded_counter", default: 0, null: false
    t.integer "no_response_counter", default: 0, null: false
    t.float "effectiveness", default: 0.0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dr_template_id"], name: "index_my_templates_on_dr_template_id"
    t.index ["patient_template_id"], name: "index_my_templates_on_patient_template_id"
    t.index ["user_id"], name: "index_my_templates_on_user_id"
  end

  create_table "patient_templates", force: :cascade do |t|
    t.string "px_temp_title"
    t.string "px_temp_subject"
    t.text "px_temp_content"
    t.string "category"
    t.string "language", default: "english"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "full_name"
    t.string "email"
    t.string "password_digest"
    t.string "role"
    t.string "credentials"
    t.string "clinic_location"
    t.string "phone", default: "212-600-4781"
    t.string "phone_ext"
    t.string "fax", default: "800-655-3780"
    t.string "insurance_network", default: "Not Provided"
    t.boolean "direct_access"
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "my_medifiles", "medifiles"
  add_foreign_key "my_medifiles", "users"
  add_foreign_key "my_medifiles", "users", column: "coworker_id"
  add_foreign_key "my_templates", "dr_templates"
  add_foreign_key "my_templates", "patient_templates"
  add_foreign_key "my_templates", "users"
end
