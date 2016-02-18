# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160207224616) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "admins", ["email"], name: "index_admins_on_email", unique: true, using: :btree
  add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree

  create_table "classrooms", force: :cascade do |t|
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "teacher_id"
    t.string   "name"
    t.integer  "program_id"
    t.date     "start_date"
    t.date     "end_date"
    t.string   "pre_link"
    t.string   "post_link"
    t.string   "additional_info"
  end

  add_index "classrooms", ["end_date"], name: "index_classrooms_on_end_date", using: :btree
  add_index "classrooms", ["program_id"], name: "index_classrooms_on_program_id", using: :btree
  add_index "classrooms", ["start_date"], name: "index_classrooms_on_start_date", using: :btree
  add_index "classrooms", ["teacher_id"], name: "index_classrooms_on_teacher_id", using: :btree

  create_table "forms", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "category"
  end

  create_table "programs", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "pre_id"
    t.integer  "post_id"
  end

  create_table "questions", force: :cascade do |t|
    t.integer  "form_id"
    t.integer  "category"
    t.string   "options",    default: [],              array: true
    t.integer  "answer"
    t.string   "title"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "number"
  end

  add_index "questions", ["form_id"], name: "index_questions_on_form_id", using: :btree

  create_table "responses", force: :cascade do |t|
    t.integer  "question_id"
    t.integer  "student_id"
    t.string   "answer"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "category"
  end

  add_index "responses", ["question_id"], name: "index_responses_on_question_id", using: :btree
  add_index "responses", ["student_id"], name: "index_responses_on_student_id", using: :btree

  create_table "students", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.float    "pre_score"
    t.float    "post_score"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "classroom_id"
  end

  add_index "students", ["classroom_id"], name: "index_students_on_classroom_id", using: :btree

  create_table "teachers", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone_number"
    t.string   "school"
    t.string   "city"
    t.string   "state"
    t.string   "grades",                 default: [],              array: true
  end

  add_index "teachers", ["email"], name: "index_teachers_on_email", unique: true, using: :btree
  add_index "teachers", ["reset_password_token"], name: "index_teachers_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "students", "classrooms"
end
