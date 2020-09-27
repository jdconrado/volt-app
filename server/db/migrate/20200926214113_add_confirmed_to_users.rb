class AddConfirmedToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :mail_confirmed, :boolean, default: false
  end
end
