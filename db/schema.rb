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

ActiveRecord::Schema[7.1].define(version: 2025_02_28_170043) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "clinics", force: :cascade do |t|
    t.string "clinic_location_name"
    t.string "clinic_location_address"
    t.string "clinic_phone_number", default: "212-600-4781"
    t.bigint "clinical_director"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dr_templates", force: :cascade do |t|
    t.string "dr_temp_title"
    t.string "dr_temp_subject"
    t.text "dr_temp_content"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "dr_owner_id"
    t.index ["dr_owner_id"], name: "index_dr_templates_on_dr_owner_id"
  end

  create_table "inventory_items", force: :cascade do |t|
    t.bigint "clinic_id"
    t.string "item_type"
    t.string "item_name"
    t.integer "count"
    t.string "item_status"
    t.boolean "staple_item"
    t.string "item_link"
    t.integer "warning_count"
    t.boolean "item_requested"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clinic_id"], name: "index_inventory_items_on_clinic_id"
    t.index ["user_id"], name: "index_inventory_items_on_user_id"
  end

  create_table "medifiles", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.text "instructions"
    t.string "file_link"
    t.string "file_cover"
    t.string "file_cover_alt"
    t.string "language"
    t.integer "file_owner_id"
    t.integer "file_receiver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "my_medifiles", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "coworker_id"
    t.bigint "medifile_id"
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dr_template_id"], name: "index_my_templates_on_dr_template_id"
    t.index ["patient_template_id"], name: "index_my_templates_on_patient_template_id"
    t.index ["user_id"], name: "index_my_templates_on_user_id"
  end

  create_table "ordered_items", force: :cascade do |t|
    t.bigint "clinic_id"
    t.string "item_type"
    t.string "item_name"
    t.integer "order_quantity"
    t.date "order_date"
    t.boolean "order_received", default: false
    t.date "delivery_date"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "item_link", default: "", null: false
    t.index ["clinic_id"], name: "index_ordered_items_on_clinic_id"
    t.index ["user_id"], name: "index_ordered_items_on_user_id"
  end

  create_table "patient_templates", force: :cascade do |t|
    t.string "px_temp_title"
    t.string "px_temp_subject"
    t.text "px_temp_content"
    t.string "category"
    t.string "language", default: "english"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "px_owner_id"
    t.index ["px_owner_id"], name: "index_patient_templates_on_px_owner_id"
  end

  create_table "requested_items", force: :cascade do |t|
    t.bigint "clinic_id"
    t.string "item_name"
    t.text "item_link"
    t.string "item_type"
    t.integer "requested_quantity"
    t.boolean "request_fulfilled"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clinic_id"], name: "index_requested_items_on_clinic_id"
    t.index ["user_id"], name: "index_requested_items_on_user_id"
  end

  create_table "task_contents", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "user_id", null: false
    t.jsonb "task_data", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_task_contents_on_task_id"
    t.index ["user_id"], name: "index_task_contents_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.bigint "clinic_id", null: false
    t.string "task_table_title"
    t.jsonb "column_names", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clinic_id"], name: "index_tasks_on_clinic_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "role"
    t.string "credentials"
    t.string "clinic_location"
    t.integer "phone_ext"
    t.string "insurance_network", default: "Not Provided"
    t.boolean "direct_access"
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.bigint "clinic_id"
    t.index ["clinic_id"], name: "index_users_on_clinic_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "clinics", "users", column: "clinical_director"
  add_foreign_key "my_medifiles", "medifiles"
  add_foreign_key "my_medifiles", "users"
  add_foreign_key "my_medifiles", "users", column: "coworker_id"
  add_foreign_key "my_templates", "dr_templates"
  add_foreign_key "my_templates", "patient_templates"
  add_foreign_key "my_templates", "users"
  add_foreign_key "task_contents", "tasks"
  add_foreign_key "task_contents", "users"
  add_foreign_key "tasks", "clinics"
  add_foreign_key "users", "clinics"
end
