class CreateConversations < ActiveRecord::Migration[8.1]
  def change
    create_table :conversations do |t|
      t.string :session_token

      t.timestamps
    end
    add_index :conversations, :session_token, unique: true
  end
end
